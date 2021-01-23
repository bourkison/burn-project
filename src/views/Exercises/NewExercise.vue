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
                        <MarkdownInput @update-text="updateDescription"></MarkdownInput>
                        <v-row align="center" justify="center">
                            <v-col cols="12" md="6"><MuscleGroupSelect @mgCH="updateMgs"></MuscleGroupSelect></v-col>
                            <v-col cols="12" md="6">
                                <v-card align="center" outlined>
                                    <v-container class="setsAdder">
                                        <h2>Suggested Format</h2>
                                        <v-row v-for="set in exerciseForm.suggestedSets" :key="set.id" align="center" justify="center">
                                            <v-col cols="12" md="6">
                                                <v-select :items="measureByOptions" v-model="set.measureBy"></v-select>
                                            </v-col>

                                            <v-col cols="12" md="5">
                                                <v-text-field v-if="set.measureBy == 'Time'" label="Suggested Time (secs)" :rules=[rules.isNumber] v-model="set.measureAmount"></v-text-field>
                                                <v-text-field v-if="set.measureBy == 'Reps'" label="Suggested Reps"  :rules=[rules.isNumber] v-model="set.measureAmount"></v-text-field>
                                            </v-col>

                                            <v-col cols="12" md="1">
                                                <v-icon @click="deleteSet(set.id)" color="error">mdi-close</v-icon>
                                            </v-col>
                                        </v-row>
                                        <v-btn @click="addSet">Add Set</v-btn>
                                    </v-container>
                                </v-card>
                                <v-card class="difficultyCard" align="center" outlined>
                                    <h2>Difficulty</h2>
                                    <v-icon :color="stars[0].color" @click="starClick(0)" @mouseover="starHover(true, 0)" @mouseleave="starHover(false, 0)" x-large>{{ stars[0].icon }}</v-icon>
                                    <v-icon :color="stars[1].color" @click="starClick(1)" @mouseover="starHover(true, 1)" @mouseleave="starHover(false, 1)" x-large>{{ stars[1].icon }}</v-icon>
                                    <v-icon :color="stars[2].color" @click="starClick(2)" @mouseover="starHover(true, 2)" @mouseleave="starHover(false, 2)" x-large>{{ stars[2].icon }}</v-icon>
                                    <v-icon :color="stars[3].color" @click="starClick(3)" @mouseover="starHover(true, 3)" @mouseleave="starHover(false, 3)" x-large>{{ stars[3].icon }}</v-icon>
                                    <v-icon :color="stars[4].color" @click="starClick(4)" @mouseover="starHover(true, 4)" @mouseleave="starHover(false, 4)" x-large>{{ stars[4].icon }}</v-icon>
                                </v-card>
                            </v-col>
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
                difficulty: 1,
                imgPaths: [],
                suggestedSets: [{id: 0}],
                videoSrc: ''
            },
            isLoading: false,
            imageFiles: [],
            imageObjs: [],
            imgIterator: 0,
            setIterator: 0,
            errorMessage: '',

            // Vuetify:
            model: 0,
            stars: [
                {color: "yellow darken-2", icon: "mdi-star", hover: false, clicked: true},
                {color: "", icon: "mdi-star-outline", hover: false, clicked: false},
                {color: "", icon: "mdi-star-outline", hover: false, clicked: false},
                {color: "", icon: "mdi-star-outline", hover: false, clicked: false},
                {color: "", icon: "mdi-star-outline", hover: false, clicked: false}
            ],
            measureByOptions: ["Time", "Reps"],
            rules: {
                required: value => !!value || 'Required.',
                isNumber: value => !isNaN(value) || 'Must be a number'
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
            this.exerciseForm.muscleGroups = mg;
        },

        starHover (hover, star) {
            if (hover) {
                for (let i = 0; i <= star; i++) {
                    this.stars[i].icon = "mdi-star";
                }
            } else {
                for (let i = 0; i <= star; i ++) {
                    if (!this.stars[i].clicked) {
                        this.stars[i].icon = "mdi-star-outline";
                    }
                }
            }
        },

        starClick (star) {
            for (let i = 0; i <= star; i++) {
                this.stars[i].icon = "mdi-star";
                this.stars[i].color = "yellow darken-2"
                this.stars[i].clicked = true;
            }

            for (let i = star + 1; i < 5; i ++) {
                this.stars[i].icon = "mdi-star-outline";
                this.stars[i].color = "";
                this.stars[i].clicked = false;
            }

            this.exerciseForm.difficulty = star + 1;
            document.activeElement.blur();
        },

        addSet () {
            this.setIterator ++;
            const i = this.setIterator;
            this.exerciseForm.suggestedSets.push({ id: i });
        },

        deleteSet (i) {
            if (this.exerciseForm.suggestedSets.length > 1) {
                let index = this.exerciseForm.suggestedSets.findIndex(x => x.id === i)
                this.exerciseForm.suggestedSets.splice(index, 1);
                document.activeElement.blur();
            }
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

    button {
        margin: 10px 0 5px;
    }

    .imageUpload,
    .difficultyCard {
        margin-top: 10px;
    }

    .imageUpload .v-input {
        padding-left: 10px;
        padding-right: 10px;
        margin-top: 10px;
    }

    .setsAdder .v-icon {
        right: 10px;
    }
</style>