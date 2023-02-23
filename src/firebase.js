import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import firebaseConfig from "../firebaseConfig";

firebase.initializeApp(firebaseConfig);

var auth_obj = firebase.auth();
var storage_obj = firebase.storage();

export default firebase;
export const auth = auth_obj;
export const storage = storage_obj;
