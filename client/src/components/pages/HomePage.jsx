import React, { Component } from "react";
import UserList from "../pages/UserList";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../../redux/actions/userAction";
import { removeAlert, setAlert } from "../../redux/actions/alertAction";
import { createUser, getCreatedUser } from "../../redux/actions/userAction";
import { mapUserAndProfileToProps } from "../../redux/mapStateToProps";
import Spinner from '../common/Spinner';

class HomePage extends Component {
  async componentDidMount() {
    const { getCreatedUser } = this.props;
    try {
      const message = await getCreatedUser();
    } catch (err) {}
  }
//   async componentDidUpdate(prevProps){
//     console.log('prev Props',prevProps);
//   }
  handelCreateUser = (e) => {
    const { history } = this.props;
    history.push("/createUser");
  };
  handleLogout = async (e) => {
    const { logout, removeAlert, setAlert, history } = this.props;

    try {
      const message = await logout();
      if (message.includes("success")) {
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
      if (err.includes("Authentication failed")) {
        //   console.log("hello", history);
        history.push("/login");
        return;
      }
      //   setAlert(err, "error");
      //   setTimeout(() => {
      //     removeAlert();
      //   }, 3000);
    }
  };
  render() {
    const { createdUser, loading } = this.props;
    console.log('created User', createdUser);
    return (
      <>
        <button
          onClick={this.handleLogout}
          className="btn btn-warning ml-auto d-block mr-3"
        >
          Logout
        </button>
        <div className="d-flex flex-column justify-content-center ">
          <h1 className="text-center">Home Page</h1>
          <div className="d-flex flex-row justify-content-center mt-5">
            <div className="card w-50 p-3 d-inline-block text-center">
              List Of User
            </div>
            <button
              onClick={this.handelCreateUser}
              className="btn btn-primary p-3 ml-5"
            >
              Create user
            </button>
          </div>

          {createdUser!==null && !loading ? (<>
            <div className="user-list d-flex flex-row justify-content-space-between p-5 w-100 flex-wrap">
            { createdUser.map(({ _id,...props} )=> <UserList key={_id} {...props} id={_id} />) }
          </div>
          </>):(<Spinner/>) }
          
        </div>
      </>
    );
  }
}

export default connect(mapUserAndProfileToProps, {
  logout,
  removeAlert,
  setAlert,
  getCreatedUser,
})(withRouter(HomePage));
