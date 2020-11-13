import React, { Component } from 'react';
import TableTbody from './Tbody/TableTbody';
import TableThead from './Thead/TableThead';
import DropDown from './ButtonApi/DropDown';
import Pagination from './Pagination/Pagination';
import Contact from './ContactInfo/Contact'
import InputForm from './Form/InputForm'
import SearchContact from './Search/SearchContact'
import './App.scss'
import { connect } from 'react-redux'
import {viewForm, submitContact, cancel} from '../redux/actions/data';

class App extends Component {
    render() {
        return (
            <div className="container scroll">
                <DropDown />
                
                {
                    this.props.list
                        ? 
                        <div className="create">
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
                                    <button className="button" onClick={this.props.submitContact} type="button">Submit</button>
                                    <button className="button" onClick={this.props.cancel} type="button">Cancel</button> 
                                </form>
                                : null
                            }

                            {
                                this.props.list && !this.props.addContact
                                ? <button onClick={this.props.viewForm}>Add</button>
                                : null
                            }
                        </div>
                        : null
                }

                {
                    this.props.list
                    ? <SearchContact />
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
        cancel: () => dispatch(cancel())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)