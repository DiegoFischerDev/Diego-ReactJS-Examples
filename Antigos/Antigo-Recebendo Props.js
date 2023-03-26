import React, { Component } from 'react'

class Feed extends Component {

  render() {
    return (
      <div key={this.props.id} >
        <h3>{this.props.name}</h3>
        <a>{this.props.curtidas} {this.props.curtidas == 1 ? "curtida" : "curtidas"} </a>
        <a>{this.props.comentarios} {this.props.comentarios == 1 ? "comentario" : "comentarios"}</a>
        <hr/>
      </div>
    )
  }
}

export default Feed;