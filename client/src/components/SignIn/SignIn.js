import React from 'react';


class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state={
            signInEmail:'',
            signInPassword :''
        }
    }
    onEmailChange = (event) =>{
        this.setState({
            signInEmail: event.target.value.toLowerCase()
        })
    }
    onPasswordChange = (event) =>{
        this.setState({
            signInPassword: event.target.value
        })
    } 
    onSubmit = () =>{
        if(this.state.signInEmail=== '' || this.state.signInPassword=== '' ){
            alert('Enteries Cannot be empty');
            return;
        }
        this.props.toggleLoader(true);
        fetch(`${this.props.dbUrl}signin`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(respone => respone.json() )
            .then(data => {
                this.props.toggleLoader(false)
                if (data.value === 'success'){
                    this.props.onRouteChange('home')
                    this.props.loadUser(data.user.id, data.user.name, data.user.email, data.user.enteries, data.user.enteries.joined)
                }
                else    
                    alert('Wrong Crendital')
            })
       
    }
    
    render(){
        const {onRouteChange} =  this.props;
        return(
            <article className="br3 shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6  center">
                <main className="pa4 black-80">
                    <div className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In from github</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Username</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" onChange={this.onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" onChange={this.onPasswordChange}/>
                            </div>
                        </fieldset>
                        <div className="lh-copy mt3">
                            <input onClick={this.onSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" defaultValue="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                            <p className="f6 link pointer dim black db" onClick={()=>onRouteChange('register')}>Sign up</p>
                        </div>
                    </div>
                </main>
            </article> 
        )
    }

}

export default SignIn;