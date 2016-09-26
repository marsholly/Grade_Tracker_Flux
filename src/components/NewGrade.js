import React, { Component } from 'react';
import uuid from 'uuid';
import GradeActions from '../actions/GradeActions';


export default class NewGrade extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      total: 0,
      score: 0
    }

    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit(e) {
    e.preventDefault();
    let { name, total, score } = this.state;
    let newGrade = {
      id: uuid(),
      name,
      total,
      score
    }

    GradeActions.createNewGrade(newGrade);

    this.setState({
        name: '',
        total: 0,
        score: 0
    })
  }

  render() {
    return (
        <div className="row text-center">
          <form className="form-inline" onSubmit={this._onSubmit}>
            <input type="test" className="form-control" placeholder="Name" value={this.state.name} onChange={e => { this.setState({name: e.target.value}) }}/>
            <div className="form-group">
              <label>Total: </label>
              <input type="number" className="form-control" placeholder="Total" value={this.state.total} onChange={e => { this.setState({total: e.target.value}) }}/>
            </div>
            <div className="form-group">
              <label>Score: </label>
              <input type="number" className="form-control" placeholder="score" value={this.state.score} onChange={e => { this.setState({score: e.target.value}) }}/>
            </div>
            <button className="btn btn-success btn-md" type='submit'><i className='glyphicon glyphicon-plus'></i>Add</button>
          </form>
        </div>
    )
  }
}
