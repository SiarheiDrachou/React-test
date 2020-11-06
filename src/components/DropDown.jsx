import React from 'react';
import { connect } from 'react-redux'
import {requestSmall, requestBig} from '../redux/actions/data';

const DropDown = props => (
    <div>
        <div className="dropdown m-5">
            <button
                className="btn btn-secondary mr-5"
                type="button"
                onClick={props.requestSmall}
            >Small</button>

            <button
                className="btn btn-secondary"
                type="button"
                onClick={props.requestBig}
            >Big</button>
        </div>
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
        requestSmall: () => dispatch(requestSmall()),
        requestBig: () => dispatch(requestBig()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDown)