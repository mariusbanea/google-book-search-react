import React, { Component } from 'react'
import './App.css'
import Search from './Search'
import Book from './Book'
import Header from './Header'

class App extends Component {
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

    formatQueryParams(params) {
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&')
    }

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

    handleSearch = (e) => {
        e.preventDefault()
        const data = {}
        const formData = new FormData(e.target)
        for (let value of formData) data[value[0]] = value[1]

        this.setState({
            params: data
        })

        console.log(data)

        const searchURL = 'https://www.googleapis.com/books/v1/volumes'
        const queryString = this.formatQueryParams(data)
        const url = searchURL + '?' + queryString

        console.log(url)

        const options = {
            method: 'GET',
            header: {
                "Authorization": "",
                "Content-Type": "application/json"
            }
        }

        fetch(url, options)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Something went wrong, please try again later.')
                }
                return res
            })
            .then(res => res.json())
            .then(data => {
                // no results validation
                if (data.totalItems === 0) throw new Error('No books found')

                // need inconsitent results validation
                const aBooks = data.items.map(book => {
                    const { title, authors, description, imageLinks, previewLink } = book.volumeInfo
                    const { saleability, retailPrice } = book.saleInfo
                    let imageLinksOutput = ''
                    if (imageLinks === undefined) {
                        imageLinksOutput = 'https://legacytaylorsville.com/wp-content/uploads/2015/07/No-Image-Available1.png'
                    } else {
                        imageLinksOutput = imageLinks.thumbnail
                    }
                    return {
                        title: this.checkString(title),
                        author: this.checkString(authors),
                        description: this.checkString(description),
                        previewLink: this.checkURL(previewLink),
                        thumbnail_URL: this.checkURL(imageLinksOutput),
                        saleability: this.checkInteger(saleability),
                        price: this.checkInteger(retailPrice),
                    }
                })
                this.setState({
                    books: aBooks,
                    error: null
                })
            })
            .catch(err => {
                this.setState({
                    error: err.message
                })
            })

    }

    render() {
        const errorMessage = this.state.error ? <div>{this.state.error}</div> : false

        const library = this.state.books


        const books = library.map((book, i) => {
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
                {books}
            </div>
        )
    }
}

export default App
