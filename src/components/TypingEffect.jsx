import { useState, useEffect } from 'react';

const TypingEffect = () => {
  const phrases = ['Привет, друг!', 'Добро пожаловать!', 'Рад тебя видеть!'];

  const [currentText, setCurrentText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer;

    const handleTyping = () => {
      const currentPhrase = phrases[currentPhraseIndex];

      if (!isDeleting) {
        setCurrentText(currentPhrase.substring(0, currentText.length + 1));

        if (currentText === currentPhrase) {
          setTypingSpeed(2000);
          setIsDeleting(true);
        } else {
          setTypingSpeed(150);
        }
      } else {
        setCurrentText(currentPhrase.substring(0, currentText.length - 1));

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
          setTypingSpeed(500);
        } else {
          setTypingSpeed(100);
        }
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, currentPhraseIndex, isDeleting, typingSpeed, phrases]);

  return (
    <div className="greeting__text">
      <div className="typing-text">
        {currentText}
        <span className="cursor">|</span>
      </div>
      <style jsx>{`
        .typing-text {
          min-height: 1.5em; /* Фиксированная высота для предотвращения скачков */
        }
        .cursor {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          from,
          to {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default TypingEffect;
