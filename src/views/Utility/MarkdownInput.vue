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
                <v-container>
                    <v-textarea 
                        label="Exercise Description" 
                        full-width 
                        auto-grow 
                        @input="update" 
                        counter 
                        no-resize
                        class="inputTextArea"
                        :rules=[rules.required,rules.max]
                    ></v-textarea>
                </v-container>
            </v-tab-item>

            <v-tab-item :value="'tab-2'">
                <v-container>
                    <v-card class="mdOutput" v-html="compiledMarkdown"></v-card>
                </v-container>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
import * as marked from 'marked'
import _ from 'lodash'

export default {
    name: 'MarkdownInput',
    data() {
        return {
            inputDescription: '',

            //Vuetify: 
            tab: null,
            rules: {
                required: value => !!value || 'Required.',
                max: value => value.length <= 1024 || 'Max 1024 characters.'
            }
        }
    },

    computed: {
        compiledMarkdown: function() {
            return marked(this.inputDescription);
        }
    },

    methods: {
        update: _.debounce(function(e) {
            this.inputDescription = e;
        }, 300)
    }
}
</script>

<style scoped>
    .descText {
        padding: 10px;
    }

    .mdOutput {
        box-shadow: unset !important;
    }

    .inputTextArea {
        max-height: 1024px;
        overflow-y: auto;
    }
</style>