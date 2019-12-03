import React from 'react';
import Services from '../Services/services.js';
const serviceObj = new Services();

export default class PopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            successPopup: false
        }
        this.AddBookToList=this.AddBookToList.bind(this);
    }

    AddBookToList(){
        serviceObj.AddUserBooks(this.props.book).then(data=>{
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
            <div className='popup'>
                <div className='popup-inner'>
                    {
                        this.state.successPopup ?
                            <div className="success-PopUp"><img src="https://www.unibetcommunity.com/t5/image/serverpage/image-id/36758i2F0096A6F9B0B877/image-size/large/is-moderation-mode/true?v=1.0&px=999" height="165px" alt="SuccessImage"></img>
                            <a onClick={this.props.closePopUp}><img src="https://www.freeiconspng.com/uploads/close-button-png-27.png" alt="closeImage"></img></a>
                            </div>
                            :<div className="add-book-Popup"><span className="popUp-text">Do you want to add {this.props.book.name} Book to your List</span><br/>
                                <div className="popUp-button"><input className="cta-button" type="button" value='Yes' onClick={this.AddBookToList}></input>
                                <input className="cta-button" type="button" value='No' onClick={this.props.closePopUp}></input></div>
                            </div>
                    }
                </div>
            </div>
        )
    }
}