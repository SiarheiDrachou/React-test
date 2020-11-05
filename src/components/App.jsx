import React, { Component } from 'react';
import TableTbody from './TableTbody';
import TableThead from './TableThead';
import DropDown from './DropDown';
import Pagination from './Pagination';
import Contact from './Contact'
import 'bootstrap/dist/css/bootstrap.css'
import { connect } from 'react-redux'

class App extends Component {
    render() {
        return (
            <div className="container scroll" style={{ width: '90%' }}>
                <DropDown />

                {
                    this.props.paginations.length
                    ? <Pagination />
                    : null
                }

                {
                    this.props.list
                        ? <table className="table w-75 mx-auto">
                            <TableThead />

                            <tbody className="table-body w-75">
                                {
                                    this.props.list.map((list, index) => {
                                        return (
                                            <TableTbody
                                                key={index}
                                                lists={list}
                                                id={index}
                                            />
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        : null
                }

                {
                    this.props.paginations.length
                    ? <Pagination />
                    : null
                }

                {
                    this.props.userView
                    ? <Contact userData={this.props.user} />
                    : null
                }
            </div>
        )
    }
}

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
        paginationData: state.paginationData.paginationData,
        newPage: state.newPage.newPage,
        user: state.user.user,
        userView: state.userView.userView
    }
}

export default connect(mapStateToProps)(App)