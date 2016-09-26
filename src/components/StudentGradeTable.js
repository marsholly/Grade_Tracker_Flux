import React, { Component } from 'react';
import GradeActions from '../actions/GradeActions';
import { Modal, Button } from 'react-bootstrap';

export default class StudentGradeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      editName:'',
      editTotal: 0,
      editScore: 0
    }

    this.gradeScore = this.gradeScore.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.editGrade = this.editGrade.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  gradeScore(student){
    let grade = (student.score / student.total) * 100;
    let result;
    if(grade >= 90){
      result = 'A';
    }else if(grade >=80){
      result = 'B';
    }else if(grade >=70){
      result = 'C';
    }else if(grade >=60){
      result = 'D';
    }else{
      result = 'F';
    }
    return result;
  }

  deleteGrade(_id) {
    GradeActions.removeStudentGrade(_id);
  }

  editGrade(student) {

    // GradeActions.updateStudentGrade(student);
  }

  render() {
    let { grades } = this.props;
    let rows = grades.map(student => {
      let {id, name, score, total} = student;
      let grade = this.gradeScore(student);
      return (
        <tr key={id}>
          <td>{name}</td>
          <td>{total}</td>
          <td>{score}</td>
          <td>{grade}</td>
          <td>
            <button className="btn btn-primary btn-xs" onClick={() => this.editGrade(student)}>
              <i className="glyphicon glyphicon-pencil"></i>
            </button>
          </td>
          <td>
            <button className="btn btn-danger btn-xs" onClick={() => this.deleteGrade(id)}>
              <i className="glyphicon glyphicon-trash"></i>
            </button>
          </td>
        </tr>
      )
    })
    return(
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Total</th>
            <th>Score</th>
            <th>Grade</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
};
