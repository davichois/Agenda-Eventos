import { Evento } from "./utils/model.js";
import { generatorId } from "./utils/generatedID.js";

//Llamadas de etiquetas principales atravez del DOM
const limpiar = document.querySelector("#limpiar");
const agendar = document.querySelector("#agendar");
const listado_evento = document.querySelector("#listado_evento");
let num_notas = document.querySelector("#num_notas");

//Array global de eventos
let arrayEventos = [];

//Eventos
limpiar.addEventListener("click", (e) => {
  e.preventDefault();
  LimpiarCampos();
});

agendar.addEventListener("click", (e) => {
  e.preventDefault();

  // Captura de datos
  const nombre_evento = document.querySelector("#nombre_evento").value.trim();
  const fecha_evento = document.querySelector("#fecha_evento").value.trim();
  const descripcion_evento = document
    .querySelector("#descripcion_evento")
    .value.trim();
  let academico = document.getElementById("academico");
  let social = document.getElementById("social");
  let privado = document.getElementById("privado");

  // Valor de radio button
  let tipo_evento = "";

  if (academico.checked) {
    tipo_evento = academico.value;
  } else if (social.checked) {
    tipo_evento = social.value;
  } else {
    tipo_evento = privado.value;
  }

  // Proceso de validacion y guardado
  if (
    (nombre_evento && fecha_evento && descripcion_evento && tipo_evento) != ""
  ) {
    const evento = new Evento({
      id_evento: generatorId(5),
      nombre_evento,
      fecha_evento,
      tipo_evento,
      descripcion_evento,
    });

    arrayEventos.push(evento);
    GuardarEvento();
    return Swal.fire({
      title: "Evento registrado Correctamente",
      icon: "success",
    });
  } else {
    return Swal.fire({
      title: "Rellena los Campos...",
      icon: "warning",
    });
  }
});

listado_evento.addEventListener("click", (e) => {
  let opcion = e.path[0].defaultValue;

  if (opcion === "Eliminar") {
    const idEvento = e.path[2].id;
    EliminarEvento(idEvento);
  } else if (opcion === "Editar") {
    const idEvento = e.path[2].id;
    EditarEvento(idEvento);
  }
});

listado_evento.addEventListener("dblclick", (e) => {
  let id = e.path[0].id;
  let indexArray = arrayEventos.findIndex(
    (elemento) => elemento.id_evento === id
  );

  document.querySelector("#nombre_evento").value =
    arrayEventos[indexArray].nombre_evento;
  document.querySelector("#fecha_evento").value =
    arrayEventos[indexArray].fecha_evento;
  document.querySelector("#descripcion_evento").value =
    arrayEventos[indexArray].descripcion_evento;

  if (arrayEventos[indexArray].tipo_evento === "academico") {
    document.getElementById("academico").checked = true;
  } else if (arrayEventos[indexArray].tipo_evento === "social") {
    document.getElementById("social").checked = true;
  } else {
    document.getElementById("privado").checked = true;
  }
});

// Funciones a hacer
const GuardarEvento = () => {
  localStorage.setItem("eventos", JSON.stringify(arrayEventos));
  PintarLista();
  LimpiarCampos();
  fechaEvento();
};

const PintarLista = () => {
  listado_evento.innerHTML = "";

  arrayEventos = JSON.parse(localStorage.getItem("eventos")) || [];
  num_notas.textContent = `${arrayEventos.length}`;

  arrayEventos.forEach((evento) => {
    listado_evento.innerHTML += `<div class="item-container" id="${evento.id_evento}"> <div class="info"> <p>${evento.nombre_evento}</p><span>${evento.tipo_evento}</span> </div> <div class="acciones-item"><input type="button" value="Eliminar" class="btn" title="eliminar"> <input type="button" value="Editar" class="btn" title="editar"> </div> </div>`;
  });
};

const LimpiarCampos = () => {
  document.querySelector("#nombre_evento").value = "";
  document.querySelector("#fecha_evento").value = "";
  document.querySelector("#descripcion_evento").value = "";
  document.getElementById("academico").checked = false;
  document.getElementById("social").checked = false;
  document.getElementById("privado").checked = false;
};

const EditarEvento = (evento) => {
  let indexArray = arrayEventos.findIndex(
    (elemento) => elemento.id_evento === evento
  );

  let academico = document.getElementById("academico");
  let social = document.getElementById("social");
  let privado = document.getElementById("privado");

  arrayEventos[indexArray].nombre_evento =
    document.querySelector("#nombre_evento").value;
  arrayEventos[indexArray].fecha_evento =
    document.querySelector("#fecha_evento").value;
  arrayEventos[indexArray].descripcion_evento = document.querySelector(
    "#descripcion_evento"
  ).value;

  let tipo_evento = "";

  if (academico.checked) {
    tipo_evento = academico.value;
  } else if (social.checked) {
    tipo_evento = social.value;
  } else {
    tipo_evento = privado.value;
  }

  arrayEventos[indexArray].tipo_evento = tipo_evento;

  GuardarEvento();
  Swal.fire({
    title: "Evento editado correctamente",
    icon: "success",
  });
};

const EliminarEvento = (evento) => {
  let indexArray;
  arrayEventos.forEach((elemento, index) => {
    if (elemento.id_evento === evento) {
      indexArray = index;
    }
  });

  arrayEventos.splice(indexArray, 1);
  GuardarEvento();
};

const fechaEvento = () => {
  let fechas = [];

  arrayEventos.forEach((evento) => {
    fechas.push(evento.fecha_evento);
  });

  let nuevasFechas = fechas.sort();

  let indexArray = arrayEventos.findIndex(
    (elemento) => elemento.fecha_evento === nuevasFechas[0]
  );

  let fecha_evento_cercano = document.querySelector("#fecha_evento_cercano");
  let nombre_evento_cercano = document.querySelector("#nombre_evento_cercano");

  if (fechas.length > 0) {
    nombre_evento_cercano.textContent = arrayEventos[indexArray].nombre_evento;
    fecha_evento_cercano.textContent = nuevasFechas[0];
  } else {
    nombre_evento_cercano.textContent = "null";
    fecha_evento_cercano.textContent = "null";
  }
};

PintarLista();

fechaEvento();
