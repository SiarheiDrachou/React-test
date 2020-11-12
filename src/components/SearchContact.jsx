import React from 'react';
import { connect } from 'react-redux'
import {} from '../redux/actions/data';

const SearchContact = props => (
    <div>
        <input type="text" /> 
        
        <button onClick={this.props.find}>Search</button>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContact)
