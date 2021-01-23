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
                    <v-container v-if="exerciseData.imgPaths">
                        <v-card>
                        <v-row class="headerRow" align="center" justify="center">
                            <v-col cols="12" sm="6">
                                <h1 align="left">{{ exerciseData.name }}</h1>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div align="right"><v-icon v-for="star in exerciseData.difficulty" color="yellow darken-2" :key="star">mdi-star</v-icon></div>
                            </v-col>
                        </v-row>
                        </v-card>
                        <v-card outlined>
                            <v-carousel v-if="exerciseData.imgPaths.length > 0" v-model="model">
                                <v-carousel-item v-for="img in imgUrls" :key="img.id" :src="img.imgUrl"></v-carousel-item>
                            </v-carousel>
                            <v-container>
                                    <v-sheet align="center">
                                        <v-container class="mdOutput" v-html="compiledMarkdown"></v-container>
                                        <v-card align="center" max-width="33%">
                                            <MuscleGroup :editable="false" :selectedGroups="exerciseData.muscleGroups"></MuscleGroup>
                                        </v-card>
                                    </v-sheet>
                            </v-container>
                        </v-card>
                    </v-container>

                    <v-container v-else>
                        Hello hello
                        <div align="center"><v-progress-circular indeterminate centered></v-progress-circular></div>
                    </v-container>
                </v-sheet>
            </v-col>

            <v-col cols="!2" sm="2">
                <v-sheet rounded="lg" min-height="268">
                    <!--  -->
                </v-sheet>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>

<script>
import { db, storage } from '../../firebase'
import * as marked from 'marked'
import MuscleGroup from '../Utility/MuscleGroup.vue'

export default {
    name: 'ViewExercise',
    components: { MuscleGroup },
    data() {
        return {
            exerciseExists: false,
            isLoading: true,
            exerciseData: {},
            imgUrls: [],

            // Firebase:
            downloadedImageCounter: 0,

            // Vuetify:
            model: 0,
            starsAmount: 0
        }
    },
    created: function() {
        this.downloadExercise();
    },
    beforeRouteUpdate: function() {
        this.downloadExercise();
    },

    computed: {
        compiledMarkdown: function() {
            return marked(this.exerciseData.description);
        }
    },

    methods: {
        downloadExercise: function() {
            db.collection("exercises").doc(this.$route.params.exerciseid).get().then(exerciseDoc => {
                if (exerciseDoc.exists) {
                    this.exerciseData = exerciseDoc.data();
                    this.exerciseData.imgPaths.forEach(img => {
                        storage.ref(img).getDownloadURL().then(url => {
                            this.imgUrls.push({id: this.downloadedImageCounter, imgUrl: url});
                            this.downloadedImageCounter++;
                        })
                    })
                } else {
                    this.exerciseExists = false;
                    this.isLoading = false;
                }
                this.isLoading = false;
            })
        }
    },

    watch: {
        downloadedImageCounter: function() {
            if (this.downloadedImageCounter >= this.exerciseData.imgPaths.length) {
                this.isLoading = true;
                this.exerciseExists = true;
                this.starsAmount = this.exerciseData.difficulty;
            }
        }
    }
}
</script>

<style scoped>
    .headerRow {
        padding: 10px 20px;
    }
</style>