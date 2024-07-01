import React, { useEffect, useState } from "react";
import { Footer, NavPrincipal } from "../../constants/constants";
import { Table } from "react-bootstrap";
import "../../styles/caja.css";
import axios from "axios";

export const Caja = () => {
  const [caja, setCaja] = useState([]);
  const [mostrarTablaAbrir, setMostrarTablaAbrir] = useState(false);
  const [mostrarTablaIngresos, setMostrarTablaIngresos] = useState(false);
  const [mostrarTablaEgresos, setMostrarTablaEgresos] = useState(false);
  const [estadoCaja, setEstadoCaja] = useState("");
  const [ultimoSaldo, setUltimoSaldo] = useState(0);

  //ingreso y egreso
  const [ingresos, setIngresos] = useState(0);
  const [egresos, setEgresos] = useState(0);
  //const [saldo, setSaldo] = useState(0)
  const [concepto, setConcepto] = useState("");

  //abrir caja
  const [montoInicial, setMontoInicial] = useState(0);

  const getCaja = () => {
    axios.get(`http://localhost:8000/caja`).then((resp) => {
      setCaja(resp.data);
    });
  };

  const getEstadoCaja = () => {
    axios.get(`http://localhost:8000/caja/mostrarEstado`).then((resp) => {
      setEstadoCaja(resp.data[0].estado);
    });
  };

  const getMostrarUltimoSaldo = () => {
    axios.get(`http://localhost:8000/caja/mostrarUltimoSaldo`).then((resp) => {
      setUltimoSaldo(resp.data[0].saldo);
    });
  };

  useEffect(() => {
    getCaja();
    getEstadoCaja();
    getMostrarUltimoSaldo();
  }, []);

  const saldoingresos = parseFloat(ultimoSaldo) + parseFloat(ingresos);
  const saldoegresos = parseFloat(ultimoSaldo) - parseFloat(egresos);

  const handleCierreDeCaja = () => {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Los meses empiezan desde 0, por lo que sumamos 1
    const anio = fechaActual.getFullYear();
    const horas = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();

    // Agregar ceros a la izquierda si es necesario
    const diaFormateado = dia < 10 ? `0${dia}` : dia;
    const mesFormateado = mes < 10 ? `0${mes}` : mes;
    const horasFormateadas = horas < 10 ? `0${horas}` : horas;
    const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;

    // Formatear la fecha y hora en el formato deseado
    const fechaHoraFormateada = `${anio}-${mesFormateado}-${diaFormateado} ${horasFormateadas}:${minutosFormateados}`;

    axios
      .post(`http://localhost:8000/caja/registrar`, {
        fechaYHora: fechaHoraFormateada.toString(),
        concepto: "Cierre de Caja",
        ingresos: 0,
        egresos: ultimoSaldo,
        saldo: 0,
        estado: "Cerrada",
      })
      .then((resp) => {
        alert("se realizo la operacion Cierre Caja");
        getCaja();
      });
  };

  const handleAceptarAperturaCaja = () => {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Los meses empiezan desde 0, por lo que sumamos 1
    const anio = fechaActual.getFullYear();
    const horas = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();

    // Agregar ceros a la izquierda si es necesario
    const diaFormateado = dia < 10 ? `0${dia}` : dia;
    const mesFormateado = mes < 10 ? `0${mes}` : mes;
    const horasFormateadas = horas < 10 ? `0${horas}` : horas;
    const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;

    // Formatear la fecha y hora en el formato deseado
    const fechaHoraFormateada = `${anio}-${mesFormateado}-${diaFormateado} ${horasFormateadas}:${minutosFormateados}`;

    axios
      .post(`http://localhost:8000/caja/registrar`, {
        fechaYHora: fechaHoraFormateada.toString(),
        concepto: "Apertura de Caja",
        ingresos: montoInicial,
        egresos: 0,
        saldo: montoInicial,
        estado: "Abierta",
      })
      .then((resp) => {
        alert("se realizo la operacion Apertura Caja");
        getCaja();
        setMostrarTablaAbrir(false);
      });
  };

  const handleAceptarEngreso = () => {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Los meses empiezan desde 0, por lo que sumamos 1
    const anio = fechaActual.getFullYear();
    const horas = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();

    // Agregar ceros a la izquierda si es necesario
    const diaFormateado = dia < 10 ? `0${dia}` : dia;
    const mesFormateado = mes < 10 ? `0${mes}` : mes;
    const horasFormateadas = horas < 10 ? `0${horas}` : horas;
    const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;

    // Formatear la fecha y hora en el formato deseado
    const fechaHoraFormateada = `${anio}-${mesFormateado}-${diaFormateado} ${horasFormateadas}:${minutosFormateados}`;

    setIngresos(0);

    axios
      .post(`http://localhost:8000/caja/registrar`, {
        fechaYHora: fechaHoraFormateada.toString(),
        concepto: concepto,
        ingresos: 0,
        egresos: egresos,
        saldo: saldoegresos,
        estado: estadoCaja,
      })
      .then((resp) => {
        alert("se realizo la operacion Egreso");
        getCaja();
        setMostrarTablaEgresos(false);
      });
  };

  const handleAceptarIngreso = () => {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Los meses empiezan desde 0, por lo que sumamos 1
    const anio = fechaActual.getFullYear();
    const horas = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();

    // Agregar ceros a la izquierda si es necesario
    const diaFormateado = dia < 10 ? `0${dia}` : dia;
    const mesFormateado = mes < 10 ? `0${mes}` : mes;
    const horasFormateadas = horas < 10 ? `0${horas}` : horas;
    const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;

    // Formatear la fecha y hora en el formato deseado
    const fechaHoraFormateada = `${anio}-${mesFormateado}-${diaFormateado} ${horasFormateadas}:${minutosFormateados}`;

    setEgresos(0);

    axios
      .post(`http://localhost:8000/caja/registrar`, {
        fechaYHora: fechaHoraFormateada.toString(),
        concepto: concepto,
        ingresos: ingresos,
        egresos: 0,
        saldo: saldoingresos,
        estado: estadoCaja,
      })
      .then((resp) => {
        alert("se realizo la operacion Ingreso");
        getCaja();
        setMostrarTablaIngresos(false);
      });
  };

  return (
    <div>
      <div className="bodyCaja">
        <div className="divProductos">
          <NavPrincipal />
          <div className="row m-auto col-12 main">
            <h2 className="glass2">Caja</h2>

            <aside className="col-md-12">
              <div className="glass2 productos">
                <button
                  disabled={estadoCaja === "Abierta"}
                  onClick={() => {
                    setMostrarTablaAbrir(true);
                    setMostrarTablaIngresos(false);
                    setMostrarTablaEgresos(false);
                  }}
                >
                  Abrir Caja
                </button>
                <button
                  disabled={estadoCaja === "Cerrada"}
                  onClick={() => {
                    setMostrarTablaAbrir(false);
                    setMostrarTablaIngresos(true);
                    setMostrarTablaEgresos(false);
                  }}
                >
                  Registrar Ingreso
                </button>
                <button
                  disabled={estadoCaja === "Cerrada"}
                  onClick={() => {
                    setMostrarTablaAbrir(false);
                    setMostrarTablaIngresos(false);
                    setMostrarTablaEgresos(true);
                  }}
                >
                  Registrar Egreso
                </button>
                <button
                  disabled={estadoCaja === "Cerrada"}
                  onClick={handleCierreDeCaja}
                >
                  Cerrar Caja
                </button>
              
              {mostrarTablaAbrir && (
                <div className="glass2">
                  <h3>Apertura de Caja</h3>
                  <input
                    type="number"
                    placeholder="Monto inicial"
                    value={montoInicial}
                    onChange={(e) =>
                      setMontoInicial(parseFloat(e.target.value))
                    }
                  />
                  <button onClick={handleAceptarAperturaCaja}>
                    Aceptar Apertura
                  </button>
                </div>
              )}
              {mostrarTablaIngresos && (
                <div className="glass2">
                  <h3>Registrar Ingreso</h3>
                  <input
                    type="number"
                    placeholder="Monto"
                    value={ingresos}
                    onChange={(e) => setIngresos(parseFloat(e.target.value))}
                  />
                  <input
                    type="text"
                    placeholder="Concepto"
                    value={concepto}
                    onChange={(e) => setConcepto(e.target.value)}
                  />
                  <button onClick={handleAceptarIngreso}>
                    Aceptar Ingreso
                  </button>
                </div>
              )}
              {mostrarTablaEgresos && (
                <div className="glass2">
                  <h3>Registrar Egreso</h3>
                  <input
                    type="number"
                    placeholder="Monto"
                    value={egresos}
                    onChange={(e) => setEgresos(parseFloat(e.target.value))}
                  />
                  <input
                    type="text"
                    placeholder="Concepto"
                    value={concepto}
                    onChange={(e) => setConcepto(e.target.value)}
                  />
                  <button onClick={handleAceptarEngreso}>Aceptar Egreso</button>
                </div>
              )}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Fecha y Hora</th>
                    <th>Concepto</th>
                    <th>Ingresos</th>
                    <th>Egresos</th>
                    <th>Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {caja.map((item, index) => (
                    <tr key={index}>
                      <td>{item.fechaYHora}</td>
                      <td>{item.concepto}</td>
                      <td>{item.ingresos}</td>
                      <td>{item.egresos}</td>
                      <td>{item.saldo}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              </div>
            </aside>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
