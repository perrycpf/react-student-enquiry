import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import Student from './components/Student'

const BASEURL = "https://www.hatchways.io/api/assessment/students"

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      students: [],
      filteredStudents: [],
      searchName: '',
      searchTag: ''
    };
  }

  componentWillMount () {
    axios.get(BASEURL)
    .then (({data}) => {
      this.setState({
        students: data.students,
        filteredStudents: data.students})  
    })
    .catch(err => console.log(err));
  }

  handleChange = event => {
    const {name, value } = event.target;
    const searchValue = value.toLowerCase();

    if (!value) {
      this.setState({ 
        [name]: value,
        filteredStudents: this.state.students
      })
      return
    }
    let searchedStudents = []
    if (name === "searchName") {
      searchedStudents = this.state.students.filter(student => 
           student.firstName.toLowerCase().includes(searchValue) ||
           student.lastName.toLowerCase().includes(searchValue)
      )
    }
    if (name === "searchTag") {
      searchedStudents = this.state.students.filter(student => {
        return student.tags !== undefined && student.tags.some(tag => {
          return tag.toLowerCase().match(searchValue)
        })
      })
    }
    this.setState({
      [name]: value,
      filteredStudents: searchedStudents
    })
  };

  handleAddTag = (index, student) => {

    let students = [...this.state.students]
    students[index] = student
    this.setState ({
      filteredStudents: students
    })
    }

  render() {
    const studentComponents = this.state.filteredStudents.map((student, index) =>
        <Student 
          key={student.id} 
          student={student} 
          index={index}
          handleAddTag={this.handleAddTag}/>
    )    
    return (
      <div className = 'container'>
        <div>
          <input 
            className="inputSearch"
            type='text'
            name='searchName'
            placeholder='Search by name'
            value={this.state.searchName}
            onChange={this.handleChange}
          />
          <input
            className="inputSearch"
            type='text'
            name='searchTag'
            placeholder='Search by tags'
            value={this.state.searchTag}
            onChange={this.handleChange}
          />
        </div>
        {studentComponents}
      </div>
    )}    
}

export default App;