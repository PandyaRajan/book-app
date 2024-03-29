import React from 'react';
import Services from '../Services/services.js';
const serviceObj = new Services();

export default class AddBookPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            successPopup: false
        }
        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.FormSubmitHandler = this.FormSubmitHandler.bind(this);
    }

    myChangeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    FormSubmitHandler() {
        console.log(this.state);
        serviceObj.AddCatalogueBook(this.state).then(data => {
            if (data) {
                this.setState({
                    successPopup: true
                })
            }
        }).catch(error => {
            console.log("ERROR", error)
        });
    }

    render() {
        return (
            <div className="add-catalogue-book-container popup">
                <div className=''>
                    {
                        this.state.successPopup ? (<div className="success-PopUp popup-inner"><img src="https://www.unibetcommunity.com/t5/image/serverpage/image-id/36758i2F0096A6F9B0B877/image-size/large/is-moderation-mode/true?v=1.0&px=999" height="165px" alt="SuccessImage"></img>
                            <a onClick={this.props.closePopUp}><img src="https://www.freeiconspng.com/uploads/close-button-png-27.png" alt="closeImage"></img></a>
                        </div>)
                            : (<div className="catalogue-form"><h4>Add Missing Book</h4><a onClick={this.props.closePopUp}><img src="https://www.freeiconspng.com/uploads/close-button-png-27.png" alt="closeImage"></img></a>
                                <table><tbody>
                                    <tr>
                                        <td><span>Name</span></td>
                                        <td><input type="text" name="bookName" onChange={this.myChangeHandler} placeholder="Book name"></input></td>
                                    </tr>
                                    <tr>
                                        <td><span>Author</span></td>
                                        <td><input type="text" name="author" onChange={this.myChangeHandler} placeholder="Author name"></input></td>
                                    </tr>
                                    <tr>
                                        <td><span>ISBN Number</span></td>
                                        <td><input type="text" name="bookId" onChange={this.myChangeHandler} placeholder="ISBN number"></input></td>
                                    </tr>
                                    <tr>
                                        <td><span>Book Image URL</span></td>
                                        <td><input type="text" name="imageUrl" onChange={this.myChangeHandler} placeholder="url"></input></td>
                                    </tr>
                                    </tbody></table>
                                    <input type="button" className="cta-button save-button" value="Save" onClick={this.FormSubmitHandler}></input>
                                </div>)
                    }
                </div>
            </div>
        )
    }
}