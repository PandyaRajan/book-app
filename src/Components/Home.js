import React from 'react';
import '../App.css';
import Header from './Header';
import BookShelf from './BookShelf.js';
import Contacts from './Contacts.js';
import GuestUser from './GuestUser.js';
import Services from '../Services/services.js';
const serviceObj = new Services();
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImage: localStorage.getItem("profileImage"),
            userName: localStorage.getItem("userName"),
            email: localStorage.getItem("email"),
            guestUserProfile: false,
            userId: "",
            guestUserData:{}
        }
    }

    getGuestUserProfile(userId) {
serviceObj.getUserDetails(userId).then(data=>{
    this.setState({
        guestUserProfile: true,
        userId: userId,
        guestUserData:data
    });
}).catch(error=>{
    console.log(error);
})
    }

    render() {
        return (
            <div>
                <Header />
                <div className="Home-div">
                    <div>
                        <div className="profileImage">
                            <img src={this.state.profileImage} height="100px" alt="profileImage"></img></div>
                        <div className="ProfileName"><span className="Username">{this.state.userName}</span><br /><h6>email: {this.state.email}</h6></div>
                    </div>
                </div>
                <div className="content-area">
                    {!this.state.guestUserProfile ? <BookShelf /> : <GuestUser GuestUserId={this.state.userId} GuestUserData={this.state.guestUserData[0]}/>}
                </div>
                <div className="contacts-area">
                    <h3>contacts</h3>
                    <Contacts GuestUser={this.getGuestUserProfile.bind(this)} />
                </div>
            </div>
        )
    }
}