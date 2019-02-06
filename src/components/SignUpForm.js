import React from "react";
import { Link } from "react-router-dom";

class SignUpForm extends React.Component {
  state = {
    signupUsername: "",
    signupPassword: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    // console.log("The Username is", this.state.signupUsername);
    // console.log("The Password is", this.state.signupPassword);
    return (
      <div>
        <div className="formName">sign up</div>
        <form className="form" onSubmit={e => this.props.signupFormSubmitHandler(e, this.state)}>
          <p>
            <Link to="/login">
              or Log In
            </Link>
          </p>
          <label htmlFor="signupUsername">Username</label>
          <br/>
          <input
            className="input"
            type="text"
            name="signupUsername"
            placeholder="username"
            value={this.state.signupUsername}
            onChange={this.handleChange}
          />
          <br/>
          <label htmlFor="signupPassword">Password</label>
          <br/>
          <input
            className="input"
            type="password"
            name="signupPassword"
            placeholder="password"
            value={this.state.signupPassword}
            onChange={this.handleChange}
          />
          <br/>
          <input className="input submit" type="submit" value="Sign Up"/>
        </form>
        {!this.props.user && <Link className="link" to="/">
          <div className="navitem swipe">back to swiping!</div>
        </Link>}
      </div>
    );
  }
}

export default SignUpForm;
