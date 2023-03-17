import React, { Component } from 'react';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      hora: '00:00:00'
    };
  }

  componentDidMount(){
    setInterval(()=>{
      this.setState({ hora: new Date().toLocaleTimeString() });
    }, 1000)
  }

  componentDidUpdate(){
    console.log("atualizooou")
  }

  render(){
    return(
      <h1>Iniciei o Projeto: {this.state.hora}</h1>
    )
  }
}

export default App;