import React from 'react';
import ReactDOM from 'react-dom';
import ListarMoedas from './ListarMoedas';

describe('Deve renderizar ListarMoedas', () => {

    it('Deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ListarMoedas />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    
});