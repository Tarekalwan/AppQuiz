import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private scores: number = 0;


  private questions : Question[] = [
    new Question("La lumière voyage plus rapidement que le son.", true),
    new Question("Les humains ne peuvent pas respirer et avaler en même temps.", true),
    new Question("Le soleil tourne autour de la Terre.", false),
    new Question("La banane est un fruit.", true),  // Techniquement, c'est une baie.
    new Question("Il y a 365 jours dans une année bissextile.", false),
    new Question("L'artichaut est une fleur.", true),
    new Question("La tour Eiffel est plus haute que la pyramide de Gizeh.", true),
    new Question("L'océan Atlantique est le plus grand océan de la Terre.", false),
    new Question("L'éléphant est le plus grand animal terrestre vivant actuellement.", true),
    new Question("Le point le plus froid de l'univers est sur Terre.", true)  // Créé dans un laboratoire.
];


  constructor() { }

  getQuestions(): Question[] {
    return this.questions
  }


setScore(scores: number): void {
  this.scores = scores;
}

getScore(): number {
  return this.scores;
}
}
