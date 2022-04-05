import { initializeApp } from 'firebase/app'
import {
    getAuth, createUserWithEmailAndPassword
} from 'firebase/auth'
import {
    getFirestore, addDoc, collection
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAC7LY4wF46SVoEIqfjxzDi61yFtciZhl4",
    authDomain: "firstproject-f3af6.firebaseapp.com",
    projectId: "firstproject-f3af6",
    storageBucket: "firstproject-f3af6.appspot.com",
    messagingSenderId: "104262464727",
    appId: "1:104262464727:web:75c6e38b16ff04bb5b6c92"
}
// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()

const colRef = collection(db, 'profile')//for getting a reference to db collection to add a document
//signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = signupForm.email.value
    const password = signupForm.pword.value
    createUserWithEmailAndPassword(auth, email, password) //wrap this in async function
        .then((cred) => {
            console.log('User created ', cred.user)
            signupForm.reset()

            addDoc(colRef, { //await
                city: "",
                fullName: "",
                uid: cred.user.uid,
                email: email,
                primaryAddress: "",
                secondaryAddress: "",
                state: "",
                zipcode: 0
            })
                .then(() => {
                    window.location.replace("index.html")
                })
        })
        .catch((err) => {
            alert(err.message)
        })
})