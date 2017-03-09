import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Foto from './foto';
var URL = 'http://localhost:3000'
class MainComponent extends Component {

  constructor(props) {

      super(props)
      this.state = {
        fotos:[],
        lleno: false,
        text:''
      }
    }

  getFlickrPhotos(event)
  {
    this.setState({text: event.target.value}, function() {
      axios.get(URL+"/users/flickr/"+this.state.text).then(response => {
      if(response.data.length>0)
      {
        this.setState({
          lleno: true,
          fotos: response.data,
          estaLleno:true
        });
      }
      });
    });
  }




  render() {
    const estaLleno = this.state.lleno;
    return (
      <div>
        <div className='row'>
          <h1>Hola</h1>
        </div>
        <div className='row'>
          <input className='col-md-12' onChange={this.getFlickrPhotos.bind(this)}></input>
        </div>
        <div className='row'>
        <div className='col-md-2'>
          {estaLleno ? (this.state.fotos.map(foto =>{
                    return <Foto key={foto.id} id={foto.id} farm={foto.farm} server={foto.server} secret={foto.secret}/>
                  }))
              : (<h3>No hay fotos</h3>)}
        </div>
        <div className='col-md-2'>
          {estaLleno ? (this.state.fotos.map(foto =>{
                    return <Foto key={foto.id} id={foto.id} farm={foto.farm} server={foto.server} secret={foto.secret}/>
                  }))
              : (<h3>No hay fotos</h3>)}
        </div>
        <div className='col-md-2'>
          {estaLleno ? (this.state.fotos.map(foto =>{
                    return <Foto key={foto.id} id={foto.id} farm={foto.farm} server={foto.server} secret={foto.secret}/>
                  }))
              : (<h3>No hay fotos</h3>)}
        </div>
        <div className='col-md-2'>
          {estaLleno ? (this.state.fotos.map(foto =>{
                    return <Foto key={foto.id} id={foto.id} farm={foto.farm} server={foto.server} secret={foto.secret}/>
                  }))
              : (<h3>No hay fotos</h3>)}
        </div>
        <div className='col-md-2'>
          {estaLleno ? (this.state.fotos.map(foto =>{
                    return <Foto key={foto.id} id={foto.id} farm={foto.farm} server={foto.server} secret={foto.secret}/>
                  }))
              : (<h3>No hay fotos</h3>)}
        </div>
        <div className='col-md-2'>
          {estaLleno ? (this.state.fotos.map(foto =>{
                    return <Foto key={foto.id} id={foto.id} farm={foto.farm} server={foto.server} secret={foto.secret}/>
                  }))
              : (<h3>No hay fotos</h3>)}
        </div>
        </div>
      </div>
    );
  }
}

export default MainComponent;
