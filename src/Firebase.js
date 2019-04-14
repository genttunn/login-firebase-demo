import React, { Component } from "react";
import "./App.css";
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import UserForm from "./UserForm";
class Firebase extends Component {
  state = {
    signedIn: false,
    userNow: null
  };
  uiConfig = {
    signInFlow: "redirect",
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    callbacks: { signInSuccess: () => console.log("success!") }
  };
  componentWillMount = () => {
    firebase.initializeApp({
      apiKey: "AIzaSyDQS6cMSdOm4ueLsCmTAYW5bDfUpPkcCM4",
      authDomain: "case2019k.firebaseapp.com"
    });
  };
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ signedIn: !!user, userNow: user ? user : null });
    });
  };

  reauthenticate = currentPassword => {
    let user = firebase.auth().currentUser;
    let credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(credential);
  };

  updateUser = (profile, mode) => {
    console.log(profile);
    console.log(mode);
    switch (mode) {
      case 1: {
        this.reauthenticate(profile.oldPassword).then(() => {
          let user = firebase.auth().currentUser;
          user
            .updatePassword(profile.newPassword)
            .then(() => {
              alert("password changed!");
            })
            .catch(error => {
              alert(error.message);
            });
        });
        break;
      }
      case 2: {
        this.reauthenticate(profile.oldPassword).then(() => {
          let user = firebase.auth().currentUser;
          user
            .updateEmail(profile.newEmail)
            .then(() => {
              this.setState({ userNow: firebase.auth().currentUser });
            })
            .catch(error => {
              alert(error.message);
            });
        });
        break;
      }
    }
  };

  render() {
    return (
      <div className="App">
        <main className="container mt-3">
          {this.state.signedIn ? (
            <span>
              <h2>Hi {this.state.userNow.email}</h2>
              <UserForm updateUser={this.updateUser} />

              <button
                className="btn btn-primary mt-3"
                onClick={() => firebase.auth().signOut()}
              >
                Sign Out
              </button>
            </span>
          ) : (
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
        </main>
      </div>
    );
  }
}

export default Firebase;
