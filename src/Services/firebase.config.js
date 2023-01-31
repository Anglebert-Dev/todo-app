import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyBlcIr17777x2tpnSGmxNyp8MDavvwb77Q",
  authDomain: "todo-f34f7.firebaseapp.com",
  projectId: "todo-f34f7",
  storageBucket: "todo-f34f7.appspot.com",
  messagingSenderId: "856276335932",
  appId: "1:856276335932:web:0568625a693d608ea93239"
};

// Initialize Firebase
const app = initializeApp(config);
export const db = getFirestore(app)