import React, { Component } from 'react';
import '../App.css';

class Foto extends Component {

  render() {
    //console.log(this.props.foto);
    const src = 'https://farm'+this.props.farm+'.staticflickr.com/'+this.props.server+'/'+this.props.id+'_'+this.props.secret+'_n.jpg';
    return (
      <div>
        <div className='row'>
          <div className='col-md-12'>
            <h1>{this.props.text}</h1>
            <img alt={this.props.text} className="img-responsive img"
            src={src}></img>
          </div>
        </div>
      </div>
    );
  }
}

export default Foto;
