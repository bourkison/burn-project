<template>
    <div class="signUp">
        <div class="container">
            <h1>Sign Up</h1>
            <form @submit.prevent v-if="!isLoading">
                <div id="centerDiv">
                    <label for="emailInput">Email</label>
                    <input id="emailInput" type="text" v-model.trim="signUpForm.email"/><br>

                    <label for="passwordInput">Password</label>
                    <input id="passwordInput" type="password" placeholder="********" v-model.trim="signUpForm.password"/><br>

                    <button @click="signUp">Sign Up</button>
                </div>
                <p>{{ errorMessage }}</p>
            </form>
            <div class="loader" v-if="isLoading"></div>
        </div>
    </div>
</template>

<script>
import { db, auth, usersCollection } from '../firebase'

console.log(usersCollection);

export default {
    data() {
        return {
            isLoading: false,
            signUpForm: {
                email: '',
                password: ''
            },
            errorMessage: ''
        }
    },

    methods: {
        signUp: function() {
            this.isLoading = true;

            console.log(this.signUpForm.email, this.signUpForm.password);

            auth.createUserWithEmailAndPassword(this.signUpForm.email, this.signUpForm.password).then(user => {
                // User now created in Auth system. We now need to create User in Firestore.
                db.collection("user").doc(user.user.uid).set({ 
                    firstName: "Test First Name",
                    surname: "Test Surname",
                    dob: new Date(1997, 12, 5),
                    height: 194,
                    weight: 88,
                    location: "Sydney, Australia"
                 }).then(() => {
                     this.isLoading = false;
                     this.$router.push("/");
                 }).catch(e => {
                     // TODO: Delete newly created user as not created properly.
                     this.errorMessage = "User signed up but error creating user doc." + e;
                     this.isLoading = false;
                 })
            }).catch(e => {
                this.errorMessage = "Error creating user: " + e;
            })
        }
    }
}
</script>

<style scoped>
    .signUp {
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
        margin-top: 115px;
    }

    input {
        margin-bottom: 10px;
    }

    #centerDiv {
        vertical-align: middle;
    }
</style>