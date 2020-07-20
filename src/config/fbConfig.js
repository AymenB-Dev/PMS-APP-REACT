import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



//initialize firebase
const firebaseConfig = {
    apiKey: "AIzaSyDLhO3dMWH9ofm5o67KVaMGaKl0XlJVe9M",
    authDomain: "pms-app-c37d9.firebaseapp.com",
    databaseURL: "https://pms-app-c37d9.firebaseio.com",
    projectId: "pms-app-c37d9",
    storageBucket: "pms-app-c37d9.appspot.com",
    messagingSenderId: "68554359439",
    appId: "1:68554359439:web:f6683c45335bd31d7866fa"
};

firebase.initializeApp(firebaseConfig);


export default firebase