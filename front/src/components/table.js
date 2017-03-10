import React, { Component } from 'react';
import '../App.css';

class Tabla extends Component {

  render() {
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
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Tabla;
