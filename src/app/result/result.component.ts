import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  scores: number;

  constructor(private router: Router, private questionService: QuestionService) {
    this.scores = this.questionService.getScore();
  }

  ngOnInit(): void {
  }

  restartQuiz(): void {
    this.router.navigate(['/quiz']);
  }
}
