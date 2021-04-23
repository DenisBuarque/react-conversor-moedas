import React from 'react';
//import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom';
import Conversor from './Conversor';

it('Deve renderizar o componete Conversor:', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Conversor />, div);
  ReactDOM.unmountComponentAtNode(div);
});
