import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import { browserHistory } from 'react-router';

class CoursesPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    }

    redirectToAddCoursePage() {
        browserHistory.push('/course');
    }

    render() {
        return (
            <div>
                <h1>Courses</h1>
                <input type="submit" value="Add Course" className="btn btn-primary" onClick={this.redirectToAddCoursePage} />
                <CourseList courses={this.props.courses} />
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        // state.courses is the name of the property named in the rootreducer
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
        //Alternate way to dispatch props else use the bindActionCreators function from redux library
        //createCourse: course => dispatch(courseActions.createCourse(course))
    };
}

//Functional Programming apporach, take a result of one function and send it over to another function
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

//Alternate Way
//const connectedStateAndProps = connect(mapStateToProps,mapDispatchToProps);
//export default connectedStateAndProps(CoursesPage);