import { auth, db } from "./firebase.config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  setDoc, doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// ---------- SIGNUP ----------
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let pass = document.getElementById("password").value.trim();
    if (!name || !email || !pass) {
      alert("All fields required");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);

      await setDoc(doc(db, "Profiles", cred.user.uid), {
        username: name,
        email,
        phone,
        uid: cred.user.uid,
        createdAt: Date.now()
      });

      alert("Signup successful");
      window.location.href = "login.html";

    } catch (err) {
      alert(err.message);
    }
  });
}


// ---------- LOGIN ----------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let pass = document.getElementById("password").value.trim();

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      alert("Login successful");
      window.location.href = "home.html";
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  });
}


// ---------- LOGOUT ----------
const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    alert("Logged out");
    window.location.href = "login.html";
  });
}

