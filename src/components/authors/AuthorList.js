import React, { Component } from 'react';
import AuthorListRow from './AuthorListRow';
class AuthorList extends Component {
    onDelete(id){
        this.props.onDelete(id);
    }
    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>Author ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.authors.map(author =>
                        <AuthorListRow key={author.id} author={author} deleteAuthor={this.onDelete.bind(this)} />
                    )}
                </tbody>
            </table>
        )
    }
}

export default AuthorList;