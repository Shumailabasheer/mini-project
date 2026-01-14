import { auth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
sendEmailVerification




} from "./firebase.config.js";

///================== signup ===========================//

////////////////// SignUp

const signUp = async () => {
    //   e.preventDefault(); // 
  let email = document.getElementById("email").value;
  let password = document.getElementById("pswd").value;
  
  console.log("Signup clicked", email, password);

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user);

  } catch (error) {
 console.log("Error code:", error.code);
  console.log("Error message:", error.message);
  }

}

document.getElementById("btn")?.addEventListener("click", signUp);


////////////////// SignIn


const login = async () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("pswd").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
     console.log(userCredential.user);
    await sendEmailVerification(auth.currentUser);
    console.log("email sent successfully");
    
     if (!auth.currentUser.emailVerified) {
      console.log(auth.currentUser);

      await sendEmailVerification(auth.currentUser);
      console.log("email sent successfully");
    } else {
      window.location.replace("/")

    }


  } catch (error) {
   console.log("Error code:", error.code);
  console.log("Error message:", error.message);

  }

}

document.getElementById("btn2")?.addEventListener("click", login);


////......==============logout=================........./////////

// document.getElementById("logout-btn")?.addEventListener("click",()=>{
//   console.log("logout");
//   signOut(auth);
// //==yaha ye logout hone ka bad localstoragen sy role ko remove krwana ha
//   localStorage.removeItem("role")
// })

