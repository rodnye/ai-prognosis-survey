import { existsSync, readdir, readFile } from 'fs-extra';
import path from 'path';

const SURVEYS_PATH = path.join(process.cwd(), '/src/assets/surveys');

export const getSurvey = async (surveyId: string) => {
  const surveyFilePath = path.join(SURVEYS_PATH, `${surveyId}.json`);

  if (!existsSync(surveyFilePath)) {
    return null;
  }
  const surveyData = JSON.parse(
    (await readFile(surveyFilePath)).toString(),
  ) as Survey;

  return surveyData;
};

export const listSurveys = async () => {
  try {
    const surveys = await readdir(SURVEYS_PATH, 'utf-8');
    return surveys.map((file) => path.basename(file, '.json'));
  } catch (error) {
    console.error('Error listing surveys:', error);
    throw new Error('Unable to list surveys');
  }
};
