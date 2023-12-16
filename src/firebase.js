import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyA_iQNKB6wgBaoWb3ml2ggCER02qv5DH1o",
    authDomain: "countshapes.firebaseapp.com",
    projectId: "countshapes",
    storageBucket: "countshapes.appspot.com",
    messagingSenderId: "798949190317",
    appId: "1:798949190317:web:adc5686f96238ccfe1b424",
    measurementId: "G-LGYJL9GRTJ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export  {auth,app};
