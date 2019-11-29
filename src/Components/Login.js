import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Redirect } from 'react-router-dom';
import Services from '../Services/services.js'
const serviceObj = new Services();
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: '',
            profileImage: '',
        }
        this.responseGoogle = this.responseGoogle.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    async responseGoogle(response) {
        console.log("**********Google Response**********", response);
        localStorage.setItem("userId", response.profileObj.googleId);
        localStorage.setItem("userName", response.profileObj.name);
        localStorage.setItem("profileImage", response.profileObj.imageUrl);
        localStorage.setItem("email", response.profileObj.email);
        this.setState(
            {
                loggedIn: true,
                userName: response.profileObj.name,
                profileImage: response.profileObj.imageUrl,
                email: response.profileObj.email,
                userId: response.profileObj.googleId
            });
        var userPayload = {
            userId: this.state.userId,
            name: this.state.userName,
            email: this.state.email,
            profileImageURL: this.state.profileImage,
            loginProvider: "Google"
        }

        serviceObj.postUserDetails(userPayload);
    }

    responseFacebook(response) {
        console.log("**********Facebook Response**********", response);
    }


    render() {
        if (this.state.loggedIn) {
            return (<Redirect to={{
                pathname: '/home',
                state: {
                    userName: this.state.userName,
                    profileImage: this.state.profileImage,
                    email: this.state.email
                }
            }} />)
        }
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>Book Store</h1>
                    <div>

                        <GoogleLogin
                            clientId="868935445477-4vkrk43ouselman9nn33512obff10qa9.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        <FacebookLogin
                            appId="406955696850614"
                            autoLoad={false}
                            fields="name,email,picture"
                            onClick="{componentClicked}"
                            callback={this.responseFacebook} />
                    </div>
                </header>
            </div>
        )
    }
}