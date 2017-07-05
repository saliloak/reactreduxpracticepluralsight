import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthorList from './AuthorList';
import { browserHistory } from 'react-router';
import * as authorActions from '../../actions/authorActions';
import toastr from 'toastr';

class AuthorsPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
        this.deletedAuthor = this.deletedAuthor.bind(this);
    }

    redirectToAddAuthorPage() {
        browserHistory.push('/author');
    }

    deletedAuthor(event) {
        this.props.actions.deleteAuthorMain(event);
        toastr.success('Author Deleted');
    }


    render() {
        return (
            <div>
                <h1>Authors</h1>
                <input type="submit" value="Add Author" className="btn btn-primary" onClick={this.redirectToAddAuthorPage} deleteAuthor={this.deletedAuthor} />
                <AuthorList authors={this.props.authors} onDelete={this.deletedAuthor} />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        authors: state.authors
    };
}

function mapDispatchToProps(dispatch){
    return{
        actions: bindActionCreators(authorActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AuthorsPage);