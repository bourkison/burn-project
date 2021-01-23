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
            <NewComment v-if="commentsAllowed" :coll-path="collectionPath" :coll-id="docId" @newCommentAdded="additionalComment" ></NewComment>
        </div>
    </v-container>
</template>

<script>
import firebase from 'firebase'
import { db } from '../../firebase'
import NewComment from './NewComment.vue'
import Comment from './Comment.vue'

export default {
    name: 'CommentSection',
    components: { NewComment, Comment },
    props: {
        exerciseId: {
            type: String,
            required: false
        },
        isLiked: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            isLoading: true,
            collectionPath: null,
            comments: [],
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
        additionalComment: function(comment) {
            this.comments.push(comment);
        },

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
                this.collectionPath.doc(this.$props.exerciseId).update({
                    likes: firebase.firestore.FieldValue.arrayUnion(this.$store.state.userProfile.data.uid)
                }).then(() => {
                    // Then create the like in the user document.
                    let likePayload = { type: this.pageType, id: this.docId, createdAt: new Date() }
                    db.collection("users").doc(this.$store.state.userProfile.data.uid).collection("likes").add(likePayload).then(() => {
                        this.$emit("likeToggle");
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
                this.collectionPath.doc(this.$props.exerciseId).update({
                    likes: firebase.firestore.FieldValue.arrayRemove(this.$store.state.userProfile.data.uid)
                }).then(() => {
                    // Now delete like in the user document.
                    // Do this first by getting the reference.
                    db.collection("users").doc(this.$store.state.userProfile.data.uid).collection("likes").where("id", "==", this.docId).get().then(likeSnapshot => {
                        // Then deleting the document.
                        likeSnapshot.forEach(l => {
                            l.ref.delete().then(() => {
                                this.$emit("likeToggle");
                            }).catch(e => {
                                this.errorMessage = "Error unliking. Error deleting from user's likes: " + e;
                                console.log(this.errorMessage);
                            });
                        })
                    }).catch(e => {
                        this.errorMessage = "Error unliking. Error finding the like." + e;
                        console.log(this.errorMessage)
                    })
                }).catch(e => {
                    this.errorMessage = "Error unliking. Error deleting from document' likes" + e;
                    console.log(this.errorMessage);
                })
            }

            document.activeElement.blur();
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