import React from 'react';


class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            registerName: '',
            registerEmail:'',
            registerPassword :''
        }
    }
    onNameChange = (event) =>{
        this.setState({
            registerName: event.target.value
        })
    } 
    onEmailChange = (event) =>{
        this.setState({
            registerEmail: event.target.value.toLowerCase()
        })
    }
    onPasswordChange = (event) =>{
        this.setState({
            registerPassword: event.target.value
        })
    } 
    onSubmit = () =>{
        if(this.state.registerEmail=== '' || this.state.registerPassword=== '' || this.state.registerName === '' ){
            alert('Enteries Cannot be empty');
            return;
        }
        this.props.toggleLoader(true)
        fetch(`${this.props.dbUrl}register`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        })
        .then(respone => respone.json())
        .then(data => {
            this.props.toggleLoader(false)
            if(data === 'already exist'){
                alert('Email already Exist, try signIn')
                this.props.onRouteChange('signIn')
            }
            if (data === 'success'){
                alert('Success, You can now login with ' + this.state.registerEmail)
                this.props.onRouteChange('signIn')
            }
        })
        
    }

    render(){
        const {onRouteChange} = this.props
        return(
            <article className="br3 shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6  center">
                <main className="pa4 black-80">
                    <div className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Full Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" onChange={this.onNameChange}/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Username</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" onChange={this.onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" onChange={this.onPasswordChange} />
                            </div>
                        </fieldset>
                        <div className="lh-copy mt3">
                            <input onClick={this.onSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" defaultValue="Register" />
                        </div>
                        <div className="lh-copy mt3">
                            <p  onClick={()=>onRouteChange('signIn')} className="f6 link pointer dim black db">Sign in</p>
                        </div>
                    </div>
                </main>
            </article> 
        )
    }

}

export default Register;