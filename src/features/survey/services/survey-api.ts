'use server';
const API_URL = process.env.URL + '/api/survey';

export const fetchSurvey = async (surveyId: string) => {
  try {
    const response = await fetch(`${API_URL}/${surveyId}`);
    if (!response.ok) {
      throw new Error(`Error al obtener la encuesta: ${response.statusText}`);
    }
    return (await response.json()).survey as Survey;
  } catch (error) {
    throw error;
  }
};
