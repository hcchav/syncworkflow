import React from 'react';
import '../styles/monitormockup.css';

interface MonitorMockupProps {
  children: React.ReactNode;
  orientation: 'landscape' | 'portrait';
  title?: string;
}

const MonitorMockup: React.FC<MonitorMockupProps> = ({ 
  children, 
  orientation = 'landscape',
  title = 'Monitor Preview'
}) => {
  return (
    <div className={`monitor-mockup ${orientation}`}>
      <div className="monitor-frame">
        <div className="monitor-screen">
          <div className="monitor-content">
            {children}
          </div>
        </div>
        <div className="monitor-stand"></div>
        <div className="monitor-base"></div>
      </div>
      <div className="mockup-title">{title}</div>
    </div>
  );
};

export default MonitorMockup;
