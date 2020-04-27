import React from 'react'

class Book extends React.Component {
    render() {
        //get the arrays of authors
        const authors = this.props.author
        //get the saleability status
        const saleability = this.props.saleability

        //if the book is free, there is no price to show
        if (saleability === 'FREE') {
            return (
                <div>
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
        //if the book is NOT free, show the price details
        else {
            const price = this.props.price
            const priceTag = (price) ? <h4>Price: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price.amount)}</h4> : false

            return (
                <div>
                    <h2>{this.props.title}</h2>
                    <h2>{this.props.publisher}</h2>
                    <a href={this.props.previewLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    >
                        <img className='bookImage'
                            src={this.props.thumbnail_URL}
                            alt='bookimage' />
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
