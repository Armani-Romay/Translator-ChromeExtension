import { useState } from 'react'
import './App.css'
import logo from './assets/icon32.png'
import icon1 from './assets/icon1.png'
import icon2 from './assets/icon2.png'
import icon3 from './assets/icon3.png'
import icon4 from './assets/icon4.png'
import microphone from './assets/microphoneIcon.png'

function App() {
  const [text, setText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [isListening, setIsListening] = useState(false); // Add state for listening

  const handleTranslate = async () => {
    if (!text.trim()) {
      alert('Please enter text to translate.');
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:5000/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_text: text }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
        return;
      }
  
      const data = await response.json();
      setTranslatedText(data.translation);
    } catch (error) {
      console.error('Error while translating:', error);
      alert('Failed to connect to the translation API.');
    }
  };
  

  const handleMicrophoneClick = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="translator-container">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>My Translator</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text here..."
        className="translator-textarea"
      />
      <button onClick={handleTranslate} className="translator-button">
        Translate
      </button>
      <button onClick={handleMicrophoneClick} className={`microphone-button ${isListening ? 'glowing' : ''}`}>
        <img src={microphone} className="microphone-icon" alt="microphone" />
        {isListening && <span className="listening-text">Listening...</span>}
      </button>
      {translatedText && <p className="translated-text">{translatedText}</p>}
      <img src={icon1} className="floating-icon floating-icon1" alt="icon1" />
      <img src={icon2} className="floating-icon floating-icon2" alt="icon2" />
      <img src={icon3} className="floating-icon floating-icon3" alt="icon3" />
      <img src={icon4} className="floating-icon floating-icon4" alt="icon4" />
    </div>
  )
}

export default App