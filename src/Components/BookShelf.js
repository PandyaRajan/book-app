import React from 'react';
import Services from '../Services/services.js';
import PopUp from './popUp.js';
import AddBookPopUp from './AddBookPopUp.js'
const serviceObj = new Services();


export default class BookShelf extends React.Component {

    constructor() {
        super();
        this.state = {
            shelfState:"user",
            books: [],
            showPopUp: false,
            selectedBook:{},
            addBookPopup:false
        }
        this.updateShelf=this.updateShelf.bind(this);
        this.toglePopUp=this.toglePopUp.bind(this);
        this.togleAddCataloguePopUp=this.togleAddCataloguePopUp.bind(this);
    }

    toglePopUp(book) {
        this.setState({
            showPopUp: !this.state.showPopUp,
            selectedBook:book
        })
        if (this.state.showPopUp) {
            this.setState({
                user_update: ''
            })
        }
    }

    togleAddCataloguePopUp(){
        this.setState({
            addBookPopup: !this.state.addBookPopup
        })
    }

    updateShelf(shelfState){
        serviceObj.getBooks(shelfState).then(data=>{
            this.setState({
                books:data,
                shelfState:shelfState
            });
        }).catch(error=>{
            console.log(error)
        })    
    }

    componentDidMount(){
        this.updateShelf(this.state.shelfState);
        }
        
    render() {
        const _this = this;
       
        return (
            <div className="book-shelf-container">
                <div className="shelf-menu">
                    <button className="shelf-btn cta-button" onClick={e=>this.updateShelf("user")}>My Books</button>
                    <button className="shelf-btn cta-button" onClick={e=>this.updateShelf("catalogue")}>Catalogue</button>
                </div>
                <div className="bookshelf-search">
                { this.state.shelfState === "user"&&<h6>Goto Catalogue to add books to your Shelf</h6>}
                { this.state.shelfState === "catalogue"&&(<div><span>Search book by title or ISBN number</span><input className="search-field" type="text"></input></div>)}
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
                                                    {_this.state.shelfState === "catalogue" && <button className="cta-button" onClick={_this.toglePopUp.bind(this, book)}>Add to My Books</button>}
                                            </li>
                                        )
                                    )
                                ):
                                (<div className="no-data-div">
                                    <span className="nocontent-text">No books found</span><br/>
                                    <button className="shelf-btn cta-button" onClick={e=>this.updateShelf("catalogue")}>Add Books to My shelf</button>
                                </div>)
                            }
                            {
                                _this.state.shelfState === "catalogue" && (
                                    <li className="shelf-li add-book-li" onClick={this.togleAddCataloguePopUp}>
                                        <a className="add-catalogue-book">+</a><br></br>
                                        <span className="add-catalogue-span">Add missing book to Catalogue</span>
                                    </li>
                                )
                            }
                    </ul>
                </div>
                {
                    this.state.showPopUp ?
                        <PopUp book={this.state.selectedBook} closePopUp={this.toglePopUp} />
                        : null
                }
                {
                    this.state.addBookPopup ?
                        <AddBookPopUp closePopUp={this.togleAddCataloguePopUp} />
                        : null
                }
            </div>
        )
    }
}