import React from 'react';
import { connect } from 'react-redux'
import './SearchContact.scss'
import { search } from '../../redux/actions/data';

const SearchContact = props => (
    <div className="search">
        <input  type="text" placeholder="Search" className="search__input searchInput" /> 
        
        <button className="search__button" onClick={props.search}>Search</button>
    </div>
)

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        search: () => dispatch(search())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContact)
