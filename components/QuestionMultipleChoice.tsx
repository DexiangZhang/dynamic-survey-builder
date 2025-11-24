export const QuestionMultiplePreview = ({
  index,
  question,
  updateResponse,
  currentAnswer,
}: any) => (
  <div className="p-5 bg-white rounded-xl shadow-lg border border-gray-200">
    <label className="flex text-lg font-semibold text-gray-800 mb-3">
      {index + 1}.{question?.name}{" "}
      {question?.required && (
        <span className="text-red-500 text-lg leading-none">*</span>
      )}
    </label>

    <div className="space-y-2">
      {question?.options?.map((option: any) => (
        <div key={option?.id} className="flex items-center cursor-pointer">
          <input
            type="radio"
            id={`${question?.id}-${option?.id}`}
            name={question?.id}
            value={option?.id}
            checked={currentAnswer === option?.id}
            onChange={() => updateResponse(question?.id, option?.id)}
            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
          />
          <label
            htmlFor={`${question?.id}-${option?.id}`}
            className="ml-3 text-base text-gray-700 cursor-pointer"
          >
            {option?.text}
          </label>
        </div>
      ))}
    </div>
  </div>
);
