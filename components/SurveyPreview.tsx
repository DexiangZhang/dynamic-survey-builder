import { QuestionType } from "../utils/constants";
import { QuestionTextPreview } from "./QuestionText";
import { QuestionMultiplePreview } from "./QuestionMultipleChoice";

const SurveyPreview = ({ questions, updateResponse, responses }: any) => {
  return (
    <div className="">
      <h2 className="text-xl font-bold mb-6 text-black border-b pb-2">
        Survey Preview
      </h2>
      {questions?.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No questions have been added yet. Please go to the "Question List" tab
          to add.
        </p>
      ) : (
        <form>
          <div className="space-y-6">
            {questions?.map((ques: any, index: any) => {
              const answerObject = responses?.find(
                (res: any) => res?.questionId === ques?.id
              );
              const currentAnswer = answerObject ? answerObject?.answer : "";

              if (ques?.type === QuestionType.TEXT) {
                return (
                  <QuestionTextPreview
                    key={ques?.id}
                    question={ques}
                    updateResponse={updateResponse}
                    index={index}
                    currentAnswer={currentAnswer}
                  />
                );
              }
              if (ques?.type === QuestionType.MULTIPLE_CHOICE) {
                return (
                  <QuestionMultiplePreview
                    key={ques?.id}
                    question={ques}
                    updateResponse={updateResponse}
                    index={index}
                    currentAnswer={currentAnswer}
                  />
                );
              }
              return null;
            })}
          </div>
        </form>
      )}
    </div>
  );
};
export default SurveyPreview;
