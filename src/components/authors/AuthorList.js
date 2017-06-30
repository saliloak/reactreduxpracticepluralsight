import React, { Component } from 'react';
import AuthorListRow from './AuthorListRow';
const AuthorList = ({ authors }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Author ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {authors.map(author =>
                    <AuthorListRow key={author.id} author={author} />
                )}
            </tbody>
        </table>
    )
}

export default AuthorList;