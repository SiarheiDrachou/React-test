import React from 'react';
import { connect } from 'react-redux'
import {requestSmall, requestBig} from '../../redux/actions/data';
import './DropDown.scss'

const DropDown = props => (
    <div className="drop">
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
    }
}

function mapDispatchToProps(dispatch) {
    return {
        requestSmall: () => dispatch(requestSmall()),
        requestBig: () => dispatch(requestBig()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDown)