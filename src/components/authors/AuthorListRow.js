import React, { Component } from 'react';
import { Link } from 'react-router';

class AuthorListRow extends Component {
    DeleteAuthor(id) {
        this.props.deleteAuthor(id);
    }
    render() {
        return (
            <tr>
                <td><a href="#" onClick={this.DeleteAuthor.bind(this, this.props.author.id)}>Delete</a></td>
                <td><Link to={'/author/' + this.props.author.id}>{this.props.author.id}</Link></td>
                <td>{this.props.author.firstName}</td>
                <td>{this.props.author.lastName}</td>
            </tr>
        );
    }
}

export default AuthorListRow;