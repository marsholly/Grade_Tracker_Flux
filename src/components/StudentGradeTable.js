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
      editScore: 0,
      editId: null
    }

    this.gradeScore = this.gradeScore.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.editGrade = this.editGrade.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  cancelEdit() {
    this.setState({editId: null});
    this.closeModal();
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
    this.openModal();
    this.setState({
      editName: student.name,
      editTotal: student.total,
      editScore: student.score,
      editId: student.id
    })
  }

  saveEdit(id) {
    let { editName, editTotal, editScore } = this.state;
    let updateGrade = {
      name: editName,
      total: editTotal,
      score: editScore,
      id
    }
    GradeActions.updateStudentGrade(updateGrade);
    this.closeModal();
    this.setState({ editId: null });
  }

  render() {
    let { grades } = this.props;
    let totalScore = 0, totalPossible = 0, totalGrade;
    let a = 0, b = 0, c = 0, d = 0, f = 0;
    let rows = grades.map(student => {
      let {id, name, score, total} = student;
      totalScore += Number(student.score);
      totalPossible += Number(student.total);
      let grade = this.gradeScore(student);
      switch (grade) {
        case 'A': a++; break;
        case 'B': b++; break;
        case 'C': c++; break;
        case 'D': d++; break;
        default: f++;
      }
      totalGrade = `A: ${a}, B: ${b}, C: ${c}, D: ${d}, F: ${f}.`;  
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
      <div>
        <div className="alert alert-warning" role="alert">
          <h3>Total score : {totalScore} ; Total possible : {totalPossible}</h3>
          <h3>Total overall grade: {totalGrade} </h3>
        </div>
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
          <Modal show={this.state.showModal} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input type="test" className="form-control" placeholder="Name" value={this.state.editName} onChange={e => { this.setState({editName: e.target.value}) }}/>
              <div className="form-group">
                <label>Total: </label>
                <input type="number" className="form-control" placeholder="Total" value={this.state.editTotal} onChange={e => { this.setState({editTotal: e.target.value}) }}/>
              </div>
              <div className="form-group">
                <label>Score: </label>
                <input type="number" className="form-control" placeholder="score" value={this.state.editScore} onChange={e => { this.setState({editScore: e.target.value}) }}/>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-primary" onClick={() => this.saveEdit(this.state.editId)}>Save</Button>
              <Button onClick={this.cancelEdit}>Close</Button>
            </Modal.Footer>
          </Modal>
        </table>
      </div>
    )
  }
};
