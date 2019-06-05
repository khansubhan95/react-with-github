import React from 'react';

const Info = (props) => {  
  return (
    <div>
      <h1><a href={props.data.html_url}>{props.data.login}</a></h1>
      <p>{props.data.name}</p>    
      <div>
        <img src={props.data.avatar_url} width="60" height="60" />  
      </div>
      <p><a href={props.data.blog}>{props.data.blog}</a></p>
      <p><a href={props.data.gists_url}>Gists</a></p>
      <p>Public repos: {props.data.public_repos}</p>
      <p>Followers: {props.data.followers}</p>
    </div>
  )
}

class App extends React.Component {

  constructor(props) {
    super(props)

    this.getUserName = this.getUserName.bind(this)
    this.getData = this.getData.bind(this)
    this.userName = React.createRef()

    this.state = {
      username: null,
      userData: {}
    }
  }

  getData(userName) {
    fetch('https://api.github.com/users/' + userName)
    .then(response => response.json())
    .then(data => {
      this.setState({userData: data})
    })
    .catch(err => {
      console.log(err);
    })
  }

  getUserName(event) {
    event.preventDefault()
    let un = event.target.elements.username.value
    this.setState({username: un})

    this.getData(this.userName.current.value)
        
    event.target.elements.username.value = ''
  }

  render() {
    return (
      <div>
        <form onSubmit={this.getUserName}>
          <label>Username</label>
          <input type="text" name="username"ref={this.userName} />
          <button type="submit">Submit</button>
        </form>
        <Info data={this.state.userData} />
      </div>
      )
  }
}

export default App;
