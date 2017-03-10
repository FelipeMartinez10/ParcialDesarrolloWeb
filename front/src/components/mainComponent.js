import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Color from './color';
import Tabla from './table';
var URL = 'http://localhost:3000';
const colores = ["blue", "yellow", "red", "orange", "green", "purple"];
class MainComponent extends Component {
  constructor(props) {

      super(props)
      this.state = {
        lleno:false,
        fotos:[[],[],[],[],[],[]],
        text:'',
        buscados:{},
        buscadosLleno:false
      }
      this.getBuscados = this.getBuscados.bind(this);
    }

  getFlickrPhotos(event)
  {
    if(event.key ==='Enter')
    {
      this.setState({text: event.target.value}, function() {
        if(this.state.text ==='')
        {
          this.setState({
            lleno:false,
            fotos:[[],[],[],[],[],[]],
            text:''
          });
        }
        else
        {
          var i =0;
          colores.forEach(co =>
            axios.get(URL+"/users/flickr/"+this.state.text+' '+co).then(response => {
              if(response.data.length>0)
              {
                const nuevo = this.state.fotos;
                nuevo[i]=response.data;
                i++;
                this.setState({
                  lleno: true,
                  fotos:nuevo,
                  estaLleno:true
                });
              }
            })
          );
          axios.post(URL+"/users/insert/"+this.state.text).then(response =>
            {
              this.getBuscados();
            });
        }
      });
    }
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
    var i = 0;
    const estaLleno = this.state.lleno;
    return (
      <div>
        <div className='row top'>
          <div className='col-md-6'>
            <div className='row'><h1>Flickr Rainbow</h1></div>
            <div className='row'>
              <input className='col-md-12' onKeyPress={this.getFlickrPhotos.bind(this)}></input>
            </div>
          </div>
          <div className='col-md-6'><Tabla buscados={this.state.buscados} lleno={this.state.buscadosLleno}></Tabla></div>
        </div>
        <hr className="divisor"></hr>
        <div>
          <div className='row'>
            {estaLleno ? (this.state.fotos.map(color =>{
              i++;
                return (<div key={i} className='col-md-2'><Color color={color}/></div>)}))
                : (<h3>Escribe algo y presiona enter!</h3>)}
          </div>
          <hr className="divisor"></hr>
          <div className='row'><span>Proyecto realizado por <a href='https://webdevuniandes.github.io/f-martinez11/' target='_blank'>Felipe Martínez Piazuelo </a> </span></div>
        </div>
      </div>
    );
  }
}

export default MainComponent;
