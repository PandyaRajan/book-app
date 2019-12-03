import React from 'react';
import Services from '../Services/services.js';
const serviceObj = new Services();
var Contact;
export default class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeContact: false,
            users:[],
            searchUser:[]
        };
        this.getUserList = this.getUserList.bind(this);
        this.searchContact = this.searchContact.bind(this);
    }

    searchContact(event){
        var searchedUser = this.state.users.filter(obj=>{
            return Object.keys(obj).some(function(key) {
                if(JSON.stringify(obj["name"]).toLowerCase().indexOf(event.target.value.toLowerCase())!==-1){
                    return obj
                }
              })
    })
    this.setState({searchUser:searchedUser});
    console.log(this.state.searchUser)
    }

    getUserList() {
        serviceObj.getUsers().then(data => {
            this.setState({
                users: data,
                searchUser:data
            });
        }).catch(error => {
            console.log(error);
        })
    }
    componentDidMount() {
        this.getUserList();
    }
    render() {
        return (
            <div className="contact-div">
                <input className="search-field" onChange={this.searchContact} placeholder="Search"></input>
                <ul className="no-bull">
                    {
                        ((this.state.searchUser.length>0 &&
                            (this.state.searchUser).map(user => 
                            (
                                (user.userId !== localStorage.getItem("userId")) ?
                                    (<li className={"contacts-list" +" "+ (this.state.activeContact?"active":"")}><a onClick={this.props.GuestUser.bind(this,user.userId)}>
                                        <img src={user.profileImageURL} className="contacts-img" alt="profileImage"/>
                                        <span>{user.name}</span>
                                        </a></li>
                                    )
                                    :(null)
                            )
                            )
                            )
                        )   
                    }
                </ul>
                {(this.state.searchUser.length<=0)&&<h6>No contacts</h6>}
            </div>
        )
    }
}