import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [text, setText] = useState('');
  const [searchStr, setSearchStr] = useState('');
  const [replaceStr, setReplaceStr] = useState('');
  const [uniqueWordCount, setUniqueWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    // Update statistics in real-time
    const words = text.match(/\b\w+\b/g);
    const uniqueWords = new Set(
      words ? words.map((word) => word.toLowerCase()) : []
    );
    setUniqueWordCount(uniqueWords.size);
    const characterCount = text.replace(/[^a-zA-Z0-9]/g, '').length;
    setCharCount(characterCount);
  }, [text]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleReplace = () => {
    if (searchStr === '') return;
    const regex = new RegExp(searchStr, 'gi');
    const replacedText = text.replace(regex, replaceStr);
    updateHistory(replacedText);
  };

  const updateHistory = (newText) => {
    const newHistory = [...history.slice(0, historyIndex + 1), newText];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setText(newText);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setText(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setText(history[historyIndex + 1]);
    }
  };

  const clearText = () => {
    setText('');
    setSearchStr('');
    setReplaceStr('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert('Text copied to clipboard!');
  };

  return (
    <div className="container">
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Type here..."
        rows="10"
        cols="50"
      />
      <div className="stats">
        <p>Unique Words: {uniqueWordCount}</p>
        <p>Character Count (Excluding Spaces and Punctuation): {charCount}</p>
      </div>
      <div className="replace-container">
        <input
          type="text"
          placeholder="Search string"
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
        />
        <input
          type="text"
          placeholder="Replace with"
          value={replaceStr}
          onChange={(e) => setReplaceStr(e.target.value)}
        />
        <button onClick={handleReplace}>Replace All</button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button onClick={clearText}>Clear</button>
        <button onClick={copyToClipboard}>Copy to Clipboard</button>
      </div>
    </div>
  );
};

export default App;
