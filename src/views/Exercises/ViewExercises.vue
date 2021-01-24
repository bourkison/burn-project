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
                <v-sheet rounded="lg" min-height="70vh">
                    <v-container>
                        <h1 align="center">Exercises</h1>
                        <!-- <ViewExerciseMin></ViewExerciseMin> -->
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
export default {
    name: 'ViewExercises',
    data() {
        return {
            isLoading: true,
            exercises: []
        }
    }
}
</script>