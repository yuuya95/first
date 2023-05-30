<template>
  <div class="editor">
    <p>aaaa</p>
    タイトル<input type="text" v-model="title">
    <textarea name="memo" cols="30" rows="10" v-model="content"></textarea>
    <button @click="createTodo('todo', {title: title, content: content})">保存</button>
    <button @click="moveNextScreen('/')">aboutへ</button>
  </div>
</template>

<script>
import {collection, doc, updateDoc, getDocs, onSnapshot, addDoc, query, orderBy, deleteDoc, setDoc} from "firebase/firestore";
import { db } from "../firebase";
export default {
  name: 'NewView',
  methods:{
    async createTodo(col, obj){
      const colRef = collection(db, col)
      const docRef = await addDoc(colRef, obj)
      console.log(docRef.id)
      this.moveNextScreen('about')
    },

    async UpdateTodo(col, obj, id){
      const colRef = collection(db, col)
      const docRef = doc(colRef, id);
      await updateDoc(docRef, obj);
      this.moveNextScreen('about')
    },

    moveNextScreen: function (path) {
      this.$router.push(path)
    }
  },
  data() {
    return{
      content: "",
      title: ""
    }
  }
}
</script>

<script setup>
// import {doc, collection, getDocs, onSnapshot, addDoc, query, orderBy, deleteDoc, setDoc} from "firebase/firestore";
// import { ref, reactive, onMounted } from "vue";
// import { db } from "../firebase";

// const collectionRef = await collection(db, "todo");

</script>
