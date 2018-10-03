import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';

import Registor from  './components/Registor/Registor.js';
import Navigation from './components/Navigation/Navigation.js'
import Signin from './components/Signin/Signin.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
import Facerecognition from './components/Facerecognition/Facerecognition.js'




const particlesOptions ={
    particles: {
      number:{
        vlaue:30,
        density:{
          enable:true,
          value_area: 100
        }
       }
      }
    }
const initialState = {

    input: '',
      imageUrl: '' ,
      box: {} ,
      route:'Signin' ,
      isSignIn: false ,
      user :{
             id : '',
             name : '',
             email: '',
             entries: 0,
             joined : ''
      }

}            


class App extends Component {
  constructor(){
    super();
    this.state= initialState ;
      

    
  }

  calculateFaceLocation =(data) =>{
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
     return{
       leftCol: clarifaiFace.left_col * width ,
       topRow: clarifaiFace.top_row * height ,
       rightCol: width - (clarifaiFace.right_col * width),
       bottomRow: height - (clarifaiFace.bottom_row * height)
     }
  }

  loaduser =(user) =>{
    this.setState({user: {
             id : user.id ,
             name : user.name ,
             email: user.email ,
             entries: user.entries,
             joined : user.joined
    }})
  }

  displayFaceBox  = (box) =>{
    console.log(box);
     this.setState({box:box});
  }

  onInputChange = (event) => {
    this.setState({input : event.target.value});
  }
  

  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input}) ;
       fetch('https://morning-eyrie-82983.herokuapp.com/imageurl',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })
          })
       .then(response => response.json())
      .then(response => {
        if(response){
          fetch('https://morning-eyrie-82983.herokuapp.com/image',{
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count =>{
            this.setState(Object.assign(this.state.user,{entries:count}))
          })
          .catch(err =>console.log(err))
        
      }
        this.displayFaceBox( this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'Signout'){
      this.setState(initialState)
    }
    else if(route === 'home'){
      this.setState({isSignIn: true})
    }
    this.setState({route : route}) ;
  }

  render() {
    return (
      <div className="App">
         <Particles className='particles' 
         params={particlesOptions}
        />
        <Navigation isSignIn={this.state.isSignIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home'
          ? <div>
            <Logo/>
            <Rank 
              name={this.state.user.name}
              entries={this.state.user.entries }
            />
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
           <Facerecognition  box={this.state.box}imageUrl=
           {this.state.imageUrl}/>
        </div>
        : ( 
          this.state.route === 'Signin'
          ?
          <Signin loaduser = {this.loaduser} onRouteChange={this.onRouteChange}/>
          :<Registor loaduser = {this.loaduser} onRouteChange={this.onRouteChange}/> 
          )
        }
      </div>
    );
  }
}

export default App;
