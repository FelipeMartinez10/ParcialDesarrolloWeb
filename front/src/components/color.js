import React, { Component } from 'react';
import '../App.css';
import Foto from './foto';

class Color extends Component {

  render() {
    return (
      <div>
        {this.props.color.map(foto =>
          {
            return(<div key={foto.id}>
              <Foto id={foto.id} farm={foto.farm} server={foto.server} secret={foto.secret}/>
            </div>);
          })}
      </div>
    );
  }
}

export default Color;
