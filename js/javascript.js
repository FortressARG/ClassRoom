"use strict"

document.addEventListener('DOMContentLoaded', () =>{
  
  getComentarios();
 // document.getElementById("enviarComentario").addEventListener("click",() =>{

//}


document.getElementById("enviarComentario").addEventListener("click", postComentario);
});

function getComentarios(){
  const id= document.getElementById("id_alumno").value;
  const url= 'http://localhost/tpeweb2/api/alumnos/'+id;
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  
  fetch(url, requestOptions)
  .then(response => response.json())
  .then(comentarios => render(comentarios))
  .catch(error => console.log('error:', error));
}

function render(comentarios){
  let container= document.querySelector("#cajaComentarios");
  container.innerHTML =""; 
  
  comentarios.forEach(comentario => {
    container.innerHTML += `
    <span class="commenter-pic">
    </span>
    <span class="commenter-name">
    <a href="#">${comentario.usuario_nombre}</a>
    </span>
    <p class="student-name">${comentario.nombre_alumno}</p>
    <p class="comment-txt more">${comentario.contenido}</p>
    <div class="comment-meta">
    <button id="editComment" type="button" class="btn btn-outline-warning">Editar</button>
    <button id="deleteComentario" value="${comentario.id_comentario}"type="button" class="btn btn-outline-danger">Eliminar</button>
    </div>
    `
  });
  let botones= document.querySelectorAll("#deleteComentario");
  botones.forEach(element => {
    element.addEventListener("click", deleteComentario);
  });
}

function deleteComentario(){

  const id= this.value;
  console.log(id);
  const url= 'http://localhost/tpeweb2/api/alumnos/'+id;
  fetch(url, {
    method: 'DELETE',
    header:{ "Content-type":"application/json"},
  })
  .then(response => response.json())
  .then(getComentarios())
  .catch(error => console.log('error', error));
}


function postComentario(){
  
    const comentario ={
      contenido: document.getElementById("contenido").value,
      usuario_nombre:document.getElementById("usuario").innerHTML,
      nombre_alumno: document.getElementById("nombre_alumno").innerHTML
    } 
    console.log(document.getElementById("contenido").value);
    console.log(document.getElementById("usuario").innerHTML);
    console.log(document.getElementById("nombre_alumno").innerHTML);
    const url= 'http://localhost/tpeweb2/api/alumnos/';
      fetch(url, {
        method: 'POST',
        header:{ "Content-type":"application/json"},
        body:JSON.stringify(comentario)
      })
      .then(response => response.json())
      .then(getComentarios())
      .catch(error => console.log('error', error));

}
