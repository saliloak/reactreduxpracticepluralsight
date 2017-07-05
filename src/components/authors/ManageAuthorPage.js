import React, { Component, PropTypes } from 'react';
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
        this.saveAuthor = this.saveAuthor.bind(this);
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
        const field = event.target.name;
        let author = this.state.author;
        author[field] = event.target.value;
        return this.setState({
            author: author
        });
    }

    saveAuthor(event) {
        event.preventDefault();
        this.setState({
            saving: true
        });
        this.props.actions.saveAuthors(this.state.author)
            .then(() => this.redirect())
            .catch(error => {
                toastr.error(error);
                this.setState({
                    saving: false
                });
            })
    }

    redirect() {
        this.setState({
            saving: false
        });
        toastr.success('Author Saved');
        this.context.router.push('/authors');
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

ManageAuthorPage.contextTypes = {
    router: PropTypes.object
};

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

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authorActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);