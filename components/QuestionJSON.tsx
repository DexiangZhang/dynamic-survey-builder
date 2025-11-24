const QuestionJSON = ({ questionsJSON, responsesJSON }: any) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-1">
          Question Schema
        </h3>
        <p className="text-sm text-gray-500 mb-2">
          This is the blueprint for the survey questions.
        </p>
        <pre className="bg-gray-800 text-cyan-300 p-4 rounded-lg overflow-x-auto text-xs sm:text-sm shadow-inner">
          {questionsJSON}
        </pre>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-1">
          Survey Responses
        </h3>
        <p className="text-sm text-gray-500 mb-2">
          This is the response to the survey questions.
        </p>
        <pre className="bg-gray-800 text-green-300 p-4 rounded-lg overflow-x-auto text-xs sm:text-sm shadow-inner">
          {responsesJSON}
        </pre>
      </div>
    </div>
  );
};

export default QuestionJSON;
