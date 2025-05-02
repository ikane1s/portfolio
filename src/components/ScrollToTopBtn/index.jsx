import { useState, useEffect } from 'react';
import styles from './ScrollToTopBtn.module.scss';

const ScrollToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeVisible = window.pageYOffset > 300;
      if (shouldBeVisible !== isVisible) {
        setIsVisible(shouldBeVisible);
      }
    };

    // Добавляем троттлинг для оптимизации
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => window.removeEventListener('scroll', throttledScroll);
  }, [isVisible]);

  return (
    <div
      className={`${styles.root} ${isVisible ? styles.visible : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg
        className={styles.svg}
        fill="#7b61ff"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.293,1.293a1,1,0,0,1,1.414,0l6,6a1,1,0,0,1-1.414,1.414L13,4.414V22a1,1,0,0,1-2,0V4.414L6.707,8.707A1,1,0,0,1,5.293,7.293Z" />
      </svg>
    </div>
  );
};

// Вспомогательная функция для троттлинга
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

export default ScrollToTopBtn;
