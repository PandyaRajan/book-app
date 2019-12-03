import React from 'react';
import Services from '../Services/services.js';
import PopUp from './popUp.js';
import AddBookPopUp from './AddBookPopUp.js'
import BookDetailsPopUp from './BookDetailsPopUp.js'
const serviceObj = new Services();


export default class BookShelf extends React.Component {

    constructor() {
        super();
        this.state = {
            shelfState: "user",
            books: [],
            showPopUp: false,
            selectedBook: {},
            addBookPopup: false,
            searchBook: [],
            BookDetailsPopup:false
        }
        this.updateShelf = this.updateShelf.bind(this);
        this.toglePopUp = this.toglePopUp.bind(this);
        this.togleAddCataloguePopUp = this.togleAddCataloguePopUp.bind(this);
        this.searchBook = this.searchBook.bind(this);
        this.togleBookDetailsPopUp=this.togleBookDetailsPopUp.bind(this);
    }

    searchBook(event) {
        var searchedBook = this.state.books.filter(obj => {
            return Object.keys(obj).some(function (key) {
                if (JSON.stringify(obj["name"]).toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1) {
                    return obj
                }
            })
        });
        console.log(searchedBook);
        this.setState({ searchBook: searchedBook });
    }

    togleBookDetailsPopUp(book) {
        this.setState({
            BookDetailsPopup: !this.state.BookDetailsPopup,
            selectedBook: book
        })
        this.updateShelf(this.state.shelfState);
    }

    toglePopUp(book) {
        this.setState({
            showPopUp: !this.state.showPopUp,
            selectedBook: book
        })
        if (this.state.showPopUp) {
            this.setState({
                user_update: ''
            })
        }
    }

    togleAddCataloguePopUp() {
        this.setState({
            addBookPopup: !this.state.addBookPopup
        })
    }

    updateShelf(shelfState) {
        serviceObj.getBooks(shelfState).then(data => {
            this.setState({
                books: data,
                searchBook: data,
                shelfState: shelfState
            });
        }).catch(error => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.updateShelf(this.state.shelfState);
    }

    render() {
        const _this = this;

        return (
            <div className="book-shelf-container">
                <div className="shelf-menu">
                    <button className="shelf-btn cta-button" onClick={e => this.updateShelf("user")}>My Books</button>
                    <button className="shelf-btn cta-button" onClick={e => this.updateShelf("catalogue")}>Catalogue</button>
                </div>
                <div className="bookshelf-search">
                    {this.state.shelfState === "user" && (<div><div className="shelf-title"><span>My Shelf</span></div><span>Goto Catalogue to add books to your Shelf</span></div>)}
                    {this.state.shelfState === "catalogue" && (<div className="catalogue-search"><div className="shelf-title"><span>Global Catalogue</span></div><input className="search-field" type="text" onChange={this.searchBook} placeholder="Search Books"></input></div>)}
                </div>
                <div className="book-shelf">
                    <ul className="no-bull ">
                        {this.state.searchBook.length > 0 ?
                            (
                                this.state.searchBook.map(book =>
                                    (
                                        <li className={this.state.shelfState === "user"?"shelf-li myshelf-li":"shelf-li"} onClick={_this.state.shelfState === "user"?this.togleBookDetailsPopUp.bind(this, book):null}>
                                            <img src={book.image} alt="bookimage"></img> <br />
                                            <span>Name : {book.name}</span> <br />
                                            <span>Author : {book.author}</span> <br />
                                            {_this.state.shelfState === "catalogue" && <button className="cta-button" onClick={_this.toglePopUp.bind(this, book)}>Add to My Books</button>}
                                        </li>
                                    )
                                )
                            ):
                                (<div className="no-data-div">
                        <span className="nocontent-text">No books found</span><br />
                        <button className="shelf-btn cta-button" onClick={e => this.updateShelf("catalogue")}>Add Books to My shelf</button>
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
                        {
                this.state.BookDetailsPopup ?
                <BookDetailsPopUp Book={this.state.selectedBook} closePopUp={this.togleBookDetailsPopUp} />
                : null
            }
            </div >
        )
    }
}