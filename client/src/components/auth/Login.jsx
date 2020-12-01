import React, { Component } from "react";
import Alert from "../error/Alert";
import { connect } from "react-redux";
import FormInput from "../FormInput/FormInput";
import { login } from "../../redux/actions/userAction";
import { setAlert, removeAlert } from '../../redux/actions/alertAction';
import { mapAlertToProps } from '../../redux/mapStateToProps';
import { Link } from 'react-router-dom';
class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target;
    const { login, history, setAlert, removeAlert } = this.props;
    try {
      const message = await login({
        email: email.value,
        password: password.value,
      });

      if (message.includes("success")) {
        history.push("/homePage");
      }
    } catch (err) {
      console.log(err);
      setAlert(err,"error");
      setTimeout(()=>{
        removeAlert();
      },3000); 
    }
  };
  render() {
    const { email, password, errors } = this.state;
    const { alert } = this.props;
    // console.log(alert);
    return (
      <div className="login d-flex flex-row justify-content-center my-5">
        <div className="card w-50 pt-5 px-4 pb-3">
          <div className="card-body">
            <div className="card p-3">
              {alert.message ? <Alert {...alert} /> : null}
              <h1 className="text-primary text-center mb-5">
                {" "}
                <i className="fas fa-lock"></i> Login
              </h1>

              <form onSubmit={this.handleSubmit}>
                <FormInput
                  labelText="Email address"
                  CustomOnChange={this.handleChange}
                  type="email"
                  name="email"
                  customClass="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter email ...."
                  value={email}
                />

                <FormInput
                  labelText="Password"
                  CustomOnChange={this.handleChange}
                  type="password"
                  name="password"
                  customClass="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter password ...."
                  value={password}
                />
                <FormInput
                  type="submit"
                  customClass="btn btn-block btn-primary d-block mx-auto"
                >
                  Login
                </FormInput>
              <span>If not registered go to <Link to="/register">Register</Link></span>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapAlertToProps, { login, setAlert, removeAlert })(Login);
