import firebase from "firebase/compat/app";
import { USER_STATE_CHANGE } from "../constans/index";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/database"
import "firebase/app"
import "firebase/firestore";



export function fetchUser() {
    return((dispatch)=> {
        firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if (snapshot.exists){
             dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
            }
            else {
                console.log("не существует")
            }
        })

    })
    
}