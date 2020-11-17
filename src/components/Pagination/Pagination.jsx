import React from 'react';
import { connect } from 'react-redux'
import { left, right, nextPage } from '../../redux/actions/data';
import './Pagination.scss'

const Pagination = props => (
    <ul className={props.isPagination ? "pagination" : "pagination pagination--min"}>
        <li
            className="pagination__item"
            style={{ minWidth: '150px' }}
        >
            <span>{props.startSize} - {props.endSize} </span> из <span> {props.size}</span>
        </li>

        <li
            className="pagination__item waves-effect"
            onClick={props.left}
        >
            <a href="#!">&lt;</a>
        </li>
        
        {props.paginations.map((item) => {
            return (
                <li
                    className="pagination__item waves-effect"
                    onClick={props.nextPage.bind(this, item)}
                    key={item}
                >
                    <a href="#!">{item}</a>
                </li>
            )
        })}

        <li
            className="pagination__item waves-effect"
            onClick={props.right}
        >
            <a href="#!">&gt;</a>
        </li>
    </ul>
)

function mapStateToProps(state) {
    return {
        data: state.variables.data,
        size: state.variables.size,
        startSize: state.variables.startSize,
        endSize: state.variables.endSize,
        paginations: state.variables.paginations,
        newPage: state.variables.newPage,
        isPagination: state.variables.isPagination
    }
}

function mapDispatchToProps(dispatch) {
    return {
        left: () => dispatch(left()),
        right: () => dispatch(right()),
        nextPage: number => dispatch(nextPage(number)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)