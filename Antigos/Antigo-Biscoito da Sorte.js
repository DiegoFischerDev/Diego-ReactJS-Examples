import React, { Component } from 'react';
import './estilo.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textofrase: ""
    };

    this.frases = [
      'Siga os bons e aprenda com eles.',
      'O bom-senso vale mais do que muito conhecimento.',
      'O riso é a menor distância entre duas pessoas.',
      'Deixe de lado as preocupações e seja feliz.',
      'Realize o óbvio, pense no improvável e conquiste o impossível.',
      'Acredite em milagres, mas não dependa deles.',
      'A maior barreira para o sucesso é o medo do fracasso.'
    ];

    this.quebraBiscoito = this.quebraBiscoito.bind(this);

  }

  quebraBiscoito(){
    let state = this.state;
    let numeroAleatorio =  Math.floor(Math.random() * this.frases.length)
    state.textofrase = this.frases[numeroAleatorio];
    this.setState(state);
  }

  render() {
    return (
      <div className="container">
        <img src={"https://res.cloudinary.com/di9oiqvom/image/upload/v1678994615/biscoito_nc35cf.png"} className="img" />
        <Botao nome="Abrir Biscoito" acaoBtn={this.quebraBiscoito}/>
        <h3 className='textoFrase'>{this.state.textofrase}</h3>
      </div>
    )
  }
}


class Botao extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.acaoBtn}>{this.props.nome}</button>
      </div>
    )
  }
}

export default App;