import React from 'react' ;

class Registor extends React.Component {

constructor(props){
		super(props);
		this.state ={
			Email: '',
			Password: '',
			name: ''
		}
	}

	onNameChange =(event) =>{
 		this.setState({name: event.target.value})
 	}

 	onEmailChange =(event) =>{
 		this.setState({Email: event.target.value})
 	}

 	onPasswordChange =(event) =>{
 		this.setState({Password: event.target.value})
 	}

 	onSubmitSignIn =() =>{
    	fetch('https://morning-eyrie-82983.herokuapp.com/register',{
    		method: 'post',
    		headers: {'Content-type': 'application/json'},
    		body: JSON.stringify({
    			email: this.state.Email,
    			password: this.state.Password,
    			name: this.state.name
    		})
    	})
    		.then(response => response.json())

    		.then(user =>{
    			if(user.id){
    				this.props.loaduser(user)
    				this.props.onRouteChange('home') ;
    			}
    		})
    		.catch(err=>console.log('enable to register'))
    }

render(){
	return(	
		<article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
		<main className="pa4 black-80">
		  <div className="measure ">
		    <fieldset id="Registor" className="ba b--transparent ph0 mh0">
		      <legend className="f2 fw6 ph0 mh0">Registor</legend>
		      <div className="mv3">
		        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
		        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        type="text" 
		        name="name"  
		        id="name"
		        onChange={this.onNameChange}
		        />
		      </div>
		      <div className="mt3">
		        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
		        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        type="email" 
		        name="email-address"  
		        id="email-address"
		        onChange ={this.onEmailChange}
		        />
		      </div>
		      
		      <div className="mv3">
		        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
		        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        type="password" 
		        name="password"  
		        id="password"
		        onChange= {this.onPasswordChange} 
		        />
		      </div>
		      
		    </fieldset>
		    <div className="">
		      <input 
		      onClick={this.onSubmitSignIn }
		      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Registor"/>
		    </div>
		    
		  </div>
		  </main>
		  </article>
		) ;
	}
}

export default Registor ;