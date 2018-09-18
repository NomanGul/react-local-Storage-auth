import React, { Component } from "react";
import "./App.css";

const Home = props => {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={props.logoutHandler}>LogOut</button>
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logedIn: false,
      emailValue: "",
      pwValue: ""
    };
    this.emailValue = React.createRef();
    this.pwValue = React.createRef();
    this.userAlreadyLoggedInOrNot = this.userAlreadyLoggedInOrNot.bind(this);
    this.setLogedInState = this.setLogedInState.bind(this);
    this.signupHandler = this.signupHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.appRenderer = this.appRenderer.bind(this);
    // console.log(this.emailValue, this.pwValue);
  }

  componentDidMount() {
    this.userAlreadyLoggedInOrNot();
  }

  userAlreadyLoggedInOrNot() {
    const getEmailValueFromLS = localStorage.getItem("emailValue");
    const getPasswordValueFromLS = localStorage.getItem("pwValue");
    getEmailValueFromLS && getPasswordValueFromLS
      ? this.setState(this.setLogedInState())
      : this.setState({ logedIn: false });
  }

  setLogedInState() {
    return {
      emailValue: localStorage.getItem("emailValue"),
      pwValue: localStorage.getItem("pwValue"),
      logedIn: true
    };
  }

  loginHandler() {
    const getEmailValueFromLS = localStorage.getItem("emailValue");
    const getPasswordValueFromLS = localStorage.getItem("pwValue");
    const emailValue = this.emailValue.current.value;
    const pwValue = this.pwValue.current.value;
    if (emailValue.length > 0 && pwValue.length > 0) {
      emailValue === getEmailValueFromLS && pwValue === getPasswordValueFromLS
        ? this.setState(this.setLogedInState())
        : alert("Plz Signup first :)");
      return;
    }
    return alert("plz type valid data");
  }

  signupHandler() {
    const emailValue = this.emailValue.current.value;
    const pwValue = this.pwValue.current.value;
    if (emailValue.length > 0 && pwValue.length > 0) {
      localStorage.setItem("emailValue", emailValue);
      localStorage.setItem("pwValue", pwValue);
      this.setState(this.setLogedInState());
      return;
    }
    return alert("plz fill all fields");
  }

  logoutHandler() {
    this.setState({ emailValue: "", pwValue: "", logedIn: false });
    localStorage.clear();
  }

  appRenderer() {
    const { logedIn } = this.state;
    return logedIn ? (
      <Home logoutHandler={this.logoutHandler} />
    ) : (
      <div>
        <input ref={this.emailValue} type="email" name="email" />
        <br />
        <input ref={this.pwValue} type="password" name="password" />
        <br />
        <button type="submit" onClick={this.loginHandler}>
          Login
        </button>
        <button type="submit" onClick={this.signupHandler}>
          Signup
        </button>
      </div>
    );
  }
  render() {
    return <div className="App">{this.appRenderer()}</div>;
  }
}

export default App;
