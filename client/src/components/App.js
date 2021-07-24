import React, { Component } from 'react'
import Particles from 'react-particles-js'
import './App.css'
import cogoToast from 'cogo-toast'

//Components
import Navbar from './Navbar/Navbar.js'
import Logo from './Logo/Logo.js'
import Rank from './Rank/Rank.js'
import ImageForm from './ImageForm/ImageForm.js'
import FaceDetectionBox from './FaceDetectionBox/FaceDetectionBox.js'
import SignIn from './SignIn/SignIn.js'
import Register from './Register/Register.js'
import { Spinner } from './spinner/spinner'

const dbUrl = 'https://smartbrain-69-api.herokuapp.com/'
// const dbUrl = 'http://localhost:3002/';

const ParticleOption = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
}
const initialState = {
  isLoading: false,
  input: '',
  imgURL: '',
  box: [{}, {}],
  route: 'signIn',
  id: '',
  name: '',
  email: '',
  enteries: '',
  jonined: '',
}

class App extends Component {
  constructor() {
    super()
    this.state = initialState
  }
  componentDidMount() {
    cogoToast.loading('Connecting to database...').then(() => {
      fetch(`${dbUrl}`).then(
        (resp) =>
          cogoToast.success('Database Connected') && console.log(resp.status)
      )
    })
  }

  toggleLoader = (value) => {
    this.setState({ isLoading: value })
  }
  loadUser = (id, name, email, enteries, joined) => {
    this.setState({
      id: id,
      name: name,
      email: email,
      enteries: enteries,
      joined: joined,
    })
  }
  calculateFaceBox = (data) => {
    const boundings = data.outputs[0].data.regions
    const faceimg = document.getElementById('faceimg')
    const imgwidth = faceimg.width
    const imgheight = faceimg.height

    const boundingBox = []
    boundings.map((user, i) => {
      return (boundingBox[i] = boundings[i].region_info.bounding_box)
    })
    return boundingBox.map((users, i) => {
      return {
        leftCol: boundingBox[i].left_col * imgwidth,
        topRow: boundingBox[i].top_row * imgheight,
        rightCol: imgwidth - boundingBox[i].right_col * imgwidth,
        bottomRow: imgheight - boundingBox[i].bottom_row * imgheight,
      }
    })
  }
  displayBox = (box) => {
    this.setState({
      box: box,
    })
  }
  onInput = (event) => {
    this.setState({
      input: event.target.value,
    })
  }
  onSubmit = (event) => {
    this.setState({
      imgURL: this.state.input,
    })
    if (this.state.input === '') {
      alert('URL Cannot Be Empty')
    } else {
      fetch(`${dbUrl}apiCall`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: this.state.input,
        }),
      })
        .then((response) => response.json())
        .then(
          (response) => {
            console.log(response)
            this.displayBox(this.calculateFaceBox(response))
            this.setState({
              enteries: parseInt(this.state.enteries) + 1,
            })
          },
          (err) => {
            console.log('errrorr')
          }
        )
      fetch(`${dbUrl}image`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.state.id,
        }),
      })
    }
  }
  onRouteChange = (value) => {
    this.setState({
      route: value,
    })
    if (value === 'signIn') {
      this.setState(initialState)
    }
  }
  render() {
    return (
      <div className="App">
        {this.state.isLoading ? <Spinner /> : null}
        <Particles className="particles" params={ParticleOption} />
        <Navbar onRouteChange={this.onRouteChange} route={this.state.route} />
        {this.state.route === 'home' ? (
          <div>
            <Logo />
            <Rank username={this.state.name} rank={this.state.enteries} />
            <ImageForm onInput={this.onInput} onSubmit={this.onSubmit} />
            <FaceDetectionBox
              imageLink={this.state.imgURL}
              box={this.state.box}
            />
          </div>
        ) : this.state.route === 'signIn' || this.state.route === 'signOut' ? (
          <SignIn
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
            toggleLoader={this.toggleLoader}
            dbUrl={dbUrl}
          />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            toggleLoader={this.toggleLoader}
            dbUrl={dbUrl}
          />
        )}
      </div>
    )
  }
}

export default App
