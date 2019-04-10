import React, { Component } from 'react';
var firebase = require('firebase');
var uuid= require('uuid');

var config = {
    apiKey: "AIzaSyB4hKXR6gqOL9lvhWO82Fn9yNu35l7Rq7A",
    authDomain: "u-survey-a9e30.firebaseapp.com",
    databaseURL: "https://u-survey-a9e30.firebaseio.com",
    projectId: "u-survey-a9e30",
    storageBucket: "",
    messagingSenderId: "573739053879"
  };
  firebase.initializeApp(config);

class Usurvey extends Component {
  nameSubmit(event) {
    let studentName = this.refs.name.value;
    this.setState({studentName: studentName}, function () {
      console.log(this.state);
    })
  }

  answerSelected (event) {
    let answers = this.state.answers;
    if (event.target.name === 'answer1') {
      answers.answer1 = event.target.value;
    }else if (event.target.name === 'answer2') {
      answers.answer2 = event.target.value;
    }else if (event.target.name === 'answer3') {
      answers.answer3 = event.target.value;
    }
    this.setState({answers: answers}, function () {
      console.log(this.state);
    })
  }

  questionSubmit () {
    debugger;
    firebase.database().ref('uSurvey/'+this.state.uid).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    });
    this.setState({isSubmitted: true});
  }


  constructor(props){
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: '',
      answers: {
        answer1: '',
        answer2: '',
        answer3: ''
      },
      isSubmitted: false
    };
    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmit = this.questionSubmit.bind(this);
  }

  render() {
    let studentName;
    let questions;

    if(this.state.studentName === '' && this.state.isSubmitted === false) {
      studentName = <div>
        <h1> Hey Student, plase let us know your name: </h1>
        <form onSubmit={this.nameSubmit}>
          <input className="namy" type="text" placeholder="Enter your name" ref="name" />
        </form>
      </div>;
      questions = ''
    }else if (this.state.studentName !== '' && this.state.isSubmitted === false) {
      studentName = <h1>Wlcome to U-Survey, {this.state.studentName}</h1>;
      questions = <div>
        <h2>Here are some questions: </h2>
        <form onSubmit={this.questionSubmit}>
          <div className="card">
            <label>What kind of courses you like the most:</label> <br/>
            <input type="radio" name="answer1" value="Tehnology" onChange={this.answerSelected}/>Tehnology
            <input type="radio" name="answer1" value="Design" onChange={this.answerSelected}/>Design
            <input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected}/>Marketing
          </div>
          <div className="card">
            <label>you are a:</label> <br/>
            <input type="radio" name="answer2" value="Student" onChange={this.answerSelected}/>Student
            <input type="radio" name="answer2" value="in-job" onChange={this.answerSelected}/>in-job
            <input type="radio" name="answer2" value="looking-job" onChange={this.answerSelected}/>looking-job
          </div>
          <div className="card">
            <label>Is online learning helpful:</label> <br/>
            <input type="radio" name="answer3" value="yes" onChange={this.answerSelected}/>yes
            <input type="radio" name="answer3" value="no" onChange={this.answerSelected}/>no
            <input type="radio" name="answer3" value="maybe" onChange={this.answerSelected}/>maybe
          </div>
          <input className="feedback-button" type="submit" value="submit" />
        </form>
      </div>
    } else if (this.state.isSubmitted === true) {
      studentName = <h1>Thanks, {this.state.studentName}</h1>
    }

    return (
      <div>
        {studentName}
        -------------------------------------
        {questions}
      </div>
    );
  }

}

export default Usurvey;
