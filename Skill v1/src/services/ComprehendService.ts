import AWS from 'aws-sdk';

const comprehend = new AWS.Comprehend({ region: 'us-east-1' });

export interface AnalyzedText {
  entities: AWS.Comprehend.Entity[];
  keyPhrases: AWS.Comprehend.KeyPhrase[];
}

export async function analyzeText(text: string): Promise<AnalyzedText> {
  const params = {
    LanguageCode: 'es',
    Text: text,
  };

  const entityPromise = comprehend.detectEntities(params).promise();
  const keyPhrasesPromise = comprehend.detectKeyPhrases(params).promise();

  const [entitiesResult, keyPhrasesResult] = await Promise.all([entityPromise, keyPhrasesPromise]);

  return {
    entities: entitiesResult.Entities || [],
    keyPhrases: keyPhrasesResult.KeyPhrases || [],
  };
}
