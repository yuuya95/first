<template>
  <div class="meeting">
    <h1>{{ meeting.title }}</h1>
    <p>{{ meeting.describe }}</p>
    <!-- <router-link :to="{ name: 'oneMeetingPerson', params: { id: meeting.id }}">登録者を確認</router-link> -->
    <router-link :to="{ name: 'QRreader', params: { id: meeting.id, type: 'first' }}">入室確認</router-link>
    <router-link :to="{ name: 'QRreader', params: { id: meeting.id, type: 'last' }}">退室確認</router-link>
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
  name: "MeetingView",
  methods: {
    async showTodo() {
      const docRef = doc(db, "meeting", this.$route.params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        this.meeting.title = docSnap.data().title;
        this.meeting.describe = docSnap.data().describe;
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
      meeting: {title: "", describe: ""}
    };
  },
};
</script>
