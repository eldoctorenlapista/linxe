import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {

    const [input, setInput] = useState({ tiro_1: 0, tiro_2: 0, adicional_1: 0, adicional_2: 0 });
    const [contadorTurno, setContadorTurno] = useState(0);
    const [turnos, setTurnos] = useState([
        {
            tiro_1: null,
            tiro_2: null,
            puntaje: null
        },
        {
            tiro_1: null,
            tiro_2: null,
            puntaje: null
        },
        {
            tiro_1: null,
            tiro_2: null,
            puntaje: null
        },
        {
            tiro_1: null,
            tiro_2: null,
            puntaje: null
        },
        {
            tiro_1: null,
            tiro_2: null,
            puntaje: null
        },
        {
            tiro_1: null,
            tiro_2: null,
            puntaje: null
        },
        {
            tiro_1: null,
            tiro_2: null,
            puntaje: null
        },
        {
            tiro_1: null,
            tiro_2: null,
            puntaje: null
        },
        {
            tiro_1: null,
            tiro_2: null,
            puntaje: null
        },
        {
            tiro_1: null,
            tiro_2: null,
            puntaje: null
        }
    ]);
    const [start, setStart] = useState(false);
    const [disabledStart, setDisabledStart] = useState(false);
    const [disabledNext, setDisabledNext] = useState(true);
    const [showAdicional1, setShowAdicional1] = useState(true);
    const [showAdicional2, setShowAdicional2] = useState(true);
    const [primaryInputs, setShowPrimaryInputs] = useState(false);
    const [total, setTotal] = useState(0);
    const [showTotal, setShowTotal] = useState(true);

    const onChange = (event) => {
        event.persist();
        setInput({...input, [event.target.name]: Number.isNaN(event.target.value) ? 0 : Number.parseInt(event.target.value)});
    }

    const empezar = () => {
        setStart(true);
        setDisabledStart(true);
    }

    const siguiente = () => {
        const contador = contadorTurno+1;
        setContadorTurno(contador);
        setStart(true);
        setDisabledNext(true);
    }

    const guardar = (event) => {

        event.preventDefault();
        const turnosOld = [...turnos];
        turnosOld[contadorTurno].tiro_1 = input.tiro_1;
        turnosOld[contadorTurno].tiro_2 = input.tiro_2;

        if (contadorTurno>0 && contadorTurno<10) {

            //Tumba todos los pines en el primer tiro STRIKE
            if (turnosOld[contadorTurno-1].tiro_1==10) {
                turnosOld[contadorTurno-1].puntaje = 10+(turnosOld[contadorTurno].tiro_1+turnosOld[contadorTurno].tiro_2);
            }

            //Tumba todos los pines en el segundo tiro SPARE
            if (turnosOld[contadorTurno-1].tiro_1+turnosOld[contadorTurno-1].tiro_2==10) {
                turnosOld[contadorTurno-1].puntaje = 10+turnosOld[contadorTurno].tiro_1;
            }

            turnosOld[contadorTurno].puntaje = input.tiro_1+input.tiro_2;

            if (contadorTurno==9) {

                //Tumba todos los pines en el primer tiro del ultimo turno STRIKE
                if (turnosOld[contadorTurno].tiro_1==10) {
                    setShowAdicional1(false);
                    setShowAdicional2(false);
                    setShowPrimaryInputs(true);
                }

                //Tumba todos los pines en el segundo tiro del ultimo turno SPARE
                if (turnosOld[contadorTurno].tiro_1+turnosOld[contadorTurno].tiro_2==10) {
                    setShowAdicional1(false);
                    setShowPrimaryInputs(true);
                }

                turnosOld[contadorTurno].puntaje = input.tiro_1+input.tiro_2;

            }

        }else {
            turnosOld[contadorTurno].puntaje = input.tiro_1+input.tiro_2;
        }

        setTurnos(turnosOld);
        setStart(false);
        setInput({ tiro_1: 0, tiro_2: 0, adicional_1: 0, adicional_2: 0 });

        if (contadorTurno!=9) {
            setDisabledNext(false);
        }

    }

    const finalizar = (event) => {

        const turnosOld = [...turnos];
        let total = 0;

        turnosOld[contadorTurno].puntaje = turnosOld[contadorTurno].tiro_1+turnosOld[contadorTurno].tiro_2+input.adicional_1+input.adicional_2;

        setTurnos(turnosOld);
        setInput({ tiro_1: 0, tiro_2: 0, adicional_1: 0, adicional_2: 0 });

        for (let i in turnos) {
            total += turnos[i].puntaje;
        }

        setShowTotal(false);
        setTotal(total);
        setContadorTurno(0);
    }

    return (
        <div className="App">
            <p>
                Turno actual: {contadorTurno+1}<br />
                <button disabled={disabledStart} className="btn btn-primary" onClick={empezar}>Empezar</button>
                <button disabled={disabledNext} className="btn btn-secondary" onClick={siguiente}>Siguiente</button>
            </p>
            <table border="1">
                <thead>
                    <tr>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>7</th>
                        <th>8</th>
                        <th>9</th>
                        <th>10</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {turnos.map((item, index) => (
                            <td key={index}>
                                <div>{item.tiro_1}</div>
                                <div>{item.tiro_2}</div>
                                <div>{item.puntaje}</div>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
            <div className="form-control">
                <div hidden={primaryInputs}>
                    <label>Digitar puntaje tiro 1</label><br />
                    <input name="tiro_1" onChange={onChange} value={input.tiro_1} disabled={!start} type="number" /><br />
                    <label>Digitar puntaje tiro 2</label><br />
                    <input name="tiro_2" onChange={onChange} value={input.tiro_2} disabled={!start} type="number" /><br />
                </div>
                <div hidden={showAdicional1}>
                    <label>Tiro adicional 1</label><br />
                    <input name="adicional_1" onChange={onChange} value={input.adicional_1} type="number" /><br />
                </div>
                <div hidden={showAdicional2}>
                    <label>Tiro adicional 2</label><br />
                    <input name="adicional_2" onChange={onChange} value={input.adicional_2} type="number" /><br />
                </div>
                <div hidden={showTotal}>
                    <label>Total</label><br />
                    <input value={total} type="number" /><br />
                </div>
            </div>
            <button hidden={primaryInputs} type="submit" disabled={!start} onClick={event => guardar(event)} className="btn btn-info">Guardar</button>
            <button disabled={(contadorTurno==9) ? false: true} type="submit" onClick={event => finalizar(event)} className="btn btn-danger">Finalizar</button>
        </div>
    );
}
