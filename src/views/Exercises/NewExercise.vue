<!-- 
    exercise: 
    {
        name: string,
        description: string,
        muscleGroups: array of strings, // Lists all muscle groups he exercise targets.
        suggestedMeasure: string, // Suggested way to calculate exercise (i.e. reps, reps and weight, time, etc)
        suggestedSets: object, // Suggested reps/sets.
        difficulty: integer,
        imgUrl: array of URL strings,
        videoSrc: video src string,
        createdBy: userId
    }
-->

<template>
    <v-container>
    <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">
                <!--  -->
            </v-sheet>
        </v-col>

        <v-col cols="12" sm="6">
            <v-sheet min-height="70vh" rounded="lg">
                <v-container>
                    <h1 align="center">{{ this.exerciseForm.name ? this.exerciseForm.name : 'New Exercise' }}</h1>
                    <v-form @submit.prevent="createExercise">
                        <v-text-field
                            v-model="exerciseForm.name"
                            label="Exercise Name"
                            :rules=[rules.required]
                        ></v-text-field>
                        <v-card outlined class="imageUpload">
                            <v-carousel v-if="imageObjs.length > 0" v-model="model">
                                <v-carousel-item v-for="img in imageObjs" :key="img.id" :src="img.tempUrl"></v-carousel-item>
                            </v-carousel>
                            <v-file-input chips multiple label="Add Up to 10 photos and/or a video." v-model="imageFiles" @change="handleFileUpload"></v-file-input> 
                        </v-card>
                        <v-row align="center" justify="center">
                            <v-col cols="12" md="8"><MarkdownInput @update-text="updateDescription"></MarkdownInput></v-col>
                            <v-col cols="12" md="4"><MuscleGroupSelect @mgCH="updateMgs"></MuscleGroupSelect></v-col>
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
        <v-spacer></v-spacer>
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
            imageFiles: [],
            imageObjs: [],
            imgIterator: 0,
            errorMessage: '',

            // Vuetify:
            model: 0,
            rules: {
                required: value => !!value || 'Required.',
            }
        }
    },

    methods: {
        handleFileUpload(e) {
            // Check that there has been a change in this input.
            let change = false;
            if (this.imageObjs.length === 0) {
                change = true;
            } else {
                e.forEach(newInput => {
                    let found = false;
                    this.imageObjs.forEach (oldInput => {
                        if (newInput.name == oldInput.file.name) {
                            found = true;
                        }
                    })

                    if (!found) {
                        change = true;
                    }
                })
            }

            console.log(change);

            // If there's been a change, push new file into imageObjs.
            if (change) {           
                e.forEach(file => {
                    const i = this.imgIterator;
                    this.imageObjs.push({ id: i, file: file, tempUrl: URL.createObjectURL(file) })
                    this.imgIterator ++;
                })
            }

            // Regardless, reset imageFiles to be equal to the files in imageObjs.
            this.imageFiles = [];
            this.imageObjs.forEach(img => {
                this.imageFiles.push(img.file);
            })
            console.log(this.imageFiles);
            console.log(this.imageObjs);
        },

        createExercise() {
            console.log(this.exerciseForm);
        },

        updateDescription(t) {
            this.exerciseForm.description = t;
        },

        updateMgs (mg) {
            this.muscleGroups = mg;
        }
    },

    watch: {
        imageFiles: function(n, o) {
            if (n.length === 0) {
                this.imageObjs = [];
            } else if (n.length < o.length) {
                console.log(n, o);
            }
        }

    }
}
</script>

<style scoped>
    input {
        margin-bottom: 10px;
    }

    button,
    .imageUpload {
        margin-top: 10px;
    }

    .imageUpload .v-input {
        padding-left: 10px;
        padding-right: 10px;
        margin-top: 10px;
    }
</style>