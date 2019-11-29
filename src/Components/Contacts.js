import React from 'react';
import Services from '../Services/services.js';
const serviceObj = new Services();
var Contact;
export default class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeContact: false
        };
        this.getUserList = this.getUserList.bind(this);
    }

    getUserList() {
        serviceObj.getUsers().then(data => {
            this.setState({
                users: data
            });
        }).catch(error => {
            console.log(error);
        })
    }
    componentDidMount() {
        this.getUserList();
    }
    render() {
        if (this.state.users !== undefined) {
            Contact = this.state.users.map(user => 
            (
                (user.userId !== localStorage.getItem("userId")) ?(<li className={"contacts-list" +" "+ (this.state.activeContact?"active":"")}><a onClick={this.props.GuestUser.bind(this,user.userId)}>
                        <img src={user.profileImageURL} className="contacts-img" alt="profileImage"/>
                        <span>{user.name}</span>
                        </a></li>)
                    :(null)
                )
        )
        }
        return (
            <div className="contact-div">
                <ul className="no-bull">{Contact}</ul>
            </div>
        )
    }
}