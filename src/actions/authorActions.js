import * as types from './actionTypes';
import authorApi from '../api/mockAuthorApi';
import courseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
export function loadAuthorsSuccess(authors) {
    return {
        type: types.LOAD_AUTHORS_SUCCESS,
        authors: authors
    };
}

export function updateAuthorSuccess(author) {
    return {
        type: types.UPDATE_AUTHORS_SUCCESS,
        author: author
    };
}

export function createAuthorSuccess(author) {
    return {
        type: types.CREATE_AUTHORS_SUCCESS,
        author: author
    };
}

// export function deletedAuthorsSuccess(authorId) {
//     return {
//         type: types.DELETED_AUTHORS_SUCCESS,
//         authorId: authorId
//     }
// }

export function loadAuthors() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return authorApi.getAllAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            throw (error);
        });
    };
}

export function saveAuthors(author) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return authorApi.saveAuthor(author).then(savedAuthor => {
            author.id ? dispatch(updateAuthorSuccess(savedAuthor)) :
                dispatch(createAuthorSuccess(savedAuthor));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

export function deleteAuthorMain(authorId) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return authorApi.deleteAuthor(authorId)
            .then(authorApi.getAllAuthors()
                .then(authors => {
                    dispatch(loadAuthorsSuccess(authors));
                })).catch(error => {
                    throw (error);
                });
    };
}