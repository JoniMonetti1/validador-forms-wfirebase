// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "******************************",
    authDomain: "validacion-de-formulario-7849d.firebaseapp.com",
    projectId: "validacion-de-formulario-7849d",
    storageBucket: "validacion-de-formulario-7849d.appspot.com",
    messagingSenderId: "217221240434",
    appId: "1:217221240434:web:88cd193ab0b89f5ce914eb",
    measurementId: "G-BXZG8MCCPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
const db = getFirestore(app);



document.getElementById("formulario").addEventListener("submit", async (event) => {
    event.preventDefault();

    //validar campo nombre
    const entradaNombre = document.getElementById("name");
    const errorNombre = document.getElementById("nameError");
    const nombre = entradaNombre.value.trim();

    if (!(nombre.length > 2)) {
        errorNombre.textContent = "Por favor ingrese un nombre valido.";
        errorNombre.classList.add("error-message");
    } else {
        errorNombre.textContent = "";
        errorNombre.classList.remove("error-message");
    }


    //validar campo email
    const entradaEmail = document.getElementById("email");
    const errorEmail = document.getElementById("emailError");
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailPattern.test(entradaEmail.value)) {
        errorEmail.textContent = "Por favor ingrese un email valido.";
        errorEmail.classList.add('error-message');
    } else {
        errorEmail.textContent = "";
        errorEmail.classList.remove("error-message");
    }


    //validar la contraseña
    const entradaPassword = document.getElementById("password");
    const errorPassword = document.getElementById("passwordError");
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

    if (!passwordPattern.test(entradaPassword.value)) {
        errorPassword.textContent = "Por favor ingrese una contraseña valida";
        errorPassword.classList.add("error-message");
    } else {
        errorPassword.textContent = "";
        errorPassword.classList.remove("error-message");
    }

    //enviar formulario
    if (!errorNombre.textContent && !errorEmail.textContent && !errorPassword.textContent) {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                name: entradaNombre.value,
                email: entradaEmail.value,
                password: entradaPassword.value
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        alert("El formulario se ha enviado con exito");
        document.getElementById("formulario").reset();
    }
});