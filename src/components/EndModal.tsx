import React, { useContext, useEffect } from 'react';
import { QuizContext } from '../context/QuizContext';

export const EndModal: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { goToResults } = useContext(QuizContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      goToResults();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};