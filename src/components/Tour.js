import React, { useState, useEffect, useCallback } from "react";

const Tour = ({ 
  active, 
  onClose, 
  onNext, 
  onPrev,
  show,
  scrollToTarget = true
}) => {
  
  const scrollToCurrentTarget = useCallback(() => {
    const currentRef = show?.targetRef;
    if (currentRef?.current) {
      currentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [show?.targetRef]);
  
  useEffect(() => {
    if (active && scrollToTarget) {
      setTimeout(scrollToCurrentTarget, 100);
    }
  }, [show, active, scrollToTarget, scrollToCurrentTarget]);

  if (!active) return null;

  return (
    <>
      <TourTooltip 
        onNext={onNext}
        onPrev={onPrev}
        onClose={onClose}
        show={show}
      />
      <TargetHighlight 
        targetRef={show.targetRef} 
        color={show.color}
      />
      
    </>
  );
};

const TourTooltip = ({ onNext, onPrev, onClose, show }) => {
  const targetRef = show.targetRef;
  const [position, setPosition] = useState({ top: 0, left: 0 });
  
  useEffect(() => {
    const updatePosition = () => {
      if (targetRef && targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        const spaceBelow = viewportHeight - rect.bottom;
        const placeBelow = spaceBelow > 200; 
        
        setPosition({
          top: placeBelow ? rect.bottom + 10 : rect.top - 180,
          left: rect.left + (rect.width / 2) - 150
        });
      }
    };
    
    updatePosition();
    
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [targetRef, show]);
  
  return (
    <div 
      className="fixed z-50 bg-white rounded-lg shadow-xl p-4 w-80"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <div className="flex justify-between items-center mb-2">
      
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <p className="text-gray-600 mb-4">{show.description}</p>
      <div className="flex justify-between">
        {show.step > 0 ? (
          <button
            onClick={onPrev}
            className="flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back
          </button>
        ) : <div></div>}
        <button
          onClick={onNext}
          className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors text-sm"
        >
          {show.isLast ? 'Finish' : 'Next'}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const TargetHighlight = ({ targetRef, color }) => {
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0
  });
  
  useEffect(() => {
    const updatePosition = () => {
      if (targetRef && targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        setPosition({
          top: rect.top - 5,
          left: rect.left - 5,
          width: rect.width + 10,
          height: rect.height + 10
        });
      }
    };
    
    updatePosition();
    
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [targetRef]);
  
  return (
    <div 
      className="fixed z-40 transition-all duration-300 ease-in-out"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
        height: `${position.height}px`,
        boxShadow: `0 0 0 9999px rgba(0, 0, 0, 0.6)`,
        border: `2px solid ${color === 'blue' ? '#3b82f6' : color === 'green' ? '#10b981' : '#8b5cf6'}`,
        borderRadius: '0.5rem',
        backgroundColor: `${color === 'blue' ? 'rgba(219, 234, 254, 0.3)' : color === 'green' ? 'rgba(209, 250, 229, 0.3)' : 'rgba(237, 233, 254, 0.3)'}`
      }}
    />
  );
};

export default Tour;

