<template>
    <div class="home">
        <h1>This is an about page</h1>
        <div v-for="(todo, key) in todos" :key="key" style="padding: 30px;">
            <h1>{{ todo.title }}</h1>
            <p>{{ todo.content }}</p>
            <router-link :to="{ name: 'oneTodo', params: { id: todo.id }}">{{ todo.id }}</router-link>
        </div>
    </div>
</template>

<script>
import {collection, doc, updateDoc, getDocs, onSnapshot, addDoc, query, orderBy, deleteDoc, setDoc} from "firebase/firestore";
import { db } from "../firebase";
export default{
    name: "HomeView",
    methods: {
        async showTodo(){
            const q = query(collection(db, "todo"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const obj = {id: doc.id}
                let allObj = Object.assign(obj, doc.data());
                this.todos.push(allObj)
            });
        },
    },
    mounted(){
        this.showTodo();
    }, 
    data() {
        return{
            todos: [],
            title: "",
        }
    }
}
</script>
