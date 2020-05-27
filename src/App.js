import React, { Component } from 'react'
import './App.css'
import Search from './Search'
import Book from './Book'
import Header from './Header'

class App extends Component {

    //setup the constructor witht he default props and states
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            error: null,
            params: {
                printType: '',
                filter: '',
                q: ''
            }
        }
    }

    // convert query parameter from an object to a string
    formatQueryParams(params) {
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&')
    }

    // if an integer is empty, undefinded or null, default it to 0
    checkInteger(inputInteger) {
        let outputValue = inputInteger
        if (inputInteger === "") {
            outputValue = 0
        }
        if (inputInteger === undefined) {
            outputValue = 0
        }
        if (inputInteger == null) {
            outputValue = 0
        }
        return outputValue
    }

    // if a string is undefinded or null, default it to "no details"
    checkString(inputString) {
        let outputText = inputString
        if (inputString === undefined) {
            outputText = "no details"
        }
        if (inputString == null) {
            outputText = "no details"
        }
        return outputText
    }

    // if a URL is undefinded or null, default it to the root url "/"
    checkURL(inputURL) {
        let outputURL = inputURL
        if (inputURL === undefined) {
            outputURL = "/"
        }
        if (inputURL == null) {
            outputURL = "/"
        }
        return outputURL
    }

    // if a URL is undefinded or null, default it to the root url "/"
    checkEmptyImage(inputURL) {
        let outputURL = inputURL
        if (inputURL === undefined) {
            outputURL = "https://legacytaylorsville.com/wp-content/uploads/2015/07/No-Image-Available1.png"
        }
        if (inputURL == null) {
            outputURL = "https://legacytaylorsville.com/wp-content/uploads/2015/07/No-Image-Available1.png"
        }
        return outputURL
    }

    //get the imput from the user
    handleSearch = (e) => {
        e.preventDefault()

        //create an object to store the search filters
        const data = {}

        //get all the from data from the form component
        const formData = new FormData(e.target)

        //for each of the keys in form data populate it with form value
        for (let value of formData) {
            data[value[0]] = value[1]
        }

        //assigning the object from the form data to params in the state
        this.setState({
            params: data
        })

        //check if the state is populated with the search params data
        console.log(this.state.params)

        //get the google books api url
        const searchURL = 'https://www.googleapis.com/books/v1/volumes'

        //format the queryString paramters into an object
        const queryString = this.formatQueryParams(data)

        //sent all the params to the final url
        const url = searchURL + '?' + queryString

        console.log(url)

        //define the API call parameters
        const options = {
            method: 'GET',
            header: {
                "Authorization": "",
                "Content-Type": "application/json"
            }
        }

        //useing the url and paramters above make the api call
        fetch(url, options)

            // if the api returns data ...
            .then(res => {
                if (!res.ok) {
                    throw new Error('Something went wrong, please try again later.')
                }

                // ... convert it to json
                return res.json()
            })

            // use the json api output
            .then(data => {

                //check if there is meaningfull data
                console.log(data);

                // check if there are no results
                if (data.totalItems === 0) {
                    throw new Error('No books found')
                }

                // create and object with each one of the results
                const aBooks = data.items.map(book => {

                    // get the title, authors, description, imageLinks, previewLink from "volumeInfo"
                    const { title, authors, description, imageLinks, previewLink } = book.volumeInfo

                    // get the saleability, retailPrice from "saleInfo"
                    const { saleability, retailPrice } = book.saleInfo


                    let validatedOutput = {
                        title: this.checkString(title),
                        author: this.checkString(authors),
                        description: this.checkString(description),
                        previewLink: this.checkURL(previewLink),
                        thumbnail_URL: this.checkEmptyImage(imageLinks.thumbnail),
                        saleability: this.checkInteger(saleability),
                        price: this.checkInteger(retailPrice),
                    }

                    //check if the data validation works
                    console.log(validatedOutput);

                    // fix the inconsitent results and return them
                    return validatedOutput;
                })

                //check if the validated data is structured in a new array objects
                console.log(aBooks);

                //send all the results to the state
                this.setState({
                    books: aBooks,
                    error: null
                })
            })

            //catch connection errors
            .catch(err => {
                this.setState({
                    error: err.message
                })
            })

    }

    render() {

        //if there is an error message display it
        const errorMessage = this.state.error ? <div>{this.state.error}</div> : false

        //get all the books from the state and map each book for the corresponding component
        const books = this.state.books.map((book, i) => {
            return <Book
                key={i}
                title={book.title}
                author={book.author}
                description={book.description}
                previewLink={book.previewLink}
                thumbnail_URL={book.thumbnail_URL}
                saleability={book.saleability}
                price={book.price}
            />
        })


        return (
            <div className="App">
                <Header />
                <Search handleSearch={this.handleSearch} />
                {errorMessage}
                <div className="search-results-wrapper">
                {books}
                </div>
            </div>
        )
    }
}

export default App
