import React from 'react';
import Services from '../Services/services.js';
const serviceObj = new Services();
var PrevUserId="";
export default class GuestUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books:[]
        };
    }

    updateGuestShelf(userId){
        if(userId!==PrevUserId){
            PrevUserId=userId;
            serviceObj.getGuestBooks(userId).then(data=>{
                this.setState({
                    books:data
                });
            }).catch(error=>{
                console.log(error)
            })  
        } 
    }

    componentDidUpdate(){
        this.updateGuestShelf(this.props.GuestUserId);
        console.log("componentDidUpdate",this.props.GuestUserData)
    }
    componentDidMount(){
        this.updateGuestShelf(this.props.GuestUserId);
        }

    render(){
        return(
            <div className="guest-user">
                <div className="guest-user-profile">
                    <img src={this.props.GuestUserData.profileImageURL} alt="profileImage"></img><br></br>
                    <span>{this.props.GuestUserData.name}, Book Shelf</span>
                </div>
                <div className="book-shelf">
                    <ul className="no-bull">
                            { this.state.books.length >0 ?
                                (
                                    this.state.books.map(book => 
                                        ( 
                                            <li className="shelf-li">
                                                    <img src={book.image} alt="bookimage"></img><br/>
                                                    <span>Name : {book.name}</span><br/>
                                                    <span>Author : {book.author}</span><br/>
                                            </li>
                                        )
                                    )
                                ):
                                (<div className="no-data-div">
                                    <span className="nocontent-text">No Books in shelf</span><br/>
                                </div>)
                            }
                    </ul>
                </div>
            </div>
        )
    }
}