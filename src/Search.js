import React from 'react'

class Search extends React.Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSearch}>
                    <label>Search:</label>
                    <input type='text'
                    name='q' 
                    className='search-bar' 
                    placeholder='Crit Racing' 
                    required />
                    <button type="submit">search</button>
                    <div className='filter-bar'>
                        <label>Print Type</label>
                        <select name="printType">
                            <option value='all'>All</option>
                            <option value='books'>Books</option>
                            <option value='magazines'>magazines</option>
                        </select>
                        <label>Book Type</label>
                        <select name='filter'>
                            <option value='ebooks'>ebooks</option>
                            <option value='free-ebooks'>Free-ebooks</option>
                            <option value='full'>Full</option>
                            <option value='paid-ebooks'>Paid</option>
                            <option value='partial'>previews</option>
                        </select>
                    </div>

                </form>
            </div>
        )
    }
}

export default Search