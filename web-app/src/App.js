import React, { Component } from "react";
import "./App.css";
import PasswordChecker from "./PasswordChecker";

class App extends Component {
  constructor() {
    super();
    this.state = {
      password: "Plain Text Password",
      lastEffor: undefined,
      loading: false,
      allRows: []
    };
  }
  render() {
    return [
      <div className="heading" />,

      <div className="App">
        <input
          className="password"
          value={this.state.password}
          onChange={this.updatePassword.bind(this)}
          type="text"
        />
        <button onClick={this.checkPassword.bind(this)}>Check</button>
        <Loader show={this.state.loading} />
        <p>{this.state.count}</p>
        <p>{this.state.lastError}</p>
        <p>{this.state.passwordHash}</p>
        <p>{this.state.pwndPasswordUrl}</p>
        <table className="text--small text--left">
          <tbody>
            {this.state.allRows.map(row => {
              return (
                <tr key={row.suffix}>
                  <td>{this.state.prefix}</td>
                  <td>{row.suffix}</td>
                  <td>{row.count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    ];
  }
  updatePassword(e) {
    this.setState({ password: e.target.value });
  }
  async checkPassword() {
    this.setState({ loading: true });
    const response = await PasswordChecker(this.state.password);
    this.setState({
      loading: false,
      lastError: response.err,
      passwordHash: response.hash,
      pwndPasswordUrl: response.url,
      allRows: response.allRows || [],
      count: response.count,
      prefix: response.prefix
    });
  }
}

const Loader = ({ show }) => {
  return show ? (
    <img className="loader" src="/loader.gif" alt="loading" />
  ) : null;
};
export default App;
