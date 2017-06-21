import * as types from '../actions/actionTypes';

export default function courseReducer(state = [], action) {
    switch (action.type) {
        case types.CREATE_COURSE:
            //Cannot directly mutate state, need to use object assign and provide new state
            // state.push(action.course);
            // return state;
            return [...state, Object.assign({}, action.course)];
        default:
            return state;
    }
}