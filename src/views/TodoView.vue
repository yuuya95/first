<template>
  <div class="todo">
    <h1>{{ todo.title }}</h1>
    <p>{{ todo.content }}</p>
  </div>
</template>

<script>
import {
  collection,
  doc,
  updateDoc,
  getDoc,
  onSnapshot,
  addDoc,
  query,
  orderBy,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
export default {
  name: "TodoView",
  methods: {
    async showTodo() {
      const docRef = doc(db, "todo", this.$route.params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        this.todo.title = docSnap.data().title;
        this.todo.content = docSnap.data().content;
      } else {
        // doc.data() がUndefinedの場合の処理
        console.log("No such document!");
      }
    },
  },
  created() {
    this.showTodo();
  },
  data() {
    return {
      todo: {title: "", content: ""}
    };
  },
};
</script>
