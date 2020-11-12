import React, { Component } from 'react';
import TableTbody from './TableTbody';
import TableThead from './TableThead';
import DropDown from './DropDown';
import Pagination from './Pagination';
import Contact from './Contact'
import InputForm from './InputForm'
import 'bootstrap/dist/css/bootstrap.css'
import { connect } from 'react-redux'
import {viewForm, submitContact, cancel, search} from '../redux/actions/data';

class App extends Component {
    render() {
        return (
            <div className="container scroll" style={{ width: '90%' }}>
                <DropDown />
                
                {
                    this.props.list
                        ? 
                        <div>
                            <input type="text" placeholder="Search" className="searchInput" />

                            <button onClick={this.props.search}>Search</button>

                            {
                                this.props.list && !this.props.addContact
                                ? <button onClick={this.props.viewForm}>Add</button>
                                : null
                            }
                        </div>
                        : null
                }
                
                {
                    this.props.addContact
                    ? <form className="form">
                        {
                            this.props.keys.map((input, index) => {
                                return (
                                    <InputForm
                                        key={index}
                                        input={input}
                                        id={index}
                                    />
                                )
                            })
                        }
                        <div className="button" onClick={this.props.submitContact}>Submit</div>
                        <div className="button" onClick={this.props.cancel}>Cancel</div> 
                    </form>
                    : null
                }
                

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
        newPage: state.newPage.newPage,
        user: state.user.user,
        userView: state.userView.userView,
        addContact: state.addContact.addContact,
        keys: state.keys.keys
    }
}

function mapDispatchToProps(dispatch) {
    return {
        viewForm: () => dispatch(viewForm()),
        submitContact: () => dispatch(submitContact()),
        cancel: () => dispatch(cancel()),
        search: () => dispatch(search())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)