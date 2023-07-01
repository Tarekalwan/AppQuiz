import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Question } from '../models/question.model';
import { timer, Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {


  scores: number = 0;
  questions: Question[] = [];
  currentQuestion: Question | undefined = undefined;
  currentIndex : number = 0;
  countdown: Subscription = new Subscription(); // nécessite l'importation de 'rxjs'
  timeLeft: number = 0;

  constructor(private questionService:QuestionService, private router: Router) { }

  ngOnInit(): void {
    this.questions = this.questionService.getQuestions();
    this.currentIndex = 0;
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.currentQuestion = this.questions[this.currentIndex];
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
      this.questionService.setScore(this.scores);  // Set the score in the service
      this.router.navigate(['/result']);  // Navigate to result when the quiz is finished
    }
  }

  answerQuestion(answer: boolean): void {
    this.countdown.unsubscribe(); // Stop the current countdown
    if (this.currentQuestion && answer === this.currentQuestion.answer) {
      this.scores++;
    }
    this.nextQuestion();
  }

  restart(): void {
    this.currentIndex = 0;
    this.scores = 0;
    this.loadQuestions();
  }

}
