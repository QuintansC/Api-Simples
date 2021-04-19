import React, { useState } from 'react';
import api from './cosumirApi';
import './styles/index.css';
import { Button, Modal } from 'react-bootstrap';

export default function App() { 
    const [origem, setOrigem] = useState('011');
    const [destino, setDestino] = useState('016');
    const [plano, setPlano] = useState('30');
    const [minutos, setMinutos] = useState('0');

    const [adicional, setAdicional] = useState('');
    const [valorInicial, setValorInicial] = useState('');
    const [total, setTotal] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    
    async function dados() { // Async significa que é assincrono
        await api.post('/calcula',{
            origem: origem,
            destino: destino,
            minutos: minutos,
            plano: plano 
        }).then(response=> {
            setValorInicial(response.data.valorInicial);
            setAdicional(response.data.adicional);
            setTotal(response.data.total);
            console.log(response.data)
        }); // tem que ser asincrono pois await faz parte de uma funcao assincrona
    }

    function onChangeDados(){
        setOrigem(document.getElementById('origem').value);
        setDestino(document.getElementById('destino').value);
        setPlano(document.getElementById('plano').value);
        setMinutos(document.getElementById('minutos').value);
    }

    function handleShow(){
        dados();
        setShow(true);
    }

    return(
        <div className="content">
            <h1>“Show me the code”</h1>
            <div>
                <h2>Escolha seu Plano</h2>
                <p>Origem: </p>
                <select name="origem" id="origem" onChange={onChangeDados}>
                    <option value="011" selected>011</option>
                    <option value="016">016</option>
                    <option value="017">017</option>
                    <option value="018">018</option>
                </select>
                <p>Destino: </p>
                <select name="destino" id="destino" onChange={onChangeDados}>
                    <option value='011'>011</option>
                    <option value='016' selected>016</option>
                    <option value='017'>017</option>
                    <option value='018'>018</option>
                </select>
                <p>Plano: </p>
                <select name="plano" id="plano" onChange={onChangeDados}>
                    <option value="30">Fale mais 30</option>
                    <option value="60">Fale mais 60</option>
                    <option value="120">Fale mais 120</option>
                </select>
                <p>Adicionais: </p>
                <input type='number' onChange={onChangeDados} id="minutos"></input>

                <Button variant="primary" onClick={handleShow}>
                    Envia dados
                </Button>
            </div>
            

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Resultado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    O valor total é: {total}<br/>
                    O valor adicionado é:{adicional}<br/>
                    O valor do pacote é: {valorInicial}<br/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    );

}