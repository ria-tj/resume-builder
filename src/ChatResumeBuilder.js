import React, { useState } from "react";
import "./ChatResumeBuilder.css"; // we'll style soon

const questions = [
  { key: "fullName", text: "👋 Hi! Let's build your resume. What's your full name?" },
  { key: "email", text: "📧 Great! What's your email address?" },
  { key: "phone", text: "📞 Your phone number?" },
  { key: "skills", text: "💡 List your top skills (comma separated):" },
  { key: "experience", text: "🧑‍💻 Tell me about your work experience:" },
  { key: "education", text: "🎓 What’s your highest education qualification?" },
];

export default function ChatResumeBuilder() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: questions[0].text },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // save user answer
    const key = questions[currentStep].key;
    const newAnswers = { ...answers, [key]: inputValue };

    // add user message
    const newMessages = [...messages, { sender: "user", text: inputValue }];

    // move to next question
    if (currentStep < questions.length - 1) {
      const nextStep = currentStep + 1;
      newMessages.push({ sender: "bot", text: questions[nextStep].text });
      setCurrentStep(nextStep);
    } else {
      newMessages.push({ sender: "bot", text: "✅ All done! Generating your resume soon..." });
    }

    setMessages(newMessages);
    setAnswers(newAnswers);
    setInputValue("");
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={`chat-bubble ${m.sender}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your answer..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
