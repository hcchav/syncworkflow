'use client';

import { useState, Fragment } from 'react';
import Link from 'next/link';
import '../../styles/casinowheel.css';

export default function CasinoWheelPage() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showPrize, setShowPrize] = useState(false);
  const [prize, setPrize] = useState('');
  
  // Define the wheel sectors
  const sectors = [
    { value: '$100 VISA'},
    { value: '$' },
    { value: '$500' },
    { value: '$300' },
    { value: '$500' },
    { value: '$800' },
    { value: '$550' },
    { value: '$400' },
    { value: '$300' },
    { value: '$900' },
    { value: '$500' },
    { value: '$300' },
    { value: '$900' },
    { value: 'Bankrupt', special: true },
    { value: '' },
    { value: '$400' },
    { value: '$300' },
    { value: 'Lose a turn', special: true },
    { value: '$800' },
    { value: '$350' },
    { value: '$450' },
    { value: '$700' },
    { value: '$300' },
    { value: '' }
  ];
  
  const spinWheel = () => {
    if (isSpinning) return;
    
    // Play spin sound
    const spinSound = new Audio('/sounds/casino-spin.mp3');
    spinSound.play().catch(e => console.log('Audio play error:', e));
    
    setIsSpinning(true);
    
    // Random sector selection (0-23)
    const randomSector = Math.floor(Math.random() * sectors.length);
    
    // Calculate the spin angle to land on the selected sector
    // We add multiple full rotations (5 * 360) plus the angle to the target sector
    // We need to rotate counterclockwise from the sector's position
    const targetAngle = 5 * 360 + (360 - (randomSector * (360 / sectors.length)));
    
    // Set the CSS variable for the spin animation
    document.documentElement.style.setProperty('--spin-angle', `${targetAngle}deg`);
    
    // Set the prize
    setPrize(sectors[randomSector].value);
    
    // Stop spinning after 5 seconds
    setTimeout(() => {
      setIsSpinning(false);
      
      // Play win sound
      const winSound = new Audio('/sounds/casino-win.mp3');
      winSound.play().catch(e => console.log('Audio play error:', e));
      
      // Show prize after wheel stops
      setTimeout(() => {
        setShowPrize(true);
      }, 500);
    }, 5000);
  };

  const spinAgain = () => {
    setShowPrize(false);
    // Don't reset the wheel position, just allow spinning again
    setTimeout(() => {
      spinWheel();
    }, 300);
  };
  
  // Function to determine font size class based on text length
  const getFontSizeClass = (text: string): string => {
    const length = text.replace('$', '').length;
    if (length > 6) return 'smallest-text';
    if (length > 5) return 'smaller-text';
    if (length > 4) return 'small-text';
    return '';
  };

  return (
    <div className="casino-page">
      <div className="casino-header">
        <h1 className="casino-title">CASINO WHEEL OF FORTUNE</h1>
        <p className="casino-subtitle">Try your luck and win big!</p>
      </div>
      
      <main>
        <div className="wheel-container">
          <div className="arrow"></div>
          
          <div className="wheel-wrapper">
           
            <div className={`wheel ${isSpinning ? 'spinning' : ''}`}>
              {sectors.map((sector, index) => (
                <div key={index} className="sector">
                  {sector.special ? (
                    <span>
                      {sector.value === 'Bankrupt' ? (
                        <>B<br/>a<br/>n<br/>k<br/>r<br/>u<br/>p<br/>t</>
                      ) : (
                        <><span>Lose a</span> t<br/>u<br/>r<br/>n</>
                      )}
                    </span>
                  ) : (
                    <span className={getFontSizeClass(sector.value)}>
                      <small>$</small><br/>
                      {sector.value.replace('$', '').split('').map((char, i) => (
                        <Fragment key={i}>
                          {char}<br/>
                        </Fragment>
                      ))}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="prize-legend">
            <h3>PRIZE LEGEND</h3>
            <div className="legend-grid">
              <div className="legend-item">
                <div className="legend-color" style={{ background: '#ff0000' }}></div>
                <div className="legend-name">$300</div>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ background: '#0000ff' }}></div>
                <div className="legend-name">$400</div>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ background: '#ffff00' }}></div>
                <div className="legend-name">$500</div>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ background: '#00ff00' }}></div>
                <div className="legend-name">$550-$900</div>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ background: '#ff00ff' }}></div>
                <div className="legend-name">$50 Gift Card</div>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ background: '#000000' }}></div>
                <div className="legend-name">Bankrupt</div>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ background: '#ffffff', border: '1px solid #000' }}></div>
                <div className="legend-name">Lose a Turn</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <button 
        onClick={spinWheel} 
        disabled={isSpinning}
        className="spin-button"
      >
        {isSpinning ? 'SPINNING...' : 'SPIN THE WHEEL'}
      </button>
      

      
      <Link href="/" className="back-link">
        ← Back to Main Page
      </Link>
      
      {showPrize && (
        <div className="prize-overlay">
          <div className="prize-card">
            <h2 className="prize-title">YOU LANDED ON</h2>
            <p className="prize-amount">{prize}</p>
            <button 
              onClick={spinAgain}
              className="prize-button"
            >
              SPIN AGAIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
