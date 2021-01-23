<template>
    <v-container class="commentSection">
        <div class="lcsCont">
            <v-icon large>mdi-heart-outline</v-icon>
            <v-icon large>mdi-comment-outline</v-icon>
            <v-icon large>mdi-share-outline</v-icon>
        </div>
        <v-card v-if="comments.length == 0"><em>No comments have been added. Add the first one?</em></v-card>
        <Comment v-for="comment in comments" :comment="comment" :key="comment.id"></Comment>
        <NewComment v-if="commentsAllowed" :coll-path="collectionPath" :coll-id="collId" @newCommentAdded="additionalComment" ></NewComment>
    </v-container>
</template>

<script>
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
        }
    },
    data() {
        return {
            isLoading: true,
            collectionPath: null,
            comments: [],
            commentsAllowed: true,
            collId: null
        }
    },

    created: function() {
        // Database path based on what ID is pased through.
        if (this.$props.exerciseId) {
            this.collectionPath = db.collection("exercises");
            this.collId = this.$props.exerciseId;
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