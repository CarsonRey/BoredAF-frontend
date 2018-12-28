import React from "react";

class LoginForm extends React.Component {
  state = {
    loginUsername: "",
    loginPassword: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <div className="formName">log in</div>
        <form className="form" onSubmit={e => this.props.loginFormSubmitHandler(e, this.state)}>
          <label htmlFor="loginUsername">Username</label>
            <br/>
          <input
            className="input"
            type="text"
            name="loginUsername"
            placeholder="username"
            value={this.state.loginUsername}
            onChange={this.handleChange}
          />
            <br/>
          <label htmlFor="loginPassword">Password</label>
            <br/>
          <input
            className="input"
            type="text"
            name="loginPassword"
            placeholder="password"
            value={this.state.loginPassword}
            onChange={this.handleChange}
          />
          <br/>
          <input className="input" type="submit" value="Log In"/>
          {/* <button>Log In</button> */}
        </form>
      </div>
    );
  }
}

export default LoginForm;
