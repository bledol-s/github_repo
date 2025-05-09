import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC-jCnB_Uf6sjLRRF4aUXl4MYpUS8NN2pQ",
  authDomain: "rehub-8ced7.firebaseapp.com",
  projectId: "rehub-8ced7",
  storageBucket: "rehub-8ced7.firebasestorage.app",
  messagingSenderId: "981782275704",
  appId: "1:981782275704:web:24c707cbe1d812b0052f8d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Registration
document.getElementById("register-button").addEventListener("click", async () => {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const name = document.getElementById("register-name").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user profile to Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      createdAt: new Date()
    });

    alert("Registration successful!");
  } catch (error) {
    alert(error.message);
  }
});

// Login
document.getElementById("login-button").addEventListener("click", async () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
  } catch (error) {
    alert(error.message);
  }
});