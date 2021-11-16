const firebaseConfig = {
    apiKey: "AIzaSyC7stP5YdRPlECAhrznT3FeFzkMH6Vyw3Q",
    authDomain: "shomara-34a90.firebaseapp.com",
    projectId: "shomara-34a90",
    storageBucket: "shomara-34a90.appspot.com",
    messagingSenderId: "304156956543",
    appId: "1:304156956543:web:ff8e50526526b12a5fec4a"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let nombre = document.getElementById("name");
let cel = document.getElementById("celphone");
let save_btn = document.getElementById("save-btn");
let gmail_btn = document.getElementById("gmail");
let descripcion_btn = document.getElementById("descripcion");
let lista =  document.getElementById("lista");
save_btn.addEventListener("click", (event) =>{
  event.preventDefault();
     let data = {
         nombre: nombre.value,
         correo: gmail_btn.value,
         celular: cel.value,
         descripcion: descripcion_btn.value
     };
     save_data_firebase(data);
});

const save_data_firebase = (d) => {
    db.collection("contactos")
      .add(d)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        get_data_firebase();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
};

let contactos_arr = [];

const get_data_firebase = () => {
  contactos_arr = [];
    db.collection("contactos")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          contactos_arr.push(doc.data());
        });
        buildList();
      });
};

const buildList = () => {
    lista.innerHTML = "";
    contactos_arr.forEach((e) => {
      lista.insertAdjacentHTML(
        "beforeend",
        `
       <li><b>${e.nombre}</b><br> Correo: ${e.correo}<br> Celular: ${e.celular}<br> Descricion: ${e.descripcion}</li><br>
        `
      );
    });
  };

get_data_firebase();