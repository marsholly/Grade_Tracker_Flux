import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';
import Storage from '../Storage';

let _studentGrade = Storage.read('studentGrade') || [];

class GradeStore extends EventEmitter {
  constructor(props) {
    super(props);

    AppDispatcher.register( action => {
      switch (action.type) {
        case 'CREATE_NEW_GRADE':
          let { studentGrade } = action.payload;
          _studentGrade.push(studentGrade);
          this.emit('CHANGE');
          break;
        case 'REMOVE_STUDENT_GRADE':
          let { _id } = action.payload;
          let newStudentGrade = _studentGrade.filter(student => {
            return student.id !== _id;
          });
          _studentGrade = newStudentGrade;
          this.emit('CHANGE');
          break;


      }
    });

    this.on('CHANGE', () => {
      Storage.write('studentGrade', _studentGrade);
    });
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  getAll() {
    return _studentGrade;
  }
}

export default new GradeStore();
