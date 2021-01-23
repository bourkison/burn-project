<template>
    <div>
        <router-link :to="profilePath">{{ comment.createdBy.username }}</router-link>
        <p>{{ comment.content }}</p>
    </div>
</template>

<script>
export default {
    name: 'Comment',
    props: {
        comment: {
            required: true,
            type: Object
        }
    },

    data() { 
        return {
            profilePath: ''
        }
    },

    created: function() {
        this.profilePath = "/users/" + this.$props.comment.createdBy.id;
    }
}
</script>