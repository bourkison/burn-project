<template>
    <v-card outlined>
            <v-tabs
                v-model="tab"
                icons-and-text
                fixed-tabs
            >
                <v-tabs-slider></v-tabs-slider>
                <v-tab href="#tab-1">
                    <v-icon>mdi-pencil</v-icon>
                </v-tab>

                <v-tab href="#tab-2">
                    <v-icon>mdi-eye-outline</v-icon>
                </v-tab>

                <v-tab href="#tab-3">
                    <v-icon>mdi-information-outline</v-icon>
                </v-tab>
            </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item :value="'tab-1'">
                <v-textarea label="Exercise Description" class="descText" full-width auto-grow>
                </v-textarea>
            </v-tab-item>

            <v-tab-item :value="'tab-2'">
                <v-card>Another</v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
export default {
    name: 'MarkdownInput',
    data() {
        return {
            tab: null
        }
    }
}
</script>

<style scoped>
    .descText {
        padding: 10px;
    }
</style>