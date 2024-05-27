import { Component, BaseComponent, Intents, Handle } from '@jovotech/framework';
import { analyzeText, AnalyzedText } from '../services/ComprehendService';
import { SessionData } from '../types/SessionData';

export interface Passage {
  text: string;
  questions: { question: string; answer: string; type: string }[];
}

const passages: Passage[] = [
  {
    text: 'Había una vez una niña llamada Luna que vivía en una pequeña ciudad en la que podías ver el cielo desde cualquier parte. Su habitación estaba llena de mapas estelares y modelos planetarios, pero lo que más amaba era su telescopio, apuntando siempre hacia el cielo, buscando secretos entre las estrellas.\nUna noche, mientras Luna observaba el cielo, una luz cálida y dorada la envolvió suavemente. Ante ella, apareció el Sol, no como una esfera de fuego, sino como un amable guardián brillante.\n—Luna, ha llegado el momento del Desfile de los Planetas, un evento donde cada uno compartirá contigo su esencia y sabiduría. —dijo el Sol con voz resonante.\nCon un toque de su luz, Luna se encontró flotando en el espacio, acompañada por el Sol. Pronto, el primer planeta se acercó con entusiasmo.\nMercurio, pequeño y ágil, giraba alrededor de ellos.\n—Soy el más veloz, pero he aprendido que detenerme y observar puede ser tan maravilloso como correr—dijo Mercurio.\nY le enseñó a Luna la importancia de la paciencia y el disfrute de los pequeños momentos.\nLuego, Venus, envuelto en una luz brillante, le dijo:\n—Muchos me admiran desde lejos, pero es mi aceptación propia lo que realmente me hace brillar.\nLuna entendió que la belleza verdadera viene de aceptarse a uno mismo.\nCuando la Tierra apareció, con sus azules y verdes, Luna sintió un cálido regreso a casa.\n—Cuida de mí, y yo cuidaré de ti. —le recordó, resaltando la importancia de proteger nuestro hogar.\nMarte se acercó con un espíritu aventurero, su superficie roja destacando en la oscuridad.\n—El coraje de explorar lo desconocido es lo que nos hace crecer—dijo Marte.\nLuna se sintió inspirada a enfrentar nuevos desafíos.\nJúpiter impresionó con su magnitud y sus lunas danzantes.\n—Proteger a los más pequeños es mi deber, mostrando la bondad en su máxima expresión —le dijo..\nSaturno, con sus anillos giratorios, enseñó a Luna sobre la importancia de estar unidos en la diversidad, cómo cada parte contribuye a la belleza del conjunto.\nUrano y Neptuno, con sus colores y misterios, le hablaron sobre la aceptación y la curiosidad, impulsando a Luna a buscar siempre más allá de lo evidente.\nFinalmente, Plutón, pequeño y lejano, le dijo:\n—Incluso los más pequeños tenemos un lugar en este vasto universo.\nLuna comprendió el valor de cada ser, sin importar su tamaño.\nMientras regresaban, el Sol le dijo a Luna:\n—Ahora que conoces los secretos de tus vecinos cósmicos, lleva sus lecciones contigo y compártelas con el mundo.\nLuna despertó en su habitación, el amanecer filtrándose por la ventana. Corrió a escribir todo lo que había aprendido, decidida a vivir y compartir las enseñanzas de cada planeta.\nY así, cada noche, cuando Luna miraba las estrellas, sabía que no estaba sola. Tenía amigos a lo largo y ancho del sistema solar, y juntos, compartían la luz de sus lecciones con todo aquel dispuesto a mirar hacia arriba y soñar. ',
    questions: []
  },
  {
    text: 'Era una noche especial en el jardín de Jorge. Bajo un cielo sembrado de estrellas que prometía secretos y aventuras, Jorge y su abuelo Gaspar se preparaban para una noche de campamento en el jardín y observación astronómica.\n—Jorge, ¿estás listo para descubrir el universo? —preguntó el abuelo Gaspar, con una sonrisa tan alegre que parecía que iluminaba la oscuridad.\n—Listo y emocionado, pero... también un poco nervioso —admitió Jorge, mirando hacia el cielo nocturno. A Jorge le daba miedo la oscuridad, y dormir fuera de casa bajo las estrellas le tenía intranquilo.\nEl abuelo Gaspar, con su voz cálida y sabia, le dijo:\n—No hay nada que temer, Jorge. Las estrellas son nuestras amigas y nos cuentan historias desde el infinito. Esta noche, aprenderemos a escucharlas.\nCon la ayuda de una linterna especial, el abuelo Gaspar comenzó a proyectar las formas de las constelaciones en la tela de la tienda de campaña.\n—Mira, esa es Orión. ¿Ves cómo sus estrellas forman el cinturón del cazador? —explicó, señalando hacia el cielo.\n—¡Y esa de allí es Casiopea! —exclamó Jorge, recordando lo que había estado leyendo los días anteriores para identificar otra constelación. —Es como un W en el cielo, ¿verdad, abuelo?\nA medida que miraba el cielo, Jorge comenzó a sentirse más cómodo en la oscuridad, su miedo disminuía con cada nueva estrella que aprendía a nombrar.\nDe repente, todo el pueblo se quedó sin luz. La oscuridad era total. Abuelo y nieto salieron de la tienda, al notar cómo la oscuridad había aumentado.\n—Mira, Jorge, parece que las estrellas ahora brillan más —dijo el abuelo.\n—Es... es hermoso —susurró Jorge, olvidando por completo su miedo.\nEntonces, un destello brillante atravesó el cielo.\n—¿Qué ha sido eso? —preguntó Jorge, con los ojos abiertos como platos.\n—Un cometa, ¡y mira! Está formando una constelación que nunca había visto —dijo el abuelo Gaspar, tan sorprendido como ellos.\n—Debemos darle un nombre —dijo Jorge, entusiasmado.\n—¿Qué se te ocurre? —preguntó el abuelo\n—Uhm… ¡Cometa Carpa Cósmica! —propuso Jorge.\n—Es perfecto —dijo el abuelo,\nAl día siguiente, en el observatorio astronómico, compartieron su descubrimiento con los expertos, quienes confirmaron la importancia de su hallazgo.\nGracias, Jorge y Gaspar. Este es un descubrimiento maravilloso. \"Cometa Carpa Cósmica\" será un excelente añadido a nuestros registros astronómicos —dijo uno de los astrónomos, impresionado.\nDe vuelta en casa, mientras miraban las estrellas una vez más, Jorge reflexionó en voz alta:\n—Nunca imaginé que la oscuridad pudiera ser tan hermosa. Me enseñó que siempre hay luz y maravillas esperando ser descubiertas.\n—Y lo mejor de todo es que lo descubrimos juntos —agregó el abuelo —. Has aprendido la lección más valiosa de todas: el universo es inmenso y siempre hay algo nuevo por descubrir. Y a veces, los mayores descubrimientos vienen de enfrentar nuestros miedos.\nAsí, bajo el manto estrellado, Jorge y el abuelo Gaspar compartieron un momento mágico, unido por el asombro y la curiosidad, recordándoles que el cielo nocturno es un escenario de infinitas posibilidades.',
    questions: []
  },
  {
    text: 'Hace mucho tiempo, en el año mil seiscientos y poco, en una pequeña casa llena de lienzos y colores, en el corazón de Roma, vivía una niña llamada Artemisia, junto a su padre Orazio, un reconocido pintor.\nDesde muy pequeña, Artemisia se sintió fascinada por los pinceles y los colores. Pasaba horas en el taller de su padre, aprendiendo el arte de transformar la tela blanca en historias.\nOrazio, al ver el talento natural de su hija, decidió enseñarle todo lo que sabía. A pesar de que las mujeres de la época raramente eran reconocidas como artistas, Artemisia absorbió cada lección. Su talento y pasión por el arte crecían día a día.\nSin embargo, la vida de Artemisia tomó un giro inesperado cuando confió en la persona equivocada. Agostino Tassi, un pintor amigo de la familia, traicionó su confianza de la manera más vil y abusó de ella.\nArtemisia, herida, pero no derrotada, decidió buscar justicia, enfrentándose a una sociedad que raramente escuchaba la voz de una mujer.\nEl juicio fue largo y doloroso. Artemisia tuvo que soportar la incredulidad y el escrutinio de los jueces, pero su fortaleza nunca flaqueó. A través de su sufrimiento, encontró una nueva voz, no solo para defenderse, sino también para expresarse a través de su arte.\nA pesar de los obstáculos, Artemisia continuó pintando. Su arte evolució de formas que nunca había imaginado. Sus lienzos comenzaron a contar historias de mujeres fuertes y valientes, historias que resonaban con su propia vida y lucha.\nCon cada pincelada, Artemisia no solo sanaba sus propias heridas, sino que también desafiaba las convenciones de su tiempo, demostrando que el talento y la pasión no conocen de géneros.\nLos años pasaron y Artemisia Gentileschi se convirtió en una de las pintoras más reconocidas del Barroco. Sus obras, cargadas de emoción y profundidad, se convirtieron en un testimonio de su fortaleza, su búsqueda de justicia y su inquebrantable espíritu.\nLa historia de Artemisia es un relato de coraje, perseverancia y la lucha incansable por la justicia. En un mundo que intentó silenciarla, Artemisia encontró su voz más poderosa en los lienzos que pintaba, dejando un legado que inspiraría a generaciones futuras a alzar sus voces a través del arte.\nY así, en las calles de Roma, entre los colores de sus pinturas, vive el espíritu de una mujer que desafió su destino, recordándonos que incluso en los momentos más oscuros, podemos encontrar luz y esperanza. ',
    questions: []
  },
  {
    text: 'La noche en Villaensueño había perdido su magia; el oso que guardaba sueños había desaparecido. El joven detective Soñáguez, recién asignado al departamento de Sueños Felices y Bienestar Ciudadano, ha recibido el encargo de resolver este misterioso caso.\nLas calles de Villaensueño, antes llenas de risas y sueños coloridos, ahora estaban sumidas en silencio. Los niños no podían soñar, y eso llenaba de preocupación a todos. El detective Soñáguez sabía que tenía que actuar rápido.\nArmado con su lupa mágica y una mochila llena de valentía, el detective Soñáguez se adentró en la noche. Su primera parada fue la casa donde el oso solía vivir. Allí, encontró huellas que llevaban hacia el bosque, un lugar de misterios y antiguas leyendas.\n—Estas huellas son recientes —murmuró para sí mismo—. El oso no puede estar lejos.\nAl adentrarse en el espeso bosque, la luna iluminaba su camino entre los árboles. De repente, una voz suave y melódica lo llamó desde las sombras.\n—Detective Soñáguez, ¿busca al oso que guardaba sueños? —preguntó una anciana que apareció entre los árboles, apoyada en un bastón tallado con imágenes de soles y lunas.\n—Sí, señora. ¿Sabe dónde puedo encontrarlo? —respondió Soñáguez con respeto.\n—El oso fue llevado por una sombra celosa de su poder. Debes adentrarte más en el bosque y seguir la melodía de las estrellas. Ellas te guiarán —explicó la anciana, desapareciendo tan misteriosamente como había aparecido.\nSiguiendo el consejo de la anciana, el detective Soñáguez escuchó atentamente. Una suave melodía lo guiaba más profundamente en el bosque, hasta llegar a un claro donde la luna brillaba con especial intensidad.\nAllí, encontró al oso atrapado en una jaula de cristal, vigilado por una sombra oscura y enmascarada.\n—¿Por qué has hecho esto? —preguntó el detective Soñáguez a la sombra, su lupa reflejando la luz de la luna.\n—El oso tiene el poder de crear sueños felices. Yo quería ese poder para mí —confesó la sombra con voz temblorosa.\nEl detective Soñáguez, con un gesto firme, se acercó a la jaula y, usando su lupa mágica, concentró la luz de la luna en el cristal. La jaula se disolvió como azúcar en agua, liberando al oso.\nGracias, detective —dijo el oso con una voz profunda y calmada—. Ahora puedo volver a llevar sueños felices a los niños.\nJuntos, el detective Soñáguez y el oso regresaron a Villaensueño. Al llegar, los niños ya dormían, pero esta vez, sus rostros se iluminaron con sonrisas. Los sueños habían vuelto.\n—Has hecho un gran trabajo, detective Soñáguez —dijo el oso, dándole una pequeña pluma de sueño como agradecimiento.\n—Lo importante es que los niños puedan soñar de nuevo —respondió el detective Soñáguez, guardando la pluma en su bolsillo.\nDesde esa noche, en Villaensueño se contaban historias del valiente detective Soñáguez y del oso que guardaba sueños, recordando siempre la importancia de proteger y valorar los sueños de cada uno. ',
    questions: []
  },
  {
    text: 'Érase una vez, en una aldea soleada, una cabaña muy pequeña en la que nadie vivía. Estaba muy descuidada y abandonada y todos los habitantes de la aldea decían que era una cabaña encantada.\nNadie se atrevía a entrar y a todos les daba miedo. Nunca nadie tuvo valor de acercarse y siempre hablaban de ello.\nDe entre todos los niños, había uno que se llamaba Julián del que siempre se burlaban porque era muy miedoso. Julián estaba cansado de que lo trataran así y aunque nunca decía mentiras, pensó que si les hacía creer que él había entrado en la cabaña dejarían de reírse de él y creerían que era un verdadero héroe.\nAsí que un día, Julián inventó una historia y fue a contársela al resto de niños de la aldea.\n- Soy el primero que ha entrado en la cabaña encantada.¡Soy el más fuerte y valiente de toda la aldea!i\n- ¿Ah sí? ¡Ja! Eso habrá que verlo - le contestó uno de los niños de la aldea\nJuan sacó de dentro una valentía que nunca antes había demostrado para contestarles. Pero no se daba cuenta de que se estaba metiendo en un buen lío...\n- Podéis venir conmigo a la cabaña. Si es que estáis dispuestos claro… - dijo Juan\nEl más mayor de los chicos dio un paso al frente y le contestó\n- Mañana mismo. Tú irás delante y nosotros detrás. Y así veremos si dices o no la verdad\nJulián estaba asustado. Él sólo quería que los niños de la aldea dejaran de meterse con él y ahora no sabía qué iba a hacer. Si reconocía que les había mentido se reirían aún más de él. Su única esperanza es que los niños no acudieran a su cita en la cabaña.\nLlegó el día siguiente. Todos estaban junto a la puerta de la cabaña. Julián cogió aire muy fuerte y se metió las manos en los bolsillos para que nadie viese que le temblaban de puro miedo. No tenía otra opción que entrar pero sabía que no iba a ser capaz y estaba muy asustado. Todos los niños permanecían a unos cuantos pasos de él amontonados en un grupo.\nJulián estaba a punto de poner su pie en la cabaña cuando se dio cuenta de algo:\n- Un momento. Dijisteis que vendríais detrás de mi y estáis ahí mirando. Si vosotros no pasáis, yo tampoco.\nLa cabaña encantadaLos chicos empezaron a ponerse nerviosos, ninguno quería entrar porque todos tenían el mismo miedo que Julián y hubo uno que hasta salió corriendo.\n- ¿Veis? Vosotros tampoco sois tan valientes. Si no sois capaces de entrar no deberíais burlaros de mí llamándome miedica.\nSe hizo un gran silencio. Después uno por uno reconocieron que ellos también estaban asustados. Al final, el más mayor pidió en nombre de todos perdón a Julián porque no se habían portado bien riéndose de él cuando a ellos también les daba miedo entrar en la cabaña.\nAcabaron haciéndose amigos y Julián entendió que no tenía por qué avergonzarse por ser como era.',
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
