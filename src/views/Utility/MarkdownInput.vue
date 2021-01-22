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
                        ref="textArea"
                        full-width 
                        auto-grow 
                        @keyup="handleType"
                        @mouseup="setCaretPos"
                        v-model="inputDescription" 
                        counter 
                        no-resize
                        class="inputTextArea"
                        :rules=[rules.required,rules.max]
                    ></v-textarea>
                    <v-btn icon @click="formatUl"><v-icon>mdi-format-list-bulleted</v-icon></v-btn>
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
            inputByRow: [],
            
            // Markdown Format:
            caretPos: 0,
            orderingList: false,

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
        handleType: function(e) {
            this.setCaretPos(e);
            if (this.inputDescription.includes("\n")) {
                this.inputByRow = this.inputDescription.split("\n");
            } else {
                this.inputByRow = [this.inputDescription];
            }
            let caretRow = this.getCaretRow(this.inputByRow);


            // If Enter Press && Previous row starts with "* ""
            // console.log(this.inputByRow[this.getCaretRow(this.inputByRow) - 1].substring(0, 2));
            if (caretRow > 0) {
                console.log(caretRow, e.keyCode, this.inputByRow[caretRow - 1].substring(0, 2));
                if (e.keyCode === 13 && this.inputByRow[caretRow - 1].substring(0, 2) == "* ") {
                    this.inputByRow[caretRow] = "* ";
                    this.caretPos += 2;
                    this.inputDescription = this.inputByRow.join("\n");
                    this.setSelectionArea();
                }
            }

            console.log(e);

        },

        setCaretPos: function(e) {
            this.caretPos = e.target.selectionStart;
        },

        getCaretRow: function(arr) {
            let count = 0;
            let i = 0;
            let rowFound = false;

            arr.forEach(a => {
                count += a.length;

                if (count >= this.caretPos) {
                    rowFound = true;
                    console.log(i);
                    return i;
                }

                i++;
                count++;
            })

            if (rowFound) { return i } else { console.log("Failure finding row"); return false; }
        },

        formatUl: _.debounce(function() {
            this.orderingList = !this.orderingList;

            let caretRow = this.getCaretRow(this.inputByRow);

            if (this.inputByRow[caretRow].substring(0, 2) === "* ") {
                this.inputByRow[caretRow] = this.inputByRow[caretRow].substring(2);
                this.caretPos -= 2;
            } else {
                this.inputByRow[caretRow] = "* " + this.inputByRow[caretRow];
                this.caretPos += 2;
            }

            this.inputDescription = this.inputByRow.join("\n");
            this.$refs.textArea.focus();
            this.setSelectionArea();            

        }, 100),

        setSelectionArea: _.debounce(function() {
            // this.setSelectionRange(this.$refs.textArea, this.caretPos, this.caretPos)   
            console.log(this.$refs.textArea.$el);
            this.$refs.textArea.$el.querySelector('textarea').setSelectionRange(this.caretPos, this.caretPos);
        }, 2),

        // setSelectionRange: function(input, selectionStart, selectionEnd) {
        //     if (input.setSelectionRange) {
        //         input.focus();
        //         input.setSelectionRange(selectionStart, selectionEnd);
        //     } else if (input.createTextRange) {
        //         var range = input.createTextRange();
        //         range.collapse(true);
        //         range.moveEnd('character', selectionEnd);
        //         range.moveStart('character', selectionStart);
        //         range.select();
        //     }
        // },

    },

    watch: {}
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