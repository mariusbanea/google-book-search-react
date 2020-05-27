import React from 'react'

class Book extends React.Component {
    render() {
        //get the arrays of authors
        const authors = this.props.author
        //get the saleability status
        const saleability = this.props.saleability

        //if the book is free ...
        if (saleability === 'FREE') {
            //... there is no price to show
            return (
                <div className="search-results-item">
                    <h2>{this.props.title}</h2>
                    <a href={this.props.previewLink}>
                        <img className='bookImage'
                            src={this.props.thumbnail_URL}
                            alt='bookimage' />
                    </a>

                    <div>
                        <h3>Authors: {authors}</h3>
                        <h4>Price: Free</h4>
                        <h4>Description: </h4>
                        <p>{this.props.description}</p>
                    </div>
                </div>
            )
        }
        //if the book is NOT free ...
        else {
            //... get the price details
            const price = this.props.price
            //if the price is set, display the USD value for it as the "priceTag"; if not display nothing
            const priceTag = (price) ? <h4>Price: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price.amount)}</h4> : false

            return (
                <div className="search-results-item">
                    <h2>{this.props.title}</h2>
                    <h2>{this.props.publisher}</h2>
                    <a href={this.props.previewLink} target='_blank' rel='noopener noreferrer'>
                        <img className='bookImage' src={this.props.thumbnail_URL} alt='bookimage' />
                    </a>
                    <div>
                        <h3>Authors: {authors}</h3>
                        {priceTag}
                        <h4>Description: </h4>
                        <p>{this.props.description}</p>
                    </div>
                </div>
            )
        }
    }

}

export default Book
