<template>
    <h1>create account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="text" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="signInWIthGoogle">Submit with Google</button></p>
</template>

<script>
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
export default {
    name: 'RegisterView',
    methods:{
        register: function (){
            createUserWithEmailAndPassword(getAuth(), this.email, this.password)
            .then((data) => {
                console.log("success!")
                this.$router.push("/")
            })
            .catch((error) => {
                console.log(error.code)
            })
        },
        signInWIthGoogle: function(){
            const provider = new GoogleAuthProvider();
            signInWithPopup(getAuth(), provider)
            .then((result) => {
                console.log("success!")
                this.$router.push("/")
            }).catch((error) => {
                console.log(error.code)
            })
        }
    },
    data() {
        return{
            email: "",
            password: ""
        }
    }
}
</script>