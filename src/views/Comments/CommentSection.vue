<!--
    comment:
    {
        content: string,
        createdBy: object, // { id: userid, username: username }
        createdAt: Timestamp,

        likes: array of user IDs,
    }
-->

<template>
    <v-container class="commentSection">
        <div class="lcsCont">
            <v-icon large @click="handleLike" :color="likeIconColor">{{ likeIcon }}</v-icon>
            <v-icon large @click="viewComments = !viewComments">mdi-comment-outline</v-icon>
            <v-icon large>mdi-share-outline</v-icon>
        </div>
        <div v-if="viewComments">
            <v-card v-if="comments.length == 0"><em>No comments have been added. Add the first one?</em></v-card>
            <Comment v-for="comment in comments" :comment="comment" :key="comment.id"></Comment>
            <v-form style="padding:10px" @submit.prevent="addComment">
                <v-text-field v-model="newComment.content" label="New Comment" append-icon="mdi-send" @click:append="addComment"></v-text-field>
            </v-form>
        </div>
    </v-container>
</template>

<script>
import { db } from '../../firebase'
import Comment from './Comment.vue'

export default {
    name: 'CommentSection',
    components: { Comment },
    props: {
        exerciseId: {
            type: String,
            required: false
        },
        isLiked: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            isLoading: true,
            collectionPath: null,
            comments: [],
            newComment: {},
            commentsAllowed: true,
            docId: null,
            pageType: '',
            viewComments: false,
            errorMessage: '',

            // Vuetify:
            likeIcon: '',
            likeIconColor: ''
        }
    },

    created: function() {
        // Database path based on what ID is pased through.
        if (this.$props.exerciseId) {
            this.collectionPath = db.collection("exercises");
            this.pageType = "exercise";
            this.docId = this.$props.exerciseId;
        }   

        // Check if liked or not.
        if (this.isLiked) {
            this.likeIcon = "mdi-heart";
            this.likeIconColor = "red darken-2";
        } else {
            this.likeIcon = "mdi-heart-outline";
            this.likeIconColor = "";
        }

        // Need to pull existing comments.
        this.collectionPath.doc(this.$props.exerciseId).collection("comments").get().then(commentSnapshot => {
            commentSnapshot.forEach(comment => {
                this.comments.push(comment.data());
                this.isLoading = false;
            })
        })

    },

    methods: {
        toggleComment: function() {
            this.viewComments = !this.viewComments;
            document.activeElement.blur();
        },

        handleLike: function() {
            if (!this.$props.isLiked) {
                // Add like.
                this.likeIcon = "mdi-heart";
                this.likeIconColor = "red darken-2";

                // First create the like in the exercise document.
                let likePayload = { createdBy: this.$store.state.userProfile.data.uid, createdAt: new Date() }
                this.collectionPath.doc(this.docId).collection("likes").add(likePayload).then(likeRef => {
                    // Then create the like in the user document.
                    likePayload = { type: this.pageType, id: this.docId, createdAt: new Date() }
                    db.collection("users").doc(this.$store.state.userProfile.data.uid).collection("likes").doc(likeRef.id).set(likePayload).then(() => {
                        this.$emit("likeToggle", likeRef.id);
                    }).catch(e => {
                        this.errorMessage = "Error creating like. Error pushing to user's likes: " + e;
                        console.log(this.errorMessage)
                    })
                }).catch(e => {
                    this.errorMessage = "Error creating like. Error pushing to documents' likes" + e;
                    console.log(this.errorMessage);
                })
            } else {
                // Delete like.
                this.likeIcon = "mdi-heart-outline";
                this.likeIconColor = "";

                // First delete like in the exercise document.
                this.collectionPath.doc(this.docId).collection("likes").doc(this.$props.isLiked).delete().then(() => {
                    // Now delete like in the user document.
                    // Do this first by getting the reference.
                    db.collection("users").doc(this.$store.state.userProfile.data.uid).collection("likes").doc(this.$props.isLiked).delete().then(() => {
                        this.$emit("likeToggle", "");
                    }).catch(e => {
                        this.errorMessage = "Error unliking. Error deleting from user's likes: " + e;
                        console.log(this.errorMessage);
                    });
                }).catch(e => {
                    this.errorMessage = "Error unliking. Error deleting from document' likes" + e;
                    console.log(this.errorMessage);
                })
            }

            document.activeElement.blur();
        },

        addComment: function() {
            this.newComment.createdBy = { id: this.$store.state.userProfile.data.uid, username: this.$store.state.userProfile.docData.username }
            this.newComment.createdAt = new Date();

            // First add comment to the relevant collection.
            this.collectionPath.doc(this.docId).collection("comments").add(this.newComment).then(commentRef => {
                console.log(commentRef.id);
                // Now add comment to the user.
                let commentPayload = { type: this.pageType, docId: this.docId, createdAt: new Date() }
                db.collection("users").doc(this.$store.state.userProfile.data.uid).collection("comments").doc(commentRef.id).set(commentPayload).then(() => {
                    this.comments.push(this.newComment);
                    this.newComment = {};
                }).catch(e => {
                    this.errorMessage = "Error adding comment to user: " + e;
                    console.log(this.errorMessage);
                })
            }).catch(e => {
                this.errorMessage = "Error adding comment to comments: " + e;
                console.log(this.errorMessage);
            })
        }
    },

    watch: {
        // Alter the icon based on isLiked changes.
        isLiked: function(n, o) {
            if (n && n != o) {
                this.likeIcon = "mdi-heart";
                this.likeIconColor = "red darken-2";
            } else if (!n && n != o) {
                this.likeIcon = "mdi-heart-outline";
                this.likeIconColor = "";
            }
        }
    }
}
</script>

<style scoped>
    .lcsCont {
        padding: 10px;
    }

    .lcsCont .v-icon {
        margin-right: 5px;
    }

    .commentSection .v-card {
        box-shadow: none;
        padding: 10px;

    }
</style>