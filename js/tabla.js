document.addEventListener("DOMContentLoaded",iniciar);

async function iniciar() {
  "use strict"
  mostrar();

  /*******************************/
  /***Agregar datos desde input**/
  /******************************/
  document.querySelector("#js-ingresar").addEventListener("click",async function(){
    event.preventDefault();
    const url = 'https://web-unicen.herokuapp.com/api/groups/MuñozCabrera10/productosVoley';
    
    let marca = document.querySelector("#ingresoMarca").value;
    let talle = document.querySelector("#ingresoTalle").value;
    let precio = parseInt(document.querySelector('#ingresoPrecio').value);

    let div = document.querySelector(".datos");

    let filas = {
      "thing":{
        "marca" : marca,
        "talle" : talle,
        "precio" : precio
      }  
    };
    try {
      div.innerHTML = "Guardando..";
      let r = await fetch(url,{
        "method" : "POST",
        "headers" : {
          "Content-Type" : "application/json"
        },
        "body" : JSON.stringify(filas)
      });
      let json = await r.json();
       div.innerHTML = "Se guardo correctamente";
    } catch(e) {
      div.innerHTML = "Error al guardar";
    } 
    mostrar();
  })

  /**********************************/
  /***Agregar datos automaticamente**/
  /*********************************/
  document.querySelector("#js-agregar").addEventListener("click",async function(){
    event.preventDefault();
    const url = 'https://web-unicen.herokuapp.com/api/groups/MuñozCabrera10/productosVoley';

    let div = document.querySelector(".datos");

    let filas = {
      "thing":{
        "marca" : "Gaelle",
        "talle" : "P",
        "precio" : 1500
      }  
    };
    try {
      div.innerHTML = "Guardando..";
      let r = await fetch(url,{
        "method" : "POST",
        "headers" : {
          "Content-Type" : "application/json"
        },
        "body" : JSON.stringify(filas)
      });
      let json = await r.json();
      div.innerHTML = "Se agrego correctamente";
    } catch(e) {
      div.innerHTML = "Error al agregar";
    } 
    mostrar();
  })

 

  function limpiar() {
    document.querySelector(".msjEditar").classList.remove("avisoMsjEditar");
    document.querySelector(".msjErrorFiltro").classList.remove("avisoMsjEditar");
  }

  function limpiarForm() {
    document.getElementById("agregarTabla").reset();
  }

  /*****************************/
  /******Filtro por Marca*******/
  /*****************************/
  document.querySelector("#js-filtrar-marca").addEventListener("click",async function(){
    let filtro = document.querySelector("#filtro-marca").value;
    let filtroBody = document.getElementById("filtroBody");
    const url = 'https://web-unicen.herokuapp.com/api/groups/MuñozCabrera10/productosVoley';
     
    try{  
      let r = await fetch(url);
      let json = await r.json();
      
      let newArray = json.productosVoley.filter(items => {
        return items.thing.marca == filtro ;
      });
      let html = '';

       if(newArray.length == 0){
        document.querySelector(".msjErrorFiltro").classList.add("avisoMsjEditar");
         setTimeout(limpiar,2000);
      } else {
        for(const elem of newArray) {
        html+='<tr><td>'+elem.thing.marca+'</td><td>'+elem.thing.talle+'</td><td>'+elem.thing.precio+'</td></tr>'; 
      }  

      document.querySelector(".btn_eliminar").classList.add(".disabled");
      document.querySelector("#tablaBody").classList.add("tablaOculta");
      document.querySelector("#filtroBody").classList.remove("tablaOculta");

      filtroBody.innerHTML = html; 
      }  
    } catch(e) {
      div.innerHTML = "Error al guardar";
    }  

  })

  document.querySelector("#js-limpiar-marca").addEventListener("click",function(){
    document.querySelector("#tablaBody").classList.remove("tablaOculta");
    document.querySelector("#filtroBody").classList.add("tablaOculta");
  })

    async function mostrar(){
    const url = 'https://web-unicen.herokuapp.com/api/groups/MuñozCabrera10/productosVoley';
      let div = document.querySelector(".datos");
      let tables = document.getElementById("tablaBody");
      
      try{  
        let r = await fetch(url);
        let json = await r.json();
        let html = '';
        for(const elem of json.productosVoley) {
          html+='<tr><td>'+elem.thing.marca+'</td><td>'+elem.thing.talle+'</td><td>'+"$"+elem.thing.precio+'</td><td><button class="btn_eliminar" id='+elem._id+'>Eliminar</button></td><td><button class="btn_editar" id='+elem._id+'>Editar</button></td></tr>'; 
        }   
        tables.innerHTML = html;

      } catch(e) {
        div.innerHTML = "Error al guardar";
      }   


  /*******************************/
  /**********Eliminar************/
  /******************************/
  let allButtonsEliminar = document.querySelectorAll(".btn_eliminar");

    for(var i=0; i < allButtonsEliminar.length; i++){
      allButtonsEliminar[i].addEventListener('click', async function (e) {
        eliminar(e);
      });
    }

    async function eliminar(e){
        let idSeleccion = e.target.id;
        const url = 'https://web-unicen.herokuapp.com/api/groups/MuñozCabrera10/productosVoley'+'/'+idSeleccion;
      try{
        div.innerHTML = "Borrando..";
        let r = await fetch(url,{
          "method" : "DELETE"
        });
        let json = await r.json();
        div.innerHTML = "Se borro correctamente";
      } catch(e) {
        div.innerHTML = "Fallo el guardado";
      }     
    mostrar();  
  }

  /*******************************/
  /***********Editar**************/
  /******************************/
  let allButtonsEditar = document.querySelectorAll(".btn_editar");

    for(var i=0; i < allButtonsEditar.length; i++){
      allButtonsEditar[i].addEventListener('click', async function(e) {
        editar(e);
      });
    }

    async function editar(e){
      let marca = document.querySelector("#ingresoMarca").value;
      let talle = document.querySelector("#ingresoTalle").value;
      let precio = parseInt(document.querySelector('#ingresoPrecio').value);
      
      if(marca===''){
        document.querySelector(".msjEditar").classList.add("avisoMsjEditar");
        document.getElementById('ingresoMarca').focus();
        setTimeout(limpiar,2000);
      } else { 
        let idSeleccionEditar = e.target.id;

       const url = 'https://web-unicen.herokuapp.com/api/groups/MuñozCabrera10/productosVoley'+'/'+idSeleccionEditar;

       let filas = {
          "thing":{
            "marca" : marca,
            "talle" : talle,
            "precio" : precio
          }  
        };

      try {
          div.innerHTML = "Editando..";
          let r = await fetch(url,{
            "method" : "PUT",
            "headers" : {
              "Content-Type" : "application/json"
            },
            "body" : JSON.stringify(filas)
          });
          let json = await r.json();
          div.innerHTML = "Se edito correctamente";
      } catch(e) {
          div.innerHTML = "Se edito mal";
        } 
          mostrar();
          setTimeout(limpiarForm,1500);
        }   
  }
    }  


   /*****************************/
  /******Filtro por Talle*******/
  /*****************************/
  document.querySelector("#js-filtrar-talle").addEventListener("click",async function(){
    let filtro = document.querySelector("#filtro-talle").value;
    let filtroBody = document.getElementById("filtroBody");
    const url = 'https://web-unicen.herokuapp.com/api/groups/MuñozCabrera10/productosVoley';
     
    try{  
      let r = await fetch(url);
      let json = await r.json();
      
      let newArray = json.productosVoley.filter(items => {
        return items.thing.talle == filtro ;
      });
      let html = '';
     
      if(newArray.length == 0){
        document.querySelector(".msjErrorFiltro").classList.add("avisoMsjEditar");
         setTimeout(limpiar,2000);
      } else {
        
         for(const elem of newArray) {
          html+='<tr><td>'+elem.thing.marca+'</td><td>'+elem.thing.talle+'</td><td>'+elem.thing.precio+'</td></tr>'; 
        }  
        document.querySelector("#tablaBody").classList.add("tablaOculta");
      document.querySelector("#filtroBody").classList.remove("tablaOculta");

      filtroBody.innerHTML = html;
      }
    } catch(e) {
      div.innerHTML = "Error al filtrar";
    }  

  })

  document.querySelector("#js-limpiar-talle").addEventListener("click",function(){
    document.querySelector("#tablaBody").classList.remove("tablaOculta");
    document.querySelector("#filtroBody").classList.add("tablaOculta");
  })
}


