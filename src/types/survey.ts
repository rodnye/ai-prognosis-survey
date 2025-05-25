type SurveyQuestion = {
  id: number;
  text: string;
  options: string[];
};
type Survey = {
  id: string;
  title: string;
  questions: SurveyQuestion[];
};
