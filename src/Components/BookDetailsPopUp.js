import React from 'react';
import Services from '../Services/services.js';
const serviceObj = new Services();

export default class BookDetailsPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            successPopup: false
        }
        this.formSubmitHandler=this.formSubmitHandler.bind(this);
    }

    formSubmitHandler(){
        serviceObj.removeShelfBook(this.props.Book.id).then(data=>{
            if(data){
                this.setState({
                    successPopup:true
                })
            }
        }).catch(error=>{
            console.log("ERROR",error)
        })
    }
    render() {
        return (
            <div className="book-details-container popup">
                <div className=''>
                    {
                        this.state.successPopup ? (<div className="success-PopUp popup-inner"><img src="https://www.unibetcommunity.com/t5/image/serverpage/image-id/36758i2F0096A6F9B0B877/image-size/large/is-moderation-mode/true?v=1.0&px=999" height="165px" alt="SuccessImage"></img>
                            <a onClick={this.props.closePopUp}><img src="https://www.freeiconspng.com/uploads/close-button-png-27.png" alt="closeImage"></img></a>
                        </div>)
                            : (<div className="shelf-form"><h4>Book Details</h4><a onClick={this.props.closePopUp}><img src="https://www.freeiconspng.com/uploads/close-button-png-27.png" alt="closeImage"></img></a>
                                <table><tbody>
                                    <tr>
                                        <td><span>Name</span></td>
                                        <td><label>{this.props.Book.name}</label></td>
                                    </tr>
                                    <tr>
                                        <td><span>Author</span></td>
                                        <td><label>{this.props.Book.author}</label></td>
                                    </tr>
                                    <tr>
                                        <td><span>ISBN Number</span></td>
                                        <td><label>{this.props.Book.bookId}</label></td>
                                    </tr>
                                    <tr>
                                        <td><span>Book Image URL</span></td>
                                        {/* <td><label>{this.props.Book.image}</label></td> */}
                                        <td><img className="book-details-img" src={this.props.Book.image}></img></td>
                                    </tr>
                                    </tbody></table>
                                    <input type="button" className="cta-button remove-button" value="Remove Book" onClick={this.formSubmitHandler}></input>
                                </div>)
                    }
                </div>
            </div>
        )
    }
}