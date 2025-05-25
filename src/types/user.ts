type UserVote = {
  id: number;
  option: number; // si es 0 no ha sido votado aún
  comment: string | null;
};

type SurveyUserVotes = {
  surveyId: string;
  finished: boolean;
  votes: UserVote[];
};

type User = {
  id: string;
  surveys: {
    [survey: string]: SurveyUserVotes;
  };
};
