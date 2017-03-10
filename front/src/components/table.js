import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
var URL = 'http://localhost:3000';

class Tabla extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      buscados:'',
      buscadosLleno:false
    }
    this.getBuscados = this.getBuscados.bind(this);
  }

  getBuscados()
  {
    axios.get(URL+'/users/buscado').then(response =>
      {
        this.setState({
          buscados:response.data,
          buscadosLleno:false
        });
        if(typeof this.state.buscados.tercero !== "undefined")
        {
          this.setState(
            {buscadosLleno:true}
          );
        }
      });
  }

  render() {
    this.getBuscados();
    var lleno = this.state.buscadosLleno;
    return (
      <div>
        <table className="table">
          <thead className="table-header">
            <tr>
              <th>#</th>
              <th>Los mas buscados</th>
              <th>Veces buscado</th>
            </tr>
          </thead>
            {lleno ?(
              <tbody>
              <tr>
                <th scope="row">1</th>
                <td>{this.state.buscados.primero._id}</td>
                <td>{this.state.buscados.primero.count}</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>{this.state.buscados.segundo._id}</td>
                <td>{this.state.buscados.segundo.count}</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>{this.state.buscados.tercero._id}</td>
                <td>{this.state.buscados.tercero.count}</td>
              </tr>
              </tbody>
            ):(
              <tbody>
              <tr>
              </tr>
              </tbody>
            )}

        </table>
      </div>
    );
  }
}

export default Tabla;
