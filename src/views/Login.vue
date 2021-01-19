<template>
    <div class="signIn">
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
    </div>
</template>

<script>
import { auth } from '../firebase';


export default {
    data() {
        return {
            isLoading: false,
            signInForm: {
                email: '',
                password: ''
            },
            errorMessage: ''
        }
    },

    methods: {
        signIn: function() {
            this.isLoading = true;
            console.log("uProfile", this.$store.state.userProfile);
            console.log(this.signInForm.email);

            auth.signInWithEmailAndPassword(this.signInForm.email, this.signInForm.password).then(() => { console.log('signedIn') }).catch(e => {
                this.errorMEssage = "Error signing in: " + e;
                console.log(e)
                this.isLoading = false;
            });
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