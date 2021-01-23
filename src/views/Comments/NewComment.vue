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
    <v-form style="padding:10px" @submit.prevent="addComment">
        <v-text-field v-model="newComment.content" label="New Comment" append-icon="mdi-send" @click:append="addComment"></v-text-field>
    </v-form>
</template>

<script>
export default {
    name: 'NewComment',
    props: {
        collPath: {
            required: true
        },
        collId: {
            required: true,
            type: String
        }
    },
    data() {
        return {
            isLoading: false,
            newComment: {},
            errorMessage: ''
        }
    },

    created: function() {
        console.log(this.$props.collPath);
    },

    methods: {
        addComment: function() {
            this.newComment.createdBy = { id: this.$store.state.userProfile.data.uid, username: this.$store.state.userProfile.docData.username }
            this.newComment.createdAt = new Date();

            this.$props.collPath.doc(this.$props.collId).collection("comments").add(this.newComment).then(() => {
                // Comment added.
                this.$emit("newCommentAdded", this.newComment);
            }).catch(e => {
                this.errorMessage = "Error adding comment: " + e;
                console.log(this.errorMessage);
            })
        }
    }
}
</script>