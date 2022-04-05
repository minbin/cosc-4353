/*import { initializeApp } from 'firebase/app'
import {
    getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserSessionPersistence
} from 'firebase/auth'
import {
    getFirestore, addDoc, collection, query, where, onSnapshot, doc, getDocs, updateDoc
} from 'firebase/firestore'*/
//const { initializeApp } 
const app = require('firebase/app');
/*const {
    getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserSessionPersistence
} */
const auth = require('firebase/auth')
/*const {
    getFirestore, addDoc, collection, query, where, onSnapshot, doc, getDocs, updateDoc
}*/ 
const firestore = require('firebase/firestore')

const imp = require('./testing.js')

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

async function setupPersistence() {
    await setPersistence(auth, browserSessionPersistence)
}
setupPersistence();
let q = null //for getting query later
let docRefId = null //for getting document to change later
const htmlSetup = document.querySelector('#inHTML')
//function to setup html for view profile page
const settingHtml = (que) => { //pass in q as argument
    getDocs(que)
        .then((snapshot) => {
            let temp = imp.setup(snapshot)
            htmlSetup.innerHTML = temp[0]
            docRefId = temp[1]
        })
}

const colRef = collection(db, 'profile')//for getting a reference to db collection to add a document

//signing users in
const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = loginForm.email.value
    const password = loginForm.pword.value

    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('User logged in: ', cred.user)
            loginForm.reset()
            document.getElementById('viewProfile').style.display = 'block'
            document.getElementById('login').style.display = 'none'
            document.getElementById('header').style.display = 'block'
            document.getElementById('logout').style.display = 'block'
        })
        .catch((err) => {
            alert(err.message)
        })
})

//clicking edit profile button
const change2edit = document.querySelector('#viewForm')
change2edit.addEventListener('submit', (e) => {
    e.preventDefault()
    document.getElementById('viewProfile').style.display = 'none'
    document.getElementById('editProfile').style.display = 'block'
})

//submitting changes made
const submitEdit = document.querySelector('#editForm')
submitEdit.addEventListener('submit', (e) => {
    e.preventDefault()

    let docRef = doc(db, 'profile', docRefId)
    //get values to make changes to database; updating db
    let name = submitEdit.fullName.value
    let pAddress = submitEdit.address1.value
    let sAddress = submitEdit.address2.value
    let cty = submitEdit.city.value
    let stte = submitEdit.dropDown.value
    let zcode = submitEdit.zipcode.value
    updateDoc(docRef, {
        fullName: name,
        primaryAddress: pAddress,
        secondaryAddress: sAddress,
        city: cty,
        state: stte,
        zipcode: zcode
    })
        .then(() => {
            submitEdit.reset()
        })
    settingHtml(q)

    document.getElementById('viewProfile').style.display = 'block'
    document.getElementById('editProfile').style.display = 'none'
})

//subscribing to auth status changes; changing to login page if logged out
onAuthStateChanged(auth, (user) => {
    console.log('user status changed: ', user)
    if (!user) {
        document.getElementById('viewProfile').style.display = 'none'
        document.getElementById('editProfile').style.display = 'none'
        document.getElementById('header').style.display = 'none'
        document.getElementById('logout').style.display = 'none'
        docRefId = null
        q = null //resetting q so next time we use the query, it'll be good to go
        document.getElementById('login').style.display = 'block'
    }
    else {
        q = query(colRef, where('uid', '==', user.uid))
        while (!q)//could not get 'then' function to work so using busy wait
        { }
        settingHtml(q)
        document.getElementById('viewProfile').style.display = 'block'
        document.getElementById('editProfile').style.display = 'none'
        document.getElementById('header').style.display = 'block'
        document.getElementById('logout').style.display = 'block'
        document.getElementById('login').style.display = 'none'
    }
})

//logging out
const logoutButton = document.querySelector('#logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log("The user signed out")
        })
        .catch((e) => {
            alert(err.message)
        })
})

function sum(a,b) {
    return a+b
}
module.exports.sum = sum