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
    <v-container>
    <v-row>
        <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">
                <!--  -->
            </v-sheet>
        </v-col>

        <v-col cols="12" sm="8">
            <v-sheet min-height="70vh" rounded="lg">
                <v-container>
                    <h1 align="center">{{ this.exerciseForm.name ? this.exerciseForm.name : 'New Exercise' }}</h1>
                    <v-form @submit.prevent="createExercise">
                        <v-text-field
                            v-model="exerciseForm.name"
                            label="Exercise Name"
                            :rules=[rules.required]
                        ></v-text-field>
                        <v-row>
                            <v-col cols="12" md="8"><MarkdownInput @update-text="updateDescription"></MarkdownInput></v-col>
                            <v-col cols="12" md="4"><MuscleGroupSelect></MuscleGroupSelect></v-col>
                        </v-row>
                        <div class="text-center"><v-btn type="submit" v-bind:loading="isLoading" :disabled="isLoading">Create Exercise</v-btn></div>
                    </v-form>
                </v-container>
            </v-sheet>
        </v-col>

        <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">
                <!--  -->
            </v-sheet>
        </v-col>
    </v-row>
    </v-container>
</template>

<script>
import MarkdownInput from '../Utility/MarkdownInput.vue'
import MuscleGroupSelect from '../Utility/MuscleGroupSelect.vue'

export default {
    name: "NewExercise",
    components: { MarkdownInput, MuscleGroupSelect },
    data() {
        return {
            exerciseForm: {
                name: '',
                description: '',
                muscleGroups: [],
                imgURL: '',
                videoSrc: ''
            },
            isLoading: false,
            imageFile: '',
            errorMessage: '',
            // Vuetify:

            rules: {
                required: value => !!value || 'Required.',
            }
        }
    },

    methods: {
        handleFileUpload(e) {
            console.log(e);
            console.log(this.imageFile);
        },

        createExercise() {
            console.log(this.exerciseForm.description);
        },

        updateDescription(t) {
            this.exerciseForm.description = t;
            console.log(t);
        }
    }
}
</script>

<style scoped>
    input {
        margin-bottom: 10px;
    }

    button {
        margin-top: 10px;
    }
</style>