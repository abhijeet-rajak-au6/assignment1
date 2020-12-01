import React, { useState, useEffect } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { deleteUser } from "../../redux/actions/userAction";
import { connect } from "react-redux";
import { mapUserAndProfileToProps } from "../../redux/mapStateToProps";
import { withRouter } from "react-router-dom";

function UserList({ name, email, phone, id, deleteUser, history }) {
  const [showAlert, setAlert] = useState(false);
  const handleAlert = (e) => {
    setAlert(!showAlert);
  };

  const deleteFile = async (e) => {
    try {
      setAlert(!showAlert);
      const message = await deleteUser(id);
      console.log(message);
      //   if(message.includes("success")){

      //   }
    } catch (err) {
      if (err.includes("Authentication failed")) {
        //   console.log("hello", history);
        history.push("/login");
        return;
      }
    }
  };
  const handleEdit = (e) => {
    //   const { history } = this.props;
    history.push(`/editUser/${id}`);
  };
  const onCancel = (e) => {
    setAlert(!showAlert);
  };
  return (
    <>
      {showAlert && (
        <SweetAlert
          warning
          showCancel
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
          onConfirm={deleteFile}
          onCancel={onCancel}
          focusCancelBtn
        >
          Once deleted data cannot be recovere
        </SweetAlert>
      )}

      <div style={{ width: "14rem" }} className="card mr-5 mb-5 ">
        <div className="card-body">
          <label htmlFor="Name">
            <strong>Name:</strong>
          </label>
          <p>{name}</p>
          <label htmlFor="Email">
            <strong>Email</strong>{" "}
          </label>
          <p>{email}</p>
          <label htmlFor="Phone">
            <strong>Phone:</strong>
          </label>
          <p>{phone}</p>
          <div className="d-flex flex-row justify-content-between mt-auto">
            <button onClick={handleEdit} className="btn btn-primary">
              Edit
            </button>
            <button onClick={handleAlert} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default connect(mapUserAndProfileToProps, { deleteUser })(
  withRouter(UserList)
);
