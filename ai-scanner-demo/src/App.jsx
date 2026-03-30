import { useState, useEffect } from 'react';
import { Activity, Search, ShieldCheck, Cpu, GitMerge } from 'lucide-react';
import './App.css';

const MOCK_LOGS = [
  "Initializing AI Readiness protocols...",
  "Parsing Document Object Model...",
  "Analyzing semantic HTML structures...",
  "Checking for repetitive data patterns...",
  "Evaluating NLP generation targets...",
  "Scanning for manual workflow bottlenecks...",
  "Calculating potential Vector DB targets...",
  "Cross-referencing industry automation benchmarks...",
  "Projecting LLM deployment cost savings...",
  "Compiling optimization dashboard..."
];

const RECOMMENDATIONS = [
  {
    title: "Automated Customer Support",
    description: "Deploy a smart AI assistant that can automatically answer over 60% of common customer questions instantly.",
    icon: <Cpu size={24} strokeWidth={1.5} />
  },
  {
    title: "Instant Internal Search",
    description: "Connect your company's documents to an AI, allowing your team to instantly find precise answers instead of digging through files.",
    icon: <GitMerge size={24} strokeWidth={1.5} />
  },
  {
    title: "AI Safety & Accuracy Check",
    description: "Set up strict testing filters to ensure your AI never invents facts, leaks private data, or says the wrong thing to a customer.",
    icon: <ShieldCheck size={24} strokeWidth={1.5} />
  }
];

function App() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('idle'); // idle, scanning, complete
  const [progress, setProgress] = useState(0);
  const [currentLogs, setCurrentLogs] = useState([]);
  const [score, setScore] = useState(0);

  const startScan = (e) => {
    e.preventDefault();
    if (!url) return;
    setStatus('scanning');
    setProgress(0);
    setCurrentLogs([]);
  };

  useEffect(() => {
    if (status === 'scanning') {
      let currentProgress = 0;
      let logIndex = 0;
      
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 5) + 2;
        if (currentProgress > 100) currentProgress = 100;
        
        setProgress(currentProgress);

        // Add logs roughly based on progress
        const targetLogIndex = Math.floor((currentProgress / 100) * MOCK_LOGS.length);
        if (targetLogIndex > logIndex && logIndex < MOCK_LOGS.length) {
          setCurrentLogs(prev => {
            const newLogs = [...prev, MOCK_LOGS[logIndex]];
            // Keep only the last 5 logs visible to simulate scrolling
            return newLogs.slice(-5);
          });
          logIndex++;
        }

        if (currentProgress === 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Generate random score between 68 and 92
            setScore(Math.floor(Math.random() * 25) + 68);
            setStatus('complete');
          }, 800);
        }
      }, 150);

      return () => clearInterval(interval);
    }
  }, [status]);

  // Safely extract hostname for display
  const getHostname = () => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  return (
    <div className="app-container">
      <div className="scanner-card glass">
        
        {status === 'idle' && (
          <div className="header">
            <h1 className="title">
              Is your workflow <span className="gradient-text">AI Ready?</span>
            </h1>
            <p className="subtitle">Enter your website URL to instantly scan for high-ROI automation opportunities.</p>
            
            <form onSubmit={startScan} className="input-container" style={{ marginTop: '3rem' }}>
              <Search className="search-icon" style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={20} />
              <input 
                type="url" 
                className="url-input" 
                placeholder="https://yourcompany.com" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                style={{ paddingLeft: '4rem' }}
              />
              <button type="submit" className="btn btn-primary">
                Run Scanner
              </button>
            </form>
          </div>
        )}

        {status === 'scanning' && (
          <div className="terminal">
            <div className="terminal-header">
              <Activity className="loading-spinner" />
              <div className="terminal-status">Running Diagnostics...</div>
            </div>
            
            <div className="terminal-logs" style={{ bottom: '4rem' }}>
              {currentLogs.map((log, i) => (
                <div key={i} className={`log-line ${i === currentLogs.length - 1 ? 'active' : ''}`}>
                  <span className="timestamp">[{new Date().toISOString().substring(11, 23)}]</span>
                  {log}
                </div>
              ))}
            </div>

            <div className="progress-container" style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', marginTop: 0 }}>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="progress-text">
                <span>Analyzing {getHostname()}</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>
        )}

        {status === 'complete' && (
          <div className="dashboard">
             <div className="header" style={{ marginBottom: '2rem' }}>
                <h2 className="title" style={{ fontSize: '2rem' }}>Analysis <span className="gradient-text">Complete</span></h2>
                <p className="subtitle" style={{ fontSize: '1rem', fontFamily: 'var(--font-mono)' }}>Target: {getHostname()}</p>
             </div>

             <div className="score-container">
               <div className="score-ring">{score}<span style={{fontSize: '1.5rem', color: 'var(--text-secondary)'}}>%</span></div>
               <div className="score-label">Automation Potential</div>
             </div>

             <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', color: 'var(--text-primary)' }}>Identified Opportunities</h3>
             <div className="recommendation-grid">
               {RECOMMENDATIONS.map((rec, i) => (
                 <div key={i} className="rec-card">
                   <div className="rec-icon">{rec.icon}</div>
                   <div className="rec-content">
                     <h3>{rec.title}</h3>
                     <p>{rec.description}</p>
                   </div>
                 </div>
               ))}
             </div>

             <div className="actions">
                <button className="btn btn-secondary" onClick={() => { setStatus('idle'); setUrl(''); }}>Scan Another</button>
                <a href="https://precisionqaconsulting.com/#contact" target="_blank" rel="noreferrer" className="btn btn-primary">Book Implementation Strategy</a>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
