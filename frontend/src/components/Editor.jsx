import React, { useState } from "react";
import axios from "axios";
import { FaSpellCheck } from "react-icons/fa";
import { SiGrammarly } from "react-icons/si";

const Editor = () => {
  const [text, setText] = useState("");
  const [spellCheck, setSpellCheck] = useState("");
  const [grammarCheck, setGrammarCheck] = useState("");
  const [correctedSentences, setCorrectedSentences] = useState([]);
  const handleTextChange = (e) => setText(e.target.value);
  const handleSentenceSelection = () => {
    const selected = window.getSelection().toString();
    setSelectedSentence(selected);
  };

  const handleSpellCheck = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/openai/spell",
        { text }
      );
      setSpellCheck(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGrammarCheck = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/openai/check",
        { text }
      );
      setGrammarCheck(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const addCorrectedSentence = (sentence) => {
    if (!sentence) return;
    setCorrectedSentences([...correctedSentences, sentence]);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              AI Writing Assistant
            </h2>
            <textarea
              placeholder="Type your text here..."
              value={text}
              onChange={handleTextChange}
              onMouseUp={handleSentenceSelection}
              rows={10}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="flex justify-end mt-4 space-x-4">
              <button
                onClick={handleSpellCheck}
                className="flex gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
              >
                <FaSpellCheck size={20} /> Check Spelling
              </button>
              <button
                onClick={handleGrammarCheck}
                className="flex gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
              >
                <SiGrammarly size={20} /> Check Grammar
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Spell Checked Text
              </h3>
              <p className="text-gray-600">{spellCheck || "No result yet."}</p>
              <button
                onClick={() => addCorrectedSentence(spellCheck)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
              >
                Accept
              </button>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Grammar Checked Text
              </h3>
              <p className="text-gray-600">{grammarCheck || "No result yet."}</p>
              <button
                onClick={() => addCorrectedSentence(grammarCheck)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="bg-white shadow-lg rounded-lg p-6 sticky top-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              ✅ Corrected Sentences
            </h3>
            {correctedSentences.length > 0 ? (
              correctedSentences.map((sentence, index) => (
                <p
                  key={index}
                  className="text-gray-700 mb-2 pb-2 border-b border-gray-200"
                >
                  {sentence}
                </p>
              ))
            ) : (
              <p className="text-gray-500 italic">
                No corrected sentences yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
