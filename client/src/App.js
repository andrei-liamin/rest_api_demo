import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    users: [],
    formName: "faggot",
    formPassword: "123",
    formProfession: "butcher",
    formId: "4"
  }

  render() {
    const usersHtml = (<ul>
      {
        this.state.users.map((user) => {
          return (<li key={user.id} >
            <p><b>name: </b>{user.name}</p>
            <p><b>profession: </b>{user.profession}</p>
          </li>);
        })
      }
    </ul>);
    return (
      <div className="App">
        <button onClick={this.requestUsers}>get the users from the server</button>
        {usersHtml}
        <div>
          <form onSubmit={this.handleSubmit} style={{display: "flex", flexDirection: "column"}}>
            <label>
              Name:
            <input type="text" value={this.state.formName} />
            </label>
            <label>
              Password:
            <input type="text" value={this.state.formPassword} />
            </label>
            <label>
              Profession:
            <input type="text" value={this.state.formProfession} />
            </label>
            <label>
              Id:
            <input type="text" value={this.state.formId} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      name: this.state.formName,
      password: this.state.formPassword,
      profession: this.state.formProfession,
      id: this.state.formId,
    }
    fetch("http://localhost:8081/addUser", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(newUser), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
  }

  requestUsers = () => {
    fetch("http://localhost:8081/listUsers")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            users: result
          })
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )
  }
}

export default App;
