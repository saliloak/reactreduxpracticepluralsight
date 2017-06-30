import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm';
import toastr from 'toastr';

class ManageAuthorPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            author: Object.assign({}, this.props.author),
            errors: {},
            saving: false
        };

        this.updateAuthorState = this.updateAuthorState.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.author.id != nextProps.author.id) {
            //Necessary to populate form when existing course is loaded directly
            this.setState({
                author: Object.assign({}, nextProps.author)
            });
        }
    }

    updateAuthorState(event) {
        debugger;
        const field = event.target.name;
        let author = this.state.author;
        author[field] = event.target.value;
        return this.setState({
            author: author
        });
    }

    saveAuthor(event) {

    }

    render() {
        return (
            <div>
                <AuthorForm author={this.state.author} errors={this.state.errors} onChange={this.updateAuthorState}
                    onSave={this.saveAuthor} saving={this.state.saving} />
            </div>
        );
    }
}

function getAuthorbyId(authors, id) {
    const author = authors.filter(author => author.id == id);
    if (author.length) return author[0];
    return null;
}

function mapStateToProps(state, ownProps) {
    const authorId = ownProps.params.id; //from the path `/course/:id`

    let author = { id: '', firstName: '', lastName: '' };
    if (authorId && state.authors.length > 0) {
        author = getAuthorbyId(state.authors, authorId);
    }

    return {
        author: author
    };
}
export default connect(mapStateToProps)(ManageAuthorPage);