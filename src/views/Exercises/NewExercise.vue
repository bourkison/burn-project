<!-- 
    exercise: 
    {
        name: string,
        description: string,
        muscleGroups: array of strings, // Lists all muscle groups he exercise targets.
        suggestedMeasure: string, // Suggested way to calculate exercise (i.e. reps, reps and weight, time, etc)
        imgUrl: array of URL strings,
        videoSrc: video src string,
        createdBy: userId
    }
-->

<template>
    <div class="newExercise">
        <h1>New Exercise</h1>
        <form @submit.prevent v-if="!isLoading">
            <label for="exNameInput">Name:</label>
            <input id="exNameInput" type="text" v-model="exerciseForm.name" required/><br>

            <label for="exDescriptionInput">Description:</label>
            <input id="exDescriptionInput" type="text" v-model="exerciseForm.description" required/><br>

            <label for="exMuscGroupInput">Muscle Groups:</label>
            <MuscleGroupSelect id="exMuscGroupInput" v-model="exerciseForm.muscleGroups" require/><br>

            <label for="exFileInput">Image or Video:</label>
            <input id="exFileInput" type="file" accept="image/png,image/jpg,video/mp4" v-bind:file="imageFile" @change="handleFileUpload($event)" />

            <button @click="createExercise">Create</button>
        </form>
    </div>
</template>

<script>
import MuscleGroupSelect from '../Utility/MuscleGroupSelect.vue'

export default {
    name: "NewExercise",
    components: {
        MuscleGroupSelect
    },
    data() {
        return {
            isLoading: false,
            exerciseForm: {
                name: '',
                description: '',
                muscleGroups: [],
                imgURL: '',
                videoSrc: ''
            },
            imageFile: '',
            errorMessage: ''
        }
    },

    methods: {
        handleFileUpload(e) {
            console.log(e);
            console.log(this.imageFile);
        }
    }
}
</script>

<style scoped>

</style>