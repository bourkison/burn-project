<template>
    <!-- <div class="signIn">
        <div class="container">
            <h1>Sign In</h1>
            <form @submit.prevent v-if="!isLoading">
                <div id="centerDiv">
                    <label for="emailInput">Email</label>
                    <input id="emailInput" type="text" v-model.trim="signInForm.email"/><br>

                    <label for="passwordInput">Password</label>
                    <input id="passwordInput" type="password" placeholder="********" v-model.trim="signInForm.password"/><br>

                    <button @click="signIn">Sign In</button>
                </div>
                <p>{{ errorMessage }}</p>
            </form>
            <div class="loader" v-if="isLoading"></div>
        </div>
    </div> -->
    <v-container>
        <v-row>
            <v-col cols="12" sm="2"><v-sheet rounded="lg" min-height="268" v-show="false"></v-sheet></v-col>
            <v-col
                cols="12"
                sm="8"
            >
                <v-sheet
                    rounded="lg"
                >
                    <v-container>
                        <v-form>
                            <h1 class="text-center">Login</h1>
                            <v-text-field 
                                v-model="signInForm.email" 
                                label="Email" 
                                :rules="[rules.required]" >
                            </v-text-field
                            ><v-text-field 
                                v-model="signInForm.password" 
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required]"
                                :type="showPassword ? 'text' : 'password'"
                                name="input-10-2"
                                label="Password"
                                class="input-group--focused"
                                @click:append="showPassword = !showPassword"
                            ></v-text-field>
                            <div class="text-center">
                                <v-btn @click="signIn">Sign In!</v-btn>
                            </div>
                        </v-form>
                    </v-container>
                </v-sheet>
            </v-col>
            <v-col cols="12" sm="2"><v-sheet rounded="lg" min-height="268" v-show="false"></v-sheet></v-col>
        </v-row>
    </v-container>
</template>

<script>
// import { auth } from '../firebase';


export default {
    data() {
        return {
            isLoading: false,
            signInForm: {
                email: '',
                password: ''
            },
            errorMessage: '',
            // Vuetify:
            showPassword: false,
            rules: {
                required: value => !!value || 'Required.',
                emailMatch: () => (`The email and password you entered don't match`)
            }
        }
    },

    methods: {
        signIn: function() {
            // this.isLoading = true;

            // auth.signInWithEmailAndPassword(this.signInForm.email, this.signInForm.password).then().catch(e => {
            //     this.errorMEssage = "Error signing in: " + e;
            //     this.isLoading = false;
            // });

            console.log(this.signInForm.email)
        }
    }
}
</script>

<style scoped>
    .signIn {
        background-color: #2a343c;
        height: 250px;
        border-radius: 5px;
        display: inline-block;
        margin: 0 auto;
        margin-top: 15px;
        width: 968px;
    }

    .container {
        margin-top: 40px;
    }

    .loader {
        margin-top: 100px;
    }

    input {
        margin-bottom: 10px;
    }

    #centerDiv {
        vertical-align: middle;
    }
</style>