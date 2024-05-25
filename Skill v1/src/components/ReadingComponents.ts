import { Component, BaseComponent, Intents, Handle } from '@jovotech/framework';
import { analyzeText, AnalyzedText } from '../services/ComprehendService';
import { SessionData } from '../types/SessionData';

export interface Passage {
  text: string;
  questions: { question: string; answer: string; type: string }[];
}

const passages: Passage[] = [
  {
    text: 'Once upon a time in a land far away, there lived a young princess who loved to explore the forest near her castle.',
    questions: []
  },
  {
    text: 'In a small village, there was a boy named Jack who climbed a giant beanstalk and found a castle in the clouds.',
    questions: []
  },
  // Add more passages as needed
];

@Component()
export class ReadingComponent extends BaseComponent {

  @Intents('LaunchIntent')
  launch() {
    return this.$send({
      message: 'Bienvenido a Leyendo y Comprendiendo. Leere un texto y luego te hare unas preguntas ¿Estás listo para comenzar?',
      listen: true,
    });
  }

  @Intents(['YesIntent', 'NextIntent'])
  async startReading() {
    const passageIndex = Math.floor(Math.random() * passages.length);
    const selectedPassage = passages[passageIndex];
    (this.$session.$data as SessionData).passage = selectedPassage;
    (this.$session.$data as SessionData).currentQuestionIndex = 0;

    const analysis: AnalyzedText = await analyzeText(selectedPassage.text);
    (this.$session.$data as SessionData).analysis = analysis;

    selectedPassage.questions = this.generateQuestions(analysis);

    return this.$send({
      message: `Aqui esta el texto ${selectedPassage.text}. Dejame saber cuando estes listo para la primera pregunta.`,
      listen: true,
    });
  }

  generateQuestions(analysis: AnalyzedText) {
    const questions: { question: string; answer: string; type: string }[] = [];

    // Example question types:
    // Mention 3 {Type} in the text
    const entityTypes = Array.from(new Set(analysis.entities.map((entity: AWS.Comprehend.Entity) => entity.Type)));
    entityTypes.forEach(type => {
      const relevantEntities = analysis.entities.filter((entity: AWS.Comprehend.Entity) => entity.Type === type).map((entity: AWS.Comprehend.Entity) => entity.Text);
      if (relevantEntities.length >= 3) {
        questions.push({
          question: `Menciona 3 ${type?.toLowerCase()}s en el texto`,
          answer: relevantEntities.join(', '),
          type: 'list'
        });
      }
    });

    // True or False: The word {Entity} is {Type}
    analysis.entities.forEach((entity: AWS.Comprehend.Entity) => {
      questions.push({
        question: `Verdadero o Falso. La palabra  ${entity.Text} es un(a) ${entity.Type?.toLowerCase() ?? ''}`,
        answer: 'true',
        type: 'truefalse'
      });
    });

    // What kind of type is {Type}
    analysis.keyPhrases.forEach((phrase: AWS.Comprehend.KeyPhrase) => {
      questions.push({
        question: `Que tipo de elemento es ${phrase.Text}`,
        answer: 'key phrase',
        type: 'type'
      });
    });

    return questions;
  }

  @Intents('ReadyIntent')
  async askQuestion() {
    const sessionData = this.$session.$data as SessionData;
    const passage = sessionData.passage!;
    const currentQuestionIndex = sessionData.currentQuestionIndex!;
    const question = passage.questions[currentQuestionIndex].question;
    
    return this.$send({
      message: question,
      listen: true,
    });
  }

  @Intents('AnswerIntent')
  async checkAnswer() {
    const userAnswer = this.$request.value as string;
    if (!userAnswer) {
      return this.$send({
        message: 'No te entendi. Por favor puedes repetirlo de nuevo.',
        listen: true,
      });
    }
    const sessionData = this.$session.$data as SessionData;
    const passage = sessionData.passage!;
    const currentQuestionIndex = sessionData.currentQuestionIndex!;
    const currentQuestion = passage.questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer.toLowerCase();

    let isCorrect = false;

    if (currentQuestion.type === 'list') {
      // Check if the answer contains at least 3 correct entities
      const correctEntities = correctAnswer.split(', ');
      const userEntities = userAnswer.split(', ');
      const matches = correctEntities.filter(entity => userEntities.includes(entity));
      isCorrect = matches.length >= 3;
    } else if (currentQuestion.type === 'truefalse') {
      // Check for true/false question
      isCorrect = (userAnswer === 'true' && correctAnswer === 'true') || (userAnswer === 'false' && correctAnswer === 'false');
    } else if (currentQuestion.type === 'type') {
      // Check for type question
      isCorrect = userAnswer.includes(correctAnswer);
    }

    if (isCorrect) {
      const nextQuestionIndex = currentQuestionIndex + 1;

      if (nextQuestionIndex < passage.questions.length) {
        sessionData.currentQuestionIndex = nextQuestionIndex;
        return this.$send({
          message: '¡Estas en lo correcto!. ¿Estas listo para la siguientes pregunta?',
          listen: true,
        });
      } else {
        return this.$send({
          message: '¡Estas en lo correcto!. Has respondido todas las preguntas del texto. ¿Te gustaria esccuhar otro texto?',
          listen: true,
        });
      }
    } else {
      return this.$send({
        message: 'Estas mal, intentalo de nuevo' + currentQuestion.question,
        listen: true,
      });
    }
  }

  @Intents('NoIntent')
  async endSession() {
    return this.$send({
      message: 'Gracias por usar Leyendo y Comprendiendo. ¡Hasta la proxima!',
    });
  }
}
