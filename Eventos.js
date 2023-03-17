import React, { Component } from 'react';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      inputValue: "",
      nome: "Visitante"
    }

    this.entrar = this.entrar.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  entrar() {
    this.setState({nome: this.state.inputValue})
  };

  handleChange(event){
    this.setState({inputValue: event.target.value});
  };

  render(){
    return(
      <div>
        <h2>Bem Vindo(a) {this.state.nome}</h2>
        <input placeholder='Digite seu nome' onChange={this.handleChange}></input>
        <button onClick={this.entrar}>Entrar</button><button onClick={()=>{this.setState({nome: "Visitante"})}}>Sair</button>
      </div>
    )
  }

}

export default App;