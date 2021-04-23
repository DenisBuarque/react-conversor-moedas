import React, { useState } from 'react';
import './Conversor.css';
import { Jumbotron, Button, Form, Col, Spinner, Alert, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import ListarMoedas from './ListarMoedas';
import axios from 'axios';


function Conversor() {
  
  const FIXER_URL = 'http://data.fixer.io/api/latest?access_key=5bae99b47e7e3fcf8e1e51b47e8cbc1e';

  const [valor, setValor] = useState('1');
  const [moedaDe, setMoedaDe] = useState('BRL');
  const [moedaPara, setMoedaPara] = useState('USD');
  const [exibirSpinner, setExibirSpinner] = useState(false);
  const [formValidado, setFormValidado] = useState(false);
  const [exibirModal, setExibirModal] = useState(false);
  const [resultadoConversao, setResultadoConversao] = useState('');
  const [exibirMsgErro, setExibirMsgErro] = useState(false);

  function handleValor(event)
  {
    setValor(event.target.value.replace(/\D/g, '')); // permite digitar somente números
  }

  function handleMoedaDe(event)
  {
    setMoedaDe(event.target.value);
  }

  function handleMoedaPara(event)
  {
    setMoedaPara(event.target.value);
  }

  function handleFecharModal(event)
  {
    setValor('1');
    setMoedaDe('BRL');
    setMoedaPara('USD');
    setFormValidado(false);
    setExibirModal(false);
  }

  function converter(event)
  {
    event.preventDefault(); // evita o refresh da página
    setFormValidado(true);
    if(event.currentTarget.checkValidity() === true)
    {
      setExibirSpinner(true);
      axios.get(FIXER_URL).then(res => {
        const cotacao = obterCotacao(res.data);
        if(cotacao) {
          setResultadoConversao(`${valor} ${moedaDe} = ${cotacao} ${moedaPara}`);
          setExibirModal(true);
          setExibirSpinner(false);
          setExibirMsgErro(false);
        } else {
          exibirErro();
        }
      }).catch( err => exibirErro());
    }
  }

  function exibirErro()
  {
    setExibirMsgErro(true);
    setExibirSpinner(false);
  }

  function obterCotacao(dadosCotacao)
  {
    if(!dadosCotacao || dadosCotacao.success !== true){
      return false;
    }
    const cotacaoDe = dadosCotacao.rates[moedaDe];
    const cotacaoPara = dadosCotacao.rates[moedaPara];
    const cotacao = (1 / cotacaoDe * cotacaoPara) * valor;
    return cotacao.toFixed(2);
  }

  return (
    <div>
      <h1>Conversor de moedas</h1>
      <Alert variant='danger' show={exibirMsgErro}>
        Erro ao obter dados de conversão.
      </Alert>
      <Jumbotron>
        <Form onSubmit={converter} noValidate validated={formValidado}>
          <Form.Row>
            <Col sm='3'>
              <Form.Control value={valor} onChange={handleValor} required placeholder='0'/>
            </Col>
            <Col sm='3'>
              <Form.Control as='select' value={moedaDe} onChange={handleMoedaDe}>
                <ListarMoedas />
              </Form.Control>
            </Col>
            <Col sm='1' className='text-center' style={{ paddingTop: '5px' }}>
              <FontAwesomeIcon icon={faAngleDoubleRight}/>
            </Col>
            <Col sm='3'>
              <Form.Control as='select' value={moedaPara} onChange={handleMoedaPara}>
                <ListarMoedas />
              </Form.Control>
            </Col>
            <Col sm='2'>
              <Button type='submit' avriant='success'>
                <span className={exibirSpinner ? null : 'hidden'}><Spinner animation='border' size='sm'/></span> 
                <span className={exibirSpinner ? 'hidden' : null}>Converter</span>
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Jumbotron>

      <Modal show={exibirModal} onHide={handleFecharModal}>
        <Modal.Header closeButton>
          <Modal.Title>Conversão de moeda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {resultadoConversao}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={handleFecharModal}>Nova converção</Button>
        </Modal.Footer>
      </Modal>


    </div>
  );
}

export default Conversor;
