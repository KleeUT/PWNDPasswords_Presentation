import React, { Component } from "react";
import "./App.css";
import PasswordChecker from "./PasswordChecker";

class App extends Component {
  constructor() {
    super();
    this.state = {
      password: "Password1",
      lastEffor: undefined,
      loading: false,
      allRows: []
    };
  }
  render() {
    return [
      <div className="heading" />,

      <div className="App text--center">
        <input
          className="password"
          value={this.state.password}
          onChange={this.updatePassword.bind(this)}
          type="text"
        />
        <button onClick={this.checkPassword.bind(this)}>Check Password</button>
        <Loader show={this.state.loading} />
        <p>{this.state.lastError}</p>
        <p>Occurences: {this.state.count}</p>
        <p>Hash: {this.state.passwordHash}</p>
        <p>
          URL:{" "}
          <a href={this.state.pwndPasswordUrl}>{this.state.pwndPasswordUrl}</a>
        </p>
        <table className="text--small text--left">
          <thead>
            <tr>
              <th className="prefix">Prefix</th>
              <th>Suffix</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {this.state.allRows.map(row => {
              return (
                <tr key={row.suffix}>
                  <td className="prefix">{this.state.prefix}</td>
                  <td
                    className={
                      row.suffix === this.state.suffix ? "matching-suffix" : ""
                    }
                  >
                    {row.suffix}
                  </td>
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
      prefix: response.prefix,
      suffix: response.suffix
    });
  }
}

const Loader = ({ show }) => {
  return show ? (
    <img className="loader" src="/loader.gif" alt="loading" />
  ) : null;
};
export default App;
