export const formatearFecha = ( filtro ) =>{
    const fechaActual = new Date()   
    if (filtro === 'dia') {
        fechaActual.setDate(fechaActual.getDate() - 1); // Restar un día
      } else if (filtro === 'semana') {
        fechaActual.setDate(fechaActual.getDate() - 7); // Restar siete días
      } else if (filtro === 'mes') {
        fechaActual.setDate(fechaActual.getDate() - 31); // Restar 31 días (aproximadamente un mes)
      }
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Los meses empiezan desde 0, por lo que sumamos 1
    const anio = fechaActual.getFullYear();


// Agregar ceros a la izquierda si es necesario
const diaFormateado = dia < 10 ? `0${dia}` : dia;
const mesFormateado = mes < 10 ? `0${mes}` : mes;


// Formatear la fecha y hora en el formato deseado
const fechaFormateada = `${anio}-${mesFormateado}-${diaFormateado}`;

return fechaFormateada

}

export const formatearFechaActual = () =>{
    const fechaActual = new Date()   
    
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Los meses empiezan desde 0, por lo que sumamos 1
    const anio = fechaActual.getFullYear();


// Agregar ceros a la izquierda si es necesario
const diaFormateado = dia < 10 ? `0${dia}` : dia;
const mesFormateado = mes < 10 ? `0${mes}` : mes;


// Formatear la fecha y hora en el formato deseado
const fechaActualFormateada = `${anio}-${mesFormateado}-${diaFormateado}`;

return fechaActualFormateada

}



export default formatearFecha