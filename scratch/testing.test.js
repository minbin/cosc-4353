const { initializeApp } = require('firebase/app');
const {
    getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserSessionPersistence
} = require('firebase/auth');
const {
    getFirestore, addDoc, collection, query, where, onSnapshot, doc, getDocs, updateDoc
} = require('firebase/firestore');
const { expect, test } = require('@jest/globals');
const imp = require('./testing.js');
const imp2 = require('./mainIndex.js');

test("on auth state change", () => {
    const val3 = imp2.sum(1,2);
    expect(val3).toBe(3);
})

//for testing setup(snapshot)
let member = {
    data: function() {
        return {
            fullName: 'A',
            primaryAddress: 'B',
            secondaryAddress: 'C',
            city: 'D',
            state: 'E',
            zipcode: 8,
            id: 9
        }
    }
}
let docs = [member, 2];
let snap = {
    docs: docs
}
test("should setup html", () => {
    const val2 = imp.setup(snap);
    expect(val2).toBeTruthy;
})