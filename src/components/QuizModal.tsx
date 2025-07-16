
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Check, AlertCircle } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  questions: QuizQuestion[];
  language: 'en' | 'hi';
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, title, questions, language }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: { selected: string; correct: boolean } }>({});

  if (!isOpen) return null;

  const question = questions[currentQuestion];
  
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    const isCorrect = selectedAnswer === question.correctAnswer;
    const newAnswers = {
      ...answers,
      [currentQuestion]: { selected: selectedAnswer, correct: isCorrect }
    };
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowResult(false);
    setScore(0);
    setAnswers({});
  };

  const isAnswered = answers[currentQuestion];

  if (showResult) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">Quiz Results</h2>
            <Button onClick={onClose} variant="ghost" size="sm">
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
              <p className="text-lg">Your Score: {score}/{questions.length}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(score / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button onClick={resetQuiz} className="w-full">
                Retake Quiz
              </Button>
              <Button onClick={onClose} variant="outline" className="w-full">
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">{title}</h2>
          <Button onClick={onClose} variant="ghost" size="sm">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm text-gray-600">Score: {score}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{question.question}</CardTitle>
            </CardHeader>
            <CardContent>
              {question.type === 'multiple-choice' && question.options && (
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedAnswer === option
                          ? 'bg-blue-50 border-blue-500'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleAnswerSelect(option)}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                          selectedAnswer === option
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-300'
                        }`}></div>
                        {option}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {question.type === 'true-false' && (
                <div className="space-y-3">
                  {['True', 'False'].map((option) => (
                    <div
                      key={option}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedAnswer === option
                          ? 'bg-blue-50 border-blue-500'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleAnswerSelect(option)}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                          selectedAnswer === option
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-300'
                        }`}></div>
                        {option}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {isAnswered && (
                <div className={`mt-4 p-4 rounded-lg ${
                  isAnswered.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-start gap-2">
                    {isAnswered.correct ? (
                      <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    )}
                    <div>
                      <p className={`font-medium ${
                        isAnswered.correct ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {isAnswered.correct ? 'Correct!' : 'Incorrect'}
                      </p>
                      {!isAnswered.correct && (
                        <p className="text-red-700 text-sm mt-1">
                          Correct answer: {question.correctAnswer}
                        </p>
                      )}
                      <p className="text-gray-700 text-sm mt-2">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                {!isAnswered ? (
                  <Button 
                    onClick={handleNext} 
                    disabled={!selectedAnswer}
                    className="flex-1"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="flex-1">
                    {currentQuestion + 1 < questions.length ? 'Next Question' : 'Finish Quiz'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
