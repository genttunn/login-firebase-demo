import React, { Component } from "react";
class UserForm extends Component {
  state = {
    userNow: {
      newEmail: "",
      oldPass: "",
      newPass: ""
    }
  };
  inputChanged = event => {
    let newUser = {
      ...this.state.userNow,
      [event.target.id]: event.target.value
    };
    this.setState({
      userNow: newUser
    });
  };

  render() {
    return (
      <div>
        <h3>Change User Info</h3>
        <form action="">
          <div className="form-group">
            {" "}
            <label htmlFor="oldPassword">Current Password</label>
            <input
              type="password"
              className="form-control"
              id="oldPassword"
              placeholder="Required: Type in current password to authenticate"
              required
              onChange={this.inputChanged}
            />
          </div>{" "}
          <div className="form-group">
            {" "}
            <label htmlFor="Password">New Password</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              onChange={this.inputChanged}
            />
          </div>{" "}
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.props.updateUser(this.state.userNow, 1)}
          >
            Update Password
          </button>
        </form>

        <form action="" className="mt-3">
          <div className="form-group">
            {" "}
            <label htmlFor="email">New Email</label>
            <input
              type="email"
              className="form-control"
              id="newEmail"
              onChange={this.inputChanged}
            />
          </div>{" "}
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.updateUser(this.state.userNow, 2);
            }}
          >
            Update Email
          </button>
        </form>
      </div>
    );
  }
}

export default UserForm;
