import { App } from '@jovotech/framework';
import { AlexaPlatform } from '@jovotech/platform-alexa';
import { ReadingComponent } from './components/ReadingComponents';


const app = new App({
  components: [ReadingComponent],
  plugins: [
    // Add Jovo plugins here
		new AlexaPlatform({
		  intentMap: { 'AMAZON.StopIntent': 'END', 'AMAZON.CancelIntent': 'END' }
		}),
  ],
  logging: true,
});

app.use(new AlexaPlatform());

export { app };
