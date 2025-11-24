"use client";

import React, { useState } from "react";
import { useSurvey } from "../hooks/useSurvey";

import QuestionListItem from "../components/QuestionListItem";
import QuestionAddModal from "../components/QuestionAddModal";
import SurveyPreview from "../components/SurveyPreview";
import QuestionEditModal from "@/components/QuestionEditModal";
import QuestionJSON from "@/components/QuestionJSON";
import { Plus } from "lucide-react";

const Home = () => {
  const {
    questions,
    questionsJSON,
    responsesJSON,
    addQuestion,
    deleteQuestion,
    updateResponse,
    editQuestion,
    responses,
  } = useSurvey();

  const [activeTab, setActiveTab] = useState<any>("Question List");
  const [editingQuestionId, setEditingQuestionId] = useState<any>(null);
  const [isAdding, setIsAdding] = useState<any>(false);

  const questionToEdit = questions?.find(
    (ques: any) => ques?.id === editingQuestionId
  );

  const handleStartAdd = () => {
    setIsAdding(true);
  };

  const handleCloseModal = () => {
    setEditingQuestionId(null);
    setIsAdding(false);
  };

  const isEditModalOpen = !!questionToEdit;
  const isAddModalOpen = isAdding;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 ">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-black text-center sm:text-left">
          🛠️ Survey Builder
        </h1>

        {/* --- Tab Navigation --- */}
        <div className="mb-6 flex border-b border-gray-200 bg-white rounded-t-xl shadow-md overflow-hidden">
          {["Question List", "Survey Preview", "JSON Output"]?.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 text-base font-semibold transition-all ${
                activeTab === tab
                  ? "border-b-4 border-indigo-600 text-indigo-600 bg-indigo-50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className=" bg-white p-4 sm:p-6 shadow-2xl rounded-xl border border-gray-100">
          {activeTab === "Question List" && (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b">
                <h2 className="text-xl font-bold mb-4 sm:mb-0 text-gray-800">
                  Question List
                </h2>
                <div className="flex space-x-3">
                  <button
                    onClick={handleStartAdd}
                    className="py-2 px-4 flex items-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors text-base font-semibold"
                  >
                    <Plus width={20} />
                    Add New Question
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {questions?.map((ques: any, index: any) => (
                  <QuestionListItem
                    key={ques?.id}
                    question={ques}
                    index={index}
                    setEditingQuestionId={setEditingQuestionId}
                    deleteQuestion={deleteQuestion}
                  />
                ))}
                {questions.length === 0 && (
                  <div className="text-gray-500 text-center py-20 border border-dashed border-gray-300 rounded-lg">
                    <p className="mb-2">No questions defined.</p>
                    <p>Use the button above to add a new question</p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === "Survey Preview" && (
            <SurveyPreview
              questions={questions}
              updateResponse={updateResponse}
              responses={responses}
            />
          )}

          {activeTab === "JSON Output" && (
            <QuestionJSON
              questionsJSON={questionsJSON}
              responsesJSON={responsesJSON}
            />
          )}
        </div>

        {isAddModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
            <div className="bg-white rounded-xl shadow-md w-full max-w-4xl transform transition-all duration-300">
              <QuestionAddModal
                onClose={handleCloseModal}
                onSave={addQuestion}
              />
            </div>
          </div>
        )}

        {isEditModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
            <div className="bg-white rounded-xl shadow-md w-full max-w-4xl transform transition-all duration-300">
              <QuestionEditModal
                activeQuestion={questionToEdit}
                onClose={handleCloseModal}
                editQuestion={editQuestion}
                deleteQuestion={deleteQuestion}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
