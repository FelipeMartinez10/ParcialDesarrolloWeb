import React, { Component } from 'react';
import '../App.css';


class Tabla extends Component {

  render() {
    var lleno = this.props.lleno;
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
                <td>{this.props.buscados.primero._id}</td>
                <td>{this.props.buscados.primero.count}</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>{this.props.buscados.segundo._id}</td>
                <td>{this.props.buscados.segundo.count}</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>{this.props.buscados.tercero._id}</td>
                <td>{this.props.buscados.tercero.count}</td>
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
