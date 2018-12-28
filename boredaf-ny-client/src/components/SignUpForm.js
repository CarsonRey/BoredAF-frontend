import React from "react";

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
    console.log(this.props);
    return (
      <div>
        <div className="formName">sign up</div>
        <form className="form" onSubmit={e => this.props.signupFormSubmitHandler(e, this.state)}>
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
            type="text"
            name="signupPassword"
            placeholder="password"
            value={this.state.signupPassword}
            onChange={this.handleChange}
          />
          <br/>
          <input className="input" type="submit" value="Sign Up"/>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
