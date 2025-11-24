import { Pencil, SquarePen, Trash2 } from "lucide-react";

const QuestionListItem = ({
  question,
  setEditingQuestionId,
  deleteQuestion,
  index,
}: any) => {
  const { id, name, type, required } = question;

  const typeLabel = type
    ?.split("_")
    ?.map((word: any) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
    ?.join(" ");

  return (
    <div className="flex sm:items-center sm:flex-row flex-col gap-2 flex-wrap justify-between p-4 border border-gray-300 rounded-lg bg-gray-50">
      <div className="flex sm:items-center sm:flex-row flex-col flex-wrap space-x-4 min-w-0">
        <div className="flex flex-row items-center gap-2">
          <span className="text-base font-bold text-indigo-500">
            {index + 1}.
          </span>
          <div className="truncate">
            <p className="text-base font-semibold text-gray-800 truncate">
              {name}
              {required && (
                <span className="text-red-500 text-lg leading-none">*</span>
              )}
            </p>
          </div>
        </div>
        <div className="text-sm text-white sm:flex hidden space-x-2 ">
          <span className="whitespace-nowrap px-3 py-1 bg-indigo-300 rounded-full text-xs">
            {typeLabel}
          </span>
        </div>
      </div>
      <div className="flex space-x-2 ">
        <button
          onClick={() => setEditingQuestionId(id)}
          className="text-sm py-1 px-3 gap-1 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors flex items-center"
        >
          <Pencil width={16} />
          Edit
        </button>
        <button
          onClick={() => deleteQuestion(id)}
          className="text-sm p-2 py-1 flex items-center gap-1 text-red-600 border rounded-lg hover:bg-red-100 transition-colors"
        >
          <Trash2 width={16} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default QuestionListItem;
