import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        nome: "",
        email: "",
        senha: "",
        sexo: "masculino"
      },
      error: ""
    };

    this.cadastrar = this.cadastrar.bind(this);
    this.dadosForm = this.dadosForm.bind(this);
  }

  cadastrar(event) {
    if (this.state.form.nome != "" && this.state.form.email != "" && this.state.form.senha != "") {

      const novoUsuario = this.state.form;
      const newForm = {
        nome: "",
        email: "",
        senha: "",
        sexo: "masculino",
      };

      this.setState({
        form: newForm,
        error: ""
      });

      alert(`Novo Usuario Cadastrado!\nNome: ${novoUsuario.nome}\nEmail: ${novoUsuario.email}\nSenha: ${novoUsuario.senha}\nSexo: ${novoUsuario.sexo}`)
    } else { this.setState({ error: "Ops! Parece que esta faltando algo..." }) }

    event.preventDefault(); // Para nao atualizar a pagina
  }

  dadosForm(e) {
    let newForm = this.state.form;
    newForm[e.target.name] = e.target.value;
    this.setState({ form: newForm, error: "" })
  }

  render() {
    return (
      <div>
        <h2>Novo Usuario</h2>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.cadastrar}>

          <label>Nome:</label>
          <input type="nome" name="nome" placeholder='nome' value={this.state.form.nome} onChange={this.dadosForm} /><br />

          <label>Email:</label>
          <input type="email" name="email" placeholder='email' value={this.state.form.email} onChange={this.dadosForm} /><br />

          <label>Senha:</label>
          <input type="password" name="senha" placeholder='senha' value={this.state.form.senha} onChange={this.dadosForm} /><br />

          <label>Sexo:</label>
          <select name="sexo" value={this.state.form.sexo} onChange={this.dadosForm}>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select><br />
          
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    )
  }
}

export default App;