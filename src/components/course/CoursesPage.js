import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: {
                title: ""
            }
        };

        //This also works and is better to be utilized this way as it prevents performance issues and doesn't cause render function to render a new function again
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);

    }

    onTitleChange(event) {
        const course = this.state.course;
        course.title = event.target.value;
        this.setState({
            course: course
        });
    }

    onClickSave() {
        this.props.actions.createCourse(this.state.course);
        //Alternate approach when not exposing dispatch
        //this.props.dispatch(courseActions.createCourse(this.state.course));
    }

    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    render() {
        return (
            <div>
                <h1>Courses</h1>
                {this.props.courses.map(this.courseRow)}
                <h2>Add Courses</h2>
                {/*This style can also be used to bind but introduces a performance overhead*/}
                {/*<input type="text" onChange={this.onTitleChange.bind(this)} value={this.state.course.title} />*/}
                {/*<input type="submit" value="Save" onClick={this.onClickSave.bind(this)} />*/}
                <input type="text" onChange={this.onTitleChange} value={this.state.course.title} />
                <input type="submit" value="Save" onClick={this.onClickSave} />
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