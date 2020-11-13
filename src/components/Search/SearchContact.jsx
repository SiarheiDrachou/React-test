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
        data: state.data.data,
        dataSmall: state.dataSmall.dataSmall,
        dataBig: state.dataBig.dataBig,
        size: state.size.size,
        startSize: state.startSize.startSize,
        endSize: state.endSize.endSize,
        list: state.list.list,
        paginations: state.paginations.paginations,
        newPage: state.newPage.newPage,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        search: () => dispatch(search())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContact)
