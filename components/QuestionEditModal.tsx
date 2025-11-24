"use client";

import React, { useState, useEffect, useCallback } from "react";
import { QuestionType } from "../utils/constants";

import { v4 as uuidv4 } from "uuid";
import { Plus, Trash2, X } from "lucide-react";

const QuestionModal = ({
  activeQuestion,
  onClose,
  editQuestion,
  deleteQuestion,
}: any) => {
  // copy the data into local data to modify it
  const [currentDraft, setCurrentDraft] = useState<any>(activeQuestion);

  useEffect(() => {
    setCurrentDraft(activeQuestion);
  }, [activeQuestion]);

  const generateDraftOptionId = () => `opt-${uuidv4()}`;

  //update local data
  const handleInternalUpdate = useCallback(
    (key: any, value: any) => {
      if (key === "type" && value !== currentDraft?.type) {
        setCurrentDraft((prev: any) => ({
          ...prev,
          [key]: value,
          options:
            value === QuestionType.MULTIPLE_CHOICE
              ? prev?.options?.length > 0
                ? prev?.options
                : [{ id: generateDraftOptionId(), text: "Option name" }]
              : [],
        }));
      } else {
        setCurrentDraft((prev: any) => ({ ...prev, [key]: value }));
      }
    },
    [currentDraft.type]
  );

  // update option text
  const handleUpdateOptionText = useCallback((optionId: any, newText: any) => {
    setCurrentDraft((prev: any) => ({
      ...prev,
      options: prev?.options?.map((opt: any) =>
        opt?.id === optionId ? { ...opt, text: newText } : opt
      ),
    }));
  }, []);

  // handle add new option
  const handleAddOption = useCallback(() => {
    const newOption = { id: generateDraftOptionId(), text: `Option name` };
    setCurrentDraft((prev: any) => ({
      ...prev,
      options: [...prev?.options, newOption],
    }));
  }, []);

  // delete the option
  const handleDeleteOption = useCallback((optionId: any) => {
    setCurrentDraft((prev: any) => ({
      ...prev,
      options: prev?.options?.filter((opt: any) => opt?.id !== optionId),
    }));
  }, []);

  const handleSaveChanges = () => {
    editQuestion(currentDraft?.id, currentDraft);
    onClose();
  };

  const handleDeleteAndClose = () => {
    deleteQuestion(currentDraft?.id);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!currentDraft) return null;

  const { name, type, required, options } = currentDraft;

  const isMinOptions = options?.length <= 1;

  const isSaveDisabled =
    !name ||
    name?.trim() === "" ||
    (type === QuestionType.MULTIPLE_CHOICE && options?.length === 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <p className="text-lg font-medium text-black">Edit Question</p>
        <button
          onClick={handleCancel}
          className="text-gray-400 hover:text-gray-700 transition-colors text-3xl leading-none"
        >
          <X />
        </button>
      </div>

      <div className="mb-4">
        <label className="flex text-sm font-semibold text-gray-600 mb-1">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => handleInternalUpdate("name", e?.target?.value)}
          placeholder="Enter the question text"
          className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="flex text-sm font-semibold text-gray-600 mb-1">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => handleInternalUpdate("type", e?.target?.value)}
            className="w-full px-3 py-2 border border-gray-400 rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value={QuestionType.TEXT}>Text Input</option>
            <option value={QuestionType.MULTIPLE_CHOICE}>
              Multiple Choice
            </option>
          </select>
        </div>

        <div className="flex items-center pt-2 sm:pt-6 justify-start">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={required}
              onChange={(e) =>
                handleInternalUpdate("required", e?.target?.checked)
              }
            />
            <span className="ml-3 text-base font-medium text-gray-900">
              Required
            </span>
          </label>
        </div>
      </div>

      {type === QuestionType.MULTIPLE_CHOICE && (
        <div className=" border-t pt-4">
          <p className="text-sm font-semibold text-gray-600 mb-3">
            Manage Options:
          </p>

          <div className="flex flex-col gap-2">
            {options?.map((option: any, index: any) => (
              <div key={option?.id} className="flex items-center">
                <span className="mr-2 text-gray-500 text-sm w-4">
                  {index + 1}.
                </span>
                <input
                  type="text"
                  value={option?.text}
                  onChange={(e) =>
                    handleUpdateOptionText(option?.id, e.target.value)
                  }
                  placeholder={`Option ${index + 1}`}
                  className="grow p-2 border border-gray-400 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  onClick={() =>
                    !isMinOptions && handleDeleteOption(option?.id)
                  }
                  className={`ml-3 rounded-full transition-colors ${
                    !isMinOptions
                      ? "text-red-600 cursor-pointer"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Trash2 width={20} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleAddOption}
            className="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <Plus width={20} />
            Add New Option
          </button>
        </div>
      )}

      <div className="mt-6 pt-4 border-t flex justify-between">
        <button
          onClick={handleDeleteAndClose}
          className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors text-sm"
        >
          Delete
        </button>
        <div className="flex space-x-3">
          <button
            onClick={handleCancel}
            className="py-2 px-4 font-semibold rounded-lg transition-colors text-sm bg-white border text-black hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveChanges}
            disabled={isSaveDisabled}
            className={`py-2 px-4 text-white font-semibold rounded-lg transition-colors text-sm ${
              isSaveDisabled
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
