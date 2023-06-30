import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Question } from '../models/question.model';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  questions: Question[];
  currentQuestion: Question;
  currentIndex : number;
  scores: number = 0;
  countdown: Subscription;
  timeLeft: number;

  constructor(private questionService:QuestionService) { }

  ngOnInit(): void {
    this.questions = this.questionService.getQuestions();
    this.currentIndex = 0;
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.currentQuestion = this.question[this.currentIndex];
    this.timeLeft = 30; // reset the time left
    this.countdown = timer(0,1000).subscribe(t => {
      this.timeLeft--;
      if(this.timeLeft <= 0) {
        this.countdown.unsubscribe();
        this.nextQuestion();
      }
    });
  }

  nextQuestion() : void {
    this.countdown.unsubscribe();
    this.currentIndex++;
    if(this.currentIndex < this.questions.length) {
      this.loadQuestions();
    }else {

    }
  }

  answerQuestion(answer: boolean): void {
    this.countdown.unsubscribe(); // Stop the current countdown
    if (answer === this.currentQuestion.answer) {
      this.scores++;
    }
    this.nextQuestion();
  }

}
