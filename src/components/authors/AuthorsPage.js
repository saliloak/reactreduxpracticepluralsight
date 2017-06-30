import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthorList from './AuthorList';
import { browserHistory } from 'react-router';
import * as authorActions from '../../actions/authorActions';

class AuthorsPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
    }

    redirectToAddAuthorPage() {
        browserHistory.push('/author');
    }
    render() {
        return (
            <div>
                <h1>Authors</h1>
                <input type="submit" value="Add Author" className="btn btn-primary" onClick={this.redirectToAddAuthorPage} />
                <AuthorList authors={this.props.authors} />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        authors: state.authors
    };
}

export default connect(mapStateToProps)(AuthorsPage);