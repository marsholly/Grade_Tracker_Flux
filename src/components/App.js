import React, { Component } from 'react';
import GradeStore from '../stores/GradeStore';

import NewGrade from './NewGrade';
import StudentGradeTable from './StudentGradeTable';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentGrades: GradeStore.getAll()
    }

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    GradeStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    GradeStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      studentGrades: GradeStore.getAll()
    })
  }



  render() {
    return (
      <div className="container">
        <h1 className="text-center">Grade Tracker</h1>
        <NewGrade />
        <StudentGradeTable grades={this.state.studentGrades}/>
      </div>
    )
  }
};
