"use client";

import { useState, useCallback, useMemo } from "react";
import { QuestionType } from "../utils/constants";

import { v4 as uuidv4 } from "uuid";

export const useSurvey = () => {
  const [questions, setQuestions] = useState<any>([]);
  const [responses, setResponses] = useState<any>([]);

  // add the new question
  const addQuestion = useCallback((questionDraft: any) => {
    const newQuestion = {
      ...questionDraft,
      id: uuidv4(),
      options: questionDraft?.options?.map((opt: any) => ({
        ...opt,
        id: `opt-${uuidv4()}`,
      })),
    };
    setQuestions((prev: any) => [...prev, newQuestion]);
  }, []);

  // delete the question both from question json and response json
  const deleteQuestion = useCallback((id: any) => {
    setQuestions((prev: any) =>
      prev?.filter((question: any) => question?.id !== id)
    );
    setResponses((prev: any) =>
      prev?.filter((res: any) => res?.questionId !== id)
    );
  }, []);

  // edit question
  const editQuestion = useCallback((id: any, updates: any) => {
    setQuestions((prev: any) =>
      prev?.map((ques: any) => {
        // find the match question by id
        if (ques?.id === id) {
          // if we find it, and the type is change
          if (updates?.type && updates?.type !== ques?.type) {
            return {
              ...ques,
              ...updates,
              options:
                updates?.type === QuestionType.MULTIPLE_CHOICE
                  ? ques?.options?.length > 0
                    ? ques?.options
                    : [{ id: `opt-${uuidv4()}`, text: "Option name" }]
                  : [],
            };
          }

          return { ...ques, ...updates };
        }
        return ques;
      })
    );
  }, []);

  // add options for multiple choice question
  const addOption = useCallback((questionId: any) => {
    setQuestions((prev: any) =>
      prev?.map((ques: any) =>
        ques?.id === questionId
          ? {
              ...ques,
              options: [
                ...ques?.options,
                { id: `opt-${uuidv4()}`, text: `Option name` },
              ],
            }
          : ques
      )
    );
  }, []);

  // update the option text data
  const updateOptionText = useCallback(
    (questionId: any, optionId: any, newText: any) => {
      setQuestions((prev: any) =>
        prev?.map((ques: any) =>
          ques?.id === questionId
            ? {
                ...ques,
                options: ques?.options?.map((opt: any) =>
                  opt?.id === optionId ? { ...opt, text: newText } : opt
                ),
              }
            : ques
        )
      );
    },
    []
  );

  // delete existing question
  const deleteOption = useCallback((questionId: any, optionId: any) => {
    setQuestions((prev: any) =>
      prev?.map((ques: any) =>
        ques?.id === questionId
          ? {
              ...ques,
              options: ques?.options?.filter(
                (opt: any) => opt?.id !== optionId
              ),
            }
          : ques
      )
    );
  }, []);

  // update the response json
  const updateResponse = useCallback((questionId: any, answer: any) => {
    setResponses((prev: any) => {
      // if there is no answer or answer is text but empty user input
      if (!answer || (typeof answer === "string" && answer?.trim() === "")) {
        return prev?.filter((res: any) => res?.questionId !== questionId);
      }

      // update exisited question answer
      const existing = prev?.find((res: any) => res?.questionId === questionId);
      if (existing) {
        return prev?.map((res: any) =>
          res?.questionId === questionId ? { ...res, answer } : res
        );
      }

      // add new response data
      return [...prev, { questionId, answer }];
    });
  }, []);

  // return question json schema
  const questionsJSON = useMemo(
    () => JSON.stringify(questions, null, 2),
    [questions]
  );

  // return response json data
  const responsesJSON = useMemo(() => {
    const questionMap = questions?.reduce((map: any, ques: any) => {
      if (ques?.id) {
        map[ques?.id] = ques;
      }
      return map;
    }, {});

    const finalResponses = responses?.reduce((acc: any, res: any) => {
      const question = questionMap[res?.questionId];

      if (question) {
        const questionTitle = question?.name;
        let finalAnswer = res?.answer;

        if (question?.type === QuestionType.MULTIPLE_CHOICE) {
          const selectedOption = question?.options?.find(
            (opt: any) => opt?.id === res?.answer
          );

          if (selectedOption) {
            finalAnswer = selectedOption?.text;
          }
        }

        acc[questionTitle] = finalAnswer;
      }
      return acc;
    }, {});

    return JSON.stringify(finalResponses, null, 2);
  }, [questions, responses]);

  return {
    questions,
    responses,
    addQuestion,
    deleteQuestion,
    editQuestion,
    addOption,
    updateOptionText,
    deleteOption,
    updateResponse,
    questionsJSON,
    responsesJSON,
  };
};
