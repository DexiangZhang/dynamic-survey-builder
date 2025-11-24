export const QuestionTextPreview = ({
  index,
  question,
  updateResponse,
  currentAnswer,
}: any) => (
  <div className="p-5 bg-white rounded-xl shadow-lg border border-gray-200">
    <label className="flex text-lg font-semibold text-gray-800 mb-3">
      {index + 1}.{question?.name}{" "}
      {question?.required && (
        <span className="text-red-500 text-xl leading-none">*</span>
      )}
    </label>
    <input
      type="text"
      value={currentAnswer}
      onChange={(e) => updateResponse(question?.id, e?.target?.value)}
      placeholder="Type your answer here..."
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
    />
  </div>
);
