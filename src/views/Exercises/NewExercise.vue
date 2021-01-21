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
                    <h1>New Exercise</h1>
                    <v-form @submit.prevent="createExercise">
                        <v-text-field
                            v-model="exerciseForm.name"
                            label="Name"
                            :rules=[rules.required]
                        ></v-text-field>
                        <MarkdownInput></MarkdownInput>
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

export default {
    name: "NewExercise",
    components: { MarkdownInput },
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
        }
    }
}
</script>

<style scoped>

</style>