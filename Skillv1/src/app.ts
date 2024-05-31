import { App } from '@jovotech/framework';
import { AlexaPlatform } from '@jovotech/platform-alexa';
import { ReadingComponent } from './components/ReadingComponents';

const app = new App({
  components: [ReadingComponent],
});

app.use(new AlexaPlatform());

export { app };
