import React from 'react';
import { connect } from 'react-redux'
import { sortIncrease, sortDecrease } from '../../redux/actions/data';

const TableThead = props => (
    <th className="th">
        {props.head}

        <p title="Сортировка по возрастанию" style={{ display: 'inline' }}>
            <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-caret-up-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                onClick={ props.sortIncrease.bind(this, props.head) }
            >
                <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
            </svg>
        </p>

        <p title="Сортировка по убыванию" style={{ display: 'inline' }}>
            <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-caret-down-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                onClick= { props.sortDecrease.bind(this, props.head) }
            >
                <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
        </p>
    </th>
)

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sortIncrease: id => dispatch(sortIncrease(id)),
        sortDecrease: id => dispatch(sortDecrease(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableThead)