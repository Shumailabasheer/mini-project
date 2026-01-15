import { auth, db } from "./firebase.config.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  // doc, getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ==========================
//  Cloudinary Config
// ==========================
const CLOUD_NAME = "dg9rb36eu";
const UPLOAD_PRESET = "mini-project";

// ==========================
//  Elements
// ==========================
const publishBtn = document.getElementById("publish-btn");
const postsContainer = document.createElement("div");
postsContainer.className = "row mt-4";
document.querySelector(".main-feed").appendChild(postsContainer);

// ==========================
//  Image Preview
// ==========================
const imgInput = document.getElementById("post-image");
const imgPreview = document.getElementById("img-preview");
const previewBox = document.getElementById("img-preview-container");

imgInput.addEventListener("change", () => {
  const file = imgInput.files[0];
  if (file) {
    imgPreview.src = URL.createObjectURL(file);
    previewBox.classList.remove("d-none");
  }
});

// ==========================
//  Publish Post
// ==========================
publishBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const title = document.getElementById("post-title").value.trim();
  const category = document.getElementById("post-category").value;
  const content = document.getElementById("post-content").value.trim();
  const file = document.getElementById("post-image").files[0];

  if (!title || !category || !content || !file) {
    alert("Please fill all fields");
    return;
  }

  const user = auth.currentUser;
  if (!user) {
    alert("Not logged in");
    return;
  }

  try {
    // ==========================
    //  Upload to Cloudinary
    // ==========================
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();

    if (!data.secure_url) {
      throw new Error("Image upload failed");
    }

    const imageURL = data.secure_url;

    // ==========================
    //  Save to Firestore
    // ==========================
    await addDoc(collection(db, "posts"), {
      title,
      category,
      content,
      image: imageURL,
      uid: user.uid,
      createdAt: Date.now()
    });

    alert("Post Published!");

    document.getElementById("create-post-form").reset();
    previewBox.classList.add("d-none");

    loadPosts();

  } catch (error) {
    console.error(error);
    alert("Error: " + error.message);
  }
});

// ==========================
//  Load Posts in Feed
// ==========================
async function loadPosts() {
  postsContainer.innerHTML = "";

  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);

  snap.forEach((doc) => {
    const post = doc.data();

    postsContainer.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm">
          <img src="${post.image}" class="card-img-top" style="height:200px; object-fit:cover;">
          <div class="card-body">
            <span class="badge bg-dark mb-2">${post.category}</span>
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.content}</p>
          </div>
        </div>
      </div>
    `;
  });
}

// Load posts on page load
loadPosts();

// // ===============================onAuthStateChanged ========================
const usernameSpan = document.getElementById("username");
const avatarDiv = document.getElementById("userAvatar");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docRef = doc(db, "Profiles", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      const name = data.username;

      // Full name show
      usernameSpan.innerText = name;

      // First letter in avatar
      const firstLetter = name.charAt(0).toUpperCase();
      avatarDiv.innerText = firstLetter;
    }
  } else {
    // Agar login nahi to wapis login page
    window.location.href = "login.html";
  }
});
