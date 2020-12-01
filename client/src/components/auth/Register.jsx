import React, { Component } from "react";
import Alert from "../error/Alert";
import { Link } from 'react-router-dom';
import FormInput from "../FormInput/FormInput";
import { connect } from "react-redux";
import { register, createUser } from "../../redux/actions/userAction";
import { setAlert, removeAlert } from "../../redux/actions/alertAction";
import { mapAlertToProps } from "../../redux/mapStateToProps";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    phone: "",
    errors: {},
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password, phone } = event.target;
    const {
      register,
      history,
      setAlert,
      removeAlert,
      match,
      createUser,
    } = this.props;

    try {
      if (match.path === "/register") {
        const message = await register({
          name: name.value,
          email: email.value,
          password: password.value,
          phone: phone.value,
        });
        console.log(message);
        if (message.includes("success")) {
          this.setState({
            name: "",
            email: "",
            password: "",
            phone: "",
          });
          history.push("/login");
        }
      } else {
        const message = await createUser({
          name: name.value,
          email: email.value,
          password: password.value,
          phone: phone.value,
        });
        console.log(message);
        if (message.includes("success")) {
          this.setState({
            name: "",
            email: "",
            password: "",
            phone: "",
          });
          history.push("/homePage");
        }
      }
    } catch (err) {
      console.log(err);
      if (err.includes("Authentication failed")) {
        //   console.log("hello", history);
        history.push("/login");
        return;
      } else {
        setAlert(err, "error");
        setTimeout(() => {
          removeAlert();
        }, 3000);
      }
    }
    // call the action
  };
  render() {
    const { email, password, name, errors, phone } = this.state;
    const { match, alert } = this.props;
    // console.log(match);
    // const { message, messageType } = this.props.notifyData;
    return (
      <div className="login d-flex flex-row justify-content-center">
        <div className="card w-50 pt-5 px-4 pb-3">
          <div className="card-body">
            <div className="card p-3">
              {alert.message ? <Alert {...alert} /> : null}
              <h1 className="text-primary text-center mb-5">
                {" "}
                {match.path === "/register" ? (
                  <>
                    <i className="fas fa-lock"></i> Register
                  </>
                ) : (
                  <>
                    <i className="fas fa-lock"></i>Create User
                  </>
                )}
              </h1>

              <form onSubmit={this.handleSubmit}>
                <FormInput
                  labelText="User Name"
                  CustomOnChange={this.handleChange}
                  type="text"
                  name="name"
                  customClass="form-control"
                  id="exampleInputName1"
                  placeholder="Enter User Name ...."
                  value={name}
                />
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
                  labelText="Phone Number"
                  CustomOnChange={this.handleChange}
                  type="text"
                  name="phone"
                  customClass="form-control"
                  id="exampleInputPhone1"
                  placeholder="Enter Phone Number...."
                  value={phone}
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

                {match.path === "/register" ? (
                  <>
                    <FormInput
                      type="submit"
                      customClass="btn btn-block btn-primary d-block mx-auto"
                    >
                      Register
                    </FormInput>
                    <span>If register aleady go to <Link to="/login">Login</Link></span>
                  </>
                ) : (
                  <>
                    <FormInput
                      type="submit"
                      customClass="btn w-75 btn-primary d-inline-block mx-auto p-2"
                    >
                      Submit
                    </FormInput>
                    <button
                      onClick={(e) => this.props.history.push("/homePage")}
                      className="btn btn-danger d-inline-block ml-3 p-2"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapAlertToProps, {
  register,
  setAlert,
  removeAlert,
  createUser,
})(Register);
