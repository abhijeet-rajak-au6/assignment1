import React, { Component } from "react";
import { connect } from "react-redux";
import { mapUserAndProfileToProps } from "../redux/mapStateToProps";
import { getSingleUser, updateUser } from "../redux/actions/userAction";
import { setAlert, removeAlert } from "../redux/actions/alertAction";
import Spinner from "../components/common/Spinner";
import Alert from "../components/error/Alert";
import FormInput from "../components/FormInput/FormInput";

class EditUser extends Component {
  state = {
    email: "",
    phone: "",
    name: "",
  };

  async componentDidMount() {
    const { getSingleUser, match, history } = this.props;
    try {
      const user = await getSingleUser(match.params.id);
      this.setState({
        email: user.email,
        phone: user.phone,
        name: user.name,
      });
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
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { match, updateUser, history, setAlert, removeAlert } = this.props;
    try {
      const message = await updateUser(match.params.id, this.state);
      console.log(message);
      if (message.includes("success")) {
        history.push("/homePage");
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
  };
  render() {
    const { singleUser, loading, alert } = this.props;
    const { name, email, phone } = this.state;
    return singleUser !== null && !loading ? (
      <div>
        <div className="login d-flex flex-row justify-content-center">
          <div className="card w-50 pt-5 px-4 pb-3">
            <div className="card-body">
              <div className="card p-3">
                {alert.message ? <Alert {...alert} /> : null}
                <h1 className="text-primary text-center mb-5">
                  {" "}
                  <i className="fas fa-lock"></i> Edit
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
                    type="submit"
                    customClass="btn btn-block btn-primary d-block mx-auto"
                  >
                    Edit
                  </FormInput>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Spinner />
    );
  }
}

export default connect(mapUserAndProfileToProps, {
  getSingleUser,
  updateUser,
  setAlert,
  removeAlert,
})(EditUser);
