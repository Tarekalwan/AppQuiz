import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questions : Question[] = [
    new Question("le ciel est bleu.", true),
    new Question("le ciel est bleu.", false),
    new Question("", false),
    new Question("", true),
    new Question("", false),
    new Question("", true),
    new Question("", false),
    new Question("", false),
    new Question("", false),
    new Question("", true)
  ];

  constructor() { }

  getQuestions(): Question[] {
    return this.questions
  }
}
