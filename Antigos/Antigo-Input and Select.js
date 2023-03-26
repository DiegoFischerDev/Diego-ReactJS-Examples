import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "teste@teste.com",
      senha: "123456",
      sexo: "masculino"
    };

    this.trocaEmail = this.trocaEmail.bind(this);
    this.trocaSenha = this.trocaSenha.bind(this);
    this.trocaSexo = this.trocaSexo.bind(this);
  }

  trocaEmail(event){
    let valorDigitado = event.target.value;
    this.setState({email: valorDigitado})
  }

  trocaSenha(event){
    let valorDigitado = event.target.value;
    this.setState({senha: valorDigitado})
  }

  trocaSexo(event){
    let novoSexo = event.target.value;
    this.setState({sexo: novoSexo});
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        Email:
        <input type="email" name="email" placeholder='email' onChange={this.trocaEmail}/><br/>
        Senha:
        <input type="password" name="senha" placeholder='senha' onChange={this.trocaSenha}/><br/>
        Sexo:
        <select name="sexo" onChange={this.trocaSexo}>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>

        <div>
          <h3>email: {this.state.email}</h3>
          <h3>senha: {this.state.senha}</h3>
          <h3>sexo: {this.state.sexo}</h3>
        </div>
      </div>
    )
  }
}

export default App;