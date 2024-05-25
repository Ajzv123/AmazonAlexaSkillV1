import { Passage } from '../components/ReadingComponents';
import { AnalyzedText } from '../services/ComprehendService';

export interface SessionData {
  passage?: Passage;
  currentQuestionIndex?: number;
  analysis?: AnalyzedText;
}
