import React from 'react';

function ListarMoedas ()
{
    const MOEDAS = [// https://fixer.io
        {'sigla':'AUD', 'descricao':'Dolar Australiano'},
        {'sigla':'BRL', 'descricao':'Real Brasileiro'},
        {'sigla':'CAD', 'descricao':'Dolar Canadense'},
        {'sigla':'CHF', 'descricao':'Franco Suíço'},
        {'sigla':'USD', 'descricao':'Dolar Americano'},
        {'sigla':'EUR', 'descricao':'Euro'},
        {'sigla':'MXN', 'descricao':'Peso Mexicano'}
    ];

    function compara(moeda1,moeda2)
    {
        if(moeda1.descricao < moeda2.descriao){
            return -1;
        }else if(moeda1.descricao > moeda2.descricao){
            return 1;
        }
        return 0;
    }

    return MOEDAS.sort(compara).map(moeda =>
        <option value={moeda.sigla} key={moeda.sigla}>
            {moeda.descricao}
        </option>
    );
}

export default ListarMoedas;