import { initializeApp } from "firebase/app"
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyCzsFXuJW_RJfErkPJ5YJyuWWTdaITP6fo",
	authDomain: "crown-clothing-db-ecaee.firebaseapp.com",
	projectId: "crown-clothing-db-ecaee",
	storageBucket: "crown-clothing-db-ecaee.appspot.com",
	messagingSenderId: "975277287569",
	appId: "1:975277287569:web:46b337ea2ca034987af730",
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
	prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, "users", userAuth.uid)
	console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const {displayName,email}=userAuth
        const createdAt= new Date()

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            })
        }catch(error){
            console.log('error creating user',error.message);
        }
    }

    return userDocRef
}
