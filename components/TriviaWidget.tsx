import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

const QUESTIONS = [
    {
        q: "Quốc gia nào đăng cai World Cup 2026?",
        options: ["Mỹ", "Mỹ, Canada, Mexico", "Brazil", "Pháp"],
        correct: 1
    },
    {
        q: "World Cup 2026 sẽ có bao nhiêu đội tham dự?",
        options: ["32", "40", "48", "64"],
        correct: 2
    },
    {
        q: "Đương kim vô địch World Cup 2022 là ai?",
        options: ["Pháp", "Brazil", "Đức", "Argentina"],
        correct: 3
    }
];

const TriviaWidget: React.FC = () => {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = QUESTIONS[qIndex];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelected(idx);
    setIsAnswered(true);
  };

  const nextQuestion = () => {
    setSelected(null);
    setIsAnswered(false);
    setQIndex((prev) => (prev + 1) % QUESTIONS.length);
  };

  return (
    <div className="bg-gradient-to-br from-[#9f224e] to-[#6d1332] rounded-lg shadow-md p-5 text-white mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        
        <div className="flex items-center gap-2 mb-4 relative z-10">
            <HelpCircle className="w-5 h-5 text-yellow-300" />
            <h3 className="font-bold text-sm uppercase tracking-wide">Thử tài kiến thức</h3>
        </div>

        <div className="relative z-10">
            <p className="font-bold text-base mb-4 leading-snug min-h-[48px]">{question.q}</p>
            
            <div className="flex flex-col gap-2">
                {question.options.map((opt, idx) => {
                    let btnClass = "bg-white/10 hover:bg-white/20 border border-white/10 text-white";
                    let icon = null;

                    if (isAnswered) {
                        if (idx === question.correct) {
                            btnClass = "bg-green-500 border-green-400 text-white";
                            icon = <CheckCircle2 className="w-4 h-4 ml-auto" />;
                        } else if (idx === selected) {
                            btnClass = "bg-red-500 border-red-400 text-white";
                            icon = <XCircle className="w-4 h-4 ml-auto" />;
                        } else {
                            btnClass = "opacity-50 bg-black/20 border-transparent";
                        }
                    }

                    return (
                        <button 
                            key={idx}
                            onClick={() => handleSelect(idx)}
                            disabled={isAnswered}
                            className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-all flex items-center ${btnClass}`}
                        >
                            {opt}
                            {icon}
                        </button>
                    );
                })}
            </div>

            {isAnswered && (
                <button 
                    onClick={nextQuestion}
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-white text-[#9f224e] font-bold py-2 rounded shadow-sm hover:bg-gray-100 transition-colors text-sm"
                >
                    <RefreshCw className="w-3 h-3" /> Câu tiếp theo
                </button>
            )}
        </div>
    </div>
  );
};

export default TriviaWidget;