export class Evento {
  constructor({
    id_evento,
    nombre_evento,
    fecha_evento,
    tipo_evento,
    descripcion_evento,
  }) {
    (this.id_evento = id_evento),
      (this.nombre_evento = nombre_evento),
      (this.fecha_evento = fecha_evento),
      (this.tipo_evento = tipo_evento),
      (this.descripcion_evento = descripcion_evento);
  }
}
