import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

//Below functions are Action Creators
export function loadCoursesSuccess(courses) {
    return {
        type: types.LOAD_COURSES_SUCCESS,
        courses: courses
    };
}

export function createCourseSuccess(course) {
    return {
        type: types.CREATE_COURSES_SUCCESS,
        course: course
    };
}

export function updateCourseSuccess(course) {
    return {
        type: types.UPDATE_COURSES_SUCCESS,
        course: course
    };
}

//Below functions are Thunk's
export function loadCourses() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return courseApi.getAllCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            throw (error);
        });
    };
}

export function saveCourses(course) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return courseApi.saveCourse(course).then(savedCourse => {
            course.id ? dispatch(updateCourseSuccess(savedCourse)) :
                dispatch(createCourseSuccess(savedCourse));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

