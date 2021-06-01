import firebase from "firebase/app"
// import initializeApp from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCgNaKikcNjziTVmJiAaZZMGgv3kzbPxko",
    authDomain: "finmagix-client.firebaseapp.com",
    projectId: "finmagix-client",
    storageBucket: "finmagix-client.appspot.com",
    messagingSenderId: "202937752559",
    appId: "1:202937752559:web:f8c7310273d491c261f41a",
    measurementId: "G-N61PTJ7KZ3"
  };
  const fire = firebase.initializeApp(firebaseConfig);
  // firebase.analytics();     
  export default fire;