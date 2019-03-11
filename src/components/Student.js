import React, {Component} from 'react';

class Student extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showMarks: false,
            newTag: '',
            tags: []
        }
    }

    handleChange = event => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = event => {
        event.preventDefault()

        let newTag = [this.state.newTag]

        if (newTag !== '') {
            let student = this.props.student
            if (student.tags !== undefined)
                newTag = newTag.concat (student.tags)

            student.tags = newTag

            this.setState ({newTag: ''})
            this.props.handleAddTag(this.props.index, student)
        }
    }

    toggleSwitch = id => {
        this.setState({
            showMarks: !this.state.showMarks
        })
    }

    render() {
        const {student} = this.props
        const {showMarks} = this.state

        const marksDetail = () => {
            const grades = student.grades
            let gradesComponents = []
            for (var i=0; i<grades.length; i++) {
                gradesComponents.push(
                    <p key={i}>Test {i+1}: {grades[i]}%</p>
                )
            }
            return gradesComponents;    
        }

        const calAverage = () => {
            const grades = student.grades
            const average = (grades.reduce((sum, grade) => Number(sum) + Number(grade), 0)) / grades.length
            return average
        }

        return (
            <div key={student.id}>
                <div className='student'>
                <img src={student.pic} alt={student.firstName} />
                    <div className = 'student-info'>
                        <h1>{student.firstName} {student.lastName}</h1>
                        <p>Email: {student.email}</p>
                        <p>Company: {student.company}</p>
                        <p>Skill: {student.skill}</p>
                        <p>Average: {calAverage()} %</p>
                        {showMarks && (
                            <div className = 'additional-info'>
                                {marksDetail()}
                                <div className = 'tags'>
                                    {this.props.student.tags !== undefined && this.props.student.tags.map((tag, i) => {
                                    return <span key={i} className='tag'>{tag}</span>})}

                                </div>
                                <form onSubmit={this.handleSubmit}>
                                    <input
                                        className="add-tag"
                                        type='text'
                                        onChange={this.handleChange}
                                        value={this.state.newTag}
                                        name='newTag'
                                        placeholder="Add a tag"
                                    />
                                </form>
                            </div>   
                        )}
                    </div>
                    <div className='expand'>
                            <button onClick={() => this.toggleSwitch(student.id)}>
                                {showMarks ? '-' : '+' }
                            </button>
                    </div>
                </div>
            </div>
        );
    }    
}

export default Student;