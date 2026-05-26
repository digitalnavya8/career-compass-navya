

import React, { useState } from 'react';
import { Download, Share2, ChevronRight, Award } from 'lucide-react';

const CareerWithNavya = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [responses, setResponses] = useState({
    academic: {},
    workingStyle: {},
    humanMotor: {},
    fifteenYear: {}
  });
  const [showResults, setShowResults] = useState(false);
  const [selectedView, setSelectedView] = useState('student'); // student/parent

  // Color palette - Navya's pastels
  const colors = {
    primary: '#A8D5BA',      // Soft sage green
    secondary: '#E8D5C4',    // Warm cream
    accent: '#B4C7E7',       // Soft blue
    accent2: '#D4C5F9',      // Soft lavender
    accent3: '#FFD4B4',      // Soft peach
    dark: '#2D3436',
    light: '#F5F7FA',
    danger: '#E17055',
    success: '#00B894'
  };

  const phases = [
    {
      title: 'Aptitude Foundation',
      icon: '📚',
      description: 'Understanding your natural strengths',
      questions: [
        {
          id: 'math_comfort',
          label: 'How would you describe your comfort level with mathematics?',
          type: 'mc',
          options: [
            'I find math intuitive and enjoy problem-solving with numbers',
            'I\'m okay with math but prefer subjects without heavy calculations',
            'I find math challenging and prefer working with concepts/language',
            'I avoid math-heavy subjects completely'
          ],
          category: 'Science',
          weight: 3
        },
        {
          id: 'science_interest',
          label: 'When thinking about science subjects, which excites you more?',
          type: 'mc',
          options: [
            'Understanding how machines, systems, and technology work (Physics/Chemistry)',
            'Understanding living organisms, biology, and how life works (Biology/Medicine)',
            'Both equally interest me',
            'Neither particularly interests me'
          ],
          category: 'Science',
          weight: 2,
          subcategory: 'pcm_vs_pcb'
        },
        {
          id: 'commerce_interest',
          label: 'When you think about commerce and business, what interests you?',
          type: 'mc',
          options: [
            'Understanding how companies make money and compete (Business Thinking)',
            'Managing money, budgets, and financial planning (Financial Thinking)',
            'Sales, negotiation, and persuading others (Commerce Skills)',
            'I haven\'t thought much about business/commerce yet',
            'None of these interest me in commerce'
          ],
          category: 'Commerce',
          weight: 2
        },
        { id: 'history', label: 'History & Social Studies', type: 'likert', category: 'Humanities' },
        { id: 'language', label: 'Languages & Literature', type: 'likert', category: 'Humanities' },
        { id: 'art', label: 'Art, Design & Creativity', type: 'likert', category: 'Humanities' }
      ]
    },
    {
      title: 'Working Style',
      icon: '⚙️',
      description: 'How do you naturally work?',
      questions: [
        { id: 'analytical', label: 'I break problems into components', type: 'likert', category: 'Science' },
        { id: 'systems', label: 'I see how everything connects', type: 'likert', category: 'Commerce' },
        { id: 'people', label: 'I focus on understanding people', type: 'likert', category: 'Humanities' },
        { id: 'data', label: 'I trust data and evidence', type: 'likert', category: 'Science' },
        { id: 'process', label: 'I optimize processes & workflows', type: 'likert', category: 'Commerce' },
        { id: 'stories', label: 'I communicate through stories', type: 'likert', category: 'Humanities' }
      ]
    },
    {
      title: 'Stream-Specific Skills',
      icon: '⚡',
      description: 'Which skills align with your stream choice?',
      questions: [
        { id: 'science_problem_solving', label: 'Scientific & Analytical Problem-Solving', type: 'likert', category: 'Science', weight: 1 },
        { id: 'science_lab_hands_on', label: 'Hands-on Lab Work & Experimentation', type: 'likert', category: 'Science', weight: 1 },
        { id: 'commerce_data_numbers', label: 'Working with Data & Numbers', type: 'likert', category: 'Commerce', weight: 1 },
        { id: 'commerce_business_thinking', label: 'Business Logic & Market Understanding', type: 'likert', category: 'Commerce', weight: 1 },
        { id: 'humanities_writing', label: 'Writing & Expression', type: 'likert', category: 'Humanities', weight: 1 },
        { id: 'humanities_critical_analysis', label: 'Critical Thinking & Analysis', type: 'likert', category: 'Humanities', weight: 1 }
      ]
    },
    {
      title: 'Practical Realities',
      icon: '🌍',
      description: 'Realistic expectations & career outcomes',
      questions: [
        { id: 'job_market', label: 'I understand job market prospects in my chosen stream', type: 'likert', category: 'general', weight: 1 },
        { id: 'further_study', label: 'I\'m prepared for higher education requirements', type: 'likert', category: 'general', weight: 1 },
        { id: 'competition', label: 'I can handle competitive entrance exams (JEE/NEET/other)', type: 'likert', category: 'general', weight: 1 },
        { id: 'skill_investment', label: 'I\'m willing to invest time in skill development beyond studies', type: 'likert', category: 'general', weight: 1 },
        { id: 'parent_alignment', label: 'My family supports my stream choice', type: 'likert', category: 'general', weight: 1 },
        { id: 'long_term_vision', label: 'I have a clear 5-10 year career vision', type: 'likert', category: 'general', weight: 1 }
      ]
    }
  ];

  const handleResponse = (phaseIndex, questionId, rating) => {
    const phaseKey = ['academic', 'workingStyle', 'humanMotor', 'fifteenYear'][phaseIndex];
    setResponses(prev => ({
      ...prev,
      [phaseKey]: {
        ...prev[phaseKey],
        [questionId]: rating
      }
    }));
  };

  const calculateScores = () => {
    const scores = { Science: 0, Commerce: 0, Humanities: 0 };

    const processQuestion = (q, responseValue, phaseIndex) => {
      if (!responseValue || !q.category) return 0;

      let scoreValue = responseValue;

      // Convert MC responses (A=4, B=3, C=2, D=1, E=0) to numeric scores
      if (q.type === 'mc') {
        const mcScores = { A: 4, B: 3, C: 2, D: 1, E: 0 };
        scoreValue = mcScores[responseValue] || 0;
      }

      // Apply weight multiplier (default 1x if not specified)
      const weight = q.weight || 1;
      return scoreValue * weight;
    };

    // Phase 1: Aptitude Foundation (with weights)
    phases[0].questions.forEach(q => {
      if (responses.academic[q.id]) {
        scores[q.category] += processQuestion(q, responses.academic[q.id], 0);
      }
    });

    // Phase 2: Working Style
    phases[1].questions.forEach(q => {
      if (responses.workingStyle[q.id]) {
        scores[q.category] += processQuestion(q, responses.workingStyle[q.id], 1);
      }
    });

    // Phase 3: Stream-Specific Skills
    phases[2].questions.forEach(q => {
      if (responses.humanMotor[q.id]) {
        scores[q.category] += processQuestion(q, responses.humanMotor[q.id], 2);
      }
    });

    // Phase 4: Practical Realities (boost all streams equally)
    phases[3].questions.forEach(q => {
      if (responses.fifteenYear[q.id]) {
        const scoreValue = responses.fifteenYear[q.id];
        const weight = q.weight || 1;
        const boostPerStream = (scoreValue * weight) / 3;
        scores.Science += boostPerStream;
        scores.Commerce += boostPerStream;
        scores.Humanities += boostPerStream;
      }
    });

    return { streamScores: scores, totalResponses: Object.keys(responses.academic).length };
  };

  const getStreamVerdicts = () => {
    const { streamScores } = calculateScores();
    const sorted = Object.entries(streamScores).sort((a, b) => b[1] - a[1]);

    return {
      recommended: sorted[0][0],
      alternatives: [sorted[1][0], sorted[2][0]],
      scores: streamScores
    };
  };

  const getEducationalContent = () => ({
    vennDiagram: (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3 style={{ color: colors.dark, fontSize: '16px', marginBottom: '15px' }}>
          Why Stream + Skills = Future-Proof
        </h3>
        <svg viewBox="0 0 300 250" style={{ maxWidth: '100%', height: 'auto' }}>
          {/* Three circles */}
          <circle cx="80" cy="120" r="60" fill={colors.primary} opacity="0.3" stroke={colors.primary} strokeWidth="2" />
          <circle cx="150" cy="120" r="60" fill={colors.accent} opacity="0.3" stroke={colors.accent} strokeWidth="2" />
          <circle cx="220" cy="120" r="60" fill={colors.accent2} opacity="0.3" stroke={colors.accent2} strokeWidth="2" />

          {/* Labels */}
          <text x="50" y="130" fontSize="12" fontWeight="bold" fill={colors.dark}>Stream</text>
          <text x="145" y="130" fontSize="12" fontWeight="bold" fill={colors.dark}>Skills</text>
          <text x="215" y="130" fontSize="12" fontWeight="bold" fill={colors.dark}>You</text>

          <text x="150" y="200" fontSize="13" fontWeight="bold" fill={colors.dark} textAnchor="middle">
            Future-Proof Career
          </text>
        </svg>
      </div>
    ),
    nep2020: (
      <div style={{ padding: '20px', backgroundColor: colors.light, borderRadius: '8px', marginTop: '15px' }}>
        <h4 style={{ color: colors.dark, marginBottom: '10px' }}>NEP 2020 - Interdisciplinary Minors Available</h4>
        <ul style={{ fontSize: '13px', lineHeight: '1.8', color: colors.dark, listStyle: 'none', padding: 0 }}>
          <li>✓ Science + Computer Science: AI/ML, Data Science</li>
          <li>✓ Commerce + Data Analytics: Business Intelligence</li>
          <li>✓ Humanities + Technology: Digital Communication, UX Design</li>
          <li>✓ Any Stream + Sustainability: Green Economics, CSR</li>
        </ul>
      </div>
    ),
    skillStacking: (
      <div style={{ padding: '20px', marginTop: '15px' }}>
        <h4 style={{ color: colors.dark, marginBottom: '10px' }}>Skill-Stacking: Stay Ahead of Automation</h4>
        <p style={{ fontSize: '13px', color: colors.dark, marginBottom: '10px' }}>
          Your stream alone is not future-proof. You need to stack complementary skills:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ backgroundColor: colors.primary, padding: '10px', borderRadius: '6px', fontSize: '12px' }}>
            <strong>Technical Layer:</strong> Data literacy, AI basics
          </div>
          <div style={{ backgroundColor: colors.accent, padding: '10px', borderRadius: '6px', fontSize: '12px' }}>
            <strong>Human Layer:</strong> Critical thinking, emotional intelligence
          </div>
        </div>
      </div>
    ),
    fifteenYearTimeline: (
      <div style={{ padding: '20px', marginTop: '15px' }}>
        <h4 style={{ color: colors.dark, marginBottom: '15px' }}>Your 15-Year Roadmap</h4>
        <div style={{ position: 'relative', paddingLeft: '30px' }}>
          {[
            { year: 'Year 1-2', milestone: 'Build foundation in your stream + first complementary skill' },
            { year: 'Year 3-5', milestone: 'Develop expertise + leadership experience' },
            { year: 'Year 6-10', milestone: 'Emerge as specialist-generalist (T-shaped professional)' },
            { year: 'Year 11-15', milestone: 'Lead innovation, mentor, shape industry standards' }
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '15px', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '-25px',
                top: '0',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: colors.primary
              }} />
              <strong style={{ color: colors.dark, fontSize: '13px' }}>{item.year}</strong>
              <p style={{ fontSize: '12px', color: colors.dark, margin: '3px 0' }}>{item.milestone}</p>
            </div>
          ))}
        </div>
      </div>
    )
  });

  const TProfile = ({ scores }) => (
    <div style={{
      marginTop: '30px',
      padding: '20px',
      backgroundColor: colors.light,
      borderRadius: '8px'
    }}>
      <h3 style={{ color: colors.dark, marginBottom: '20px' }}>Your T-Profile (Real-Time)</h3>
      <svg viewBox="0 0 400 300" style={{ width: '100%', height: 'auto' }}>
        {/* Horizontal bars (stream strength) */}
        {Object.entries(scores).map((entry, i) => {
          const barWidth = Math.min((entry[1] / 20) * 200, 200);
          const yPos = 50 + i * 70;
          return (
            <g key={i}>
              <text x="10" y={yPos + 8} fontSize="12" fontWeight="bold" fill={colors.dark}>
                {entry[0]}
              </text>
              <rect x="120" y={yPos - 10} width="200" height="20" fill="#E0E0E0" rx="4" />
              <rect
                x="120"
                y={yPos - 10}
                width={barWidth}
                height="20"
                fill={colors.primary}
                rx="4"
              />
              <text x={130 + barWidth/2} y={yPos + 5} fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">
                {entry[1].toFixed(1)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );

  const StreamStrengthsRings = ({ scores }) => (
    <div style={{ marginTop: '30px', padding: '20px', backgroundColor: colors.light, borderRadius: '8px' }}>
      <h3 style={{ color: colors.dark, marginBottom: '20px' }}>Your Stream Strengths Profile</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        {[
          { label: 'Science', score: scores.Science, color: colors.primary },
          { label: 'Commerce', score: scores.Commerce, color: colors.accent },
          { label: 'Humanities', score: scores.Humanities, color: colors.accent2 }
        ].map((stream, i) => {
          const maxScore = 100;
          const percentage = Math.min((stream.score / maxScore) * 100, 100);
          return (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto', marginBottom: '10px' }}>
                {/* Outer ring */}
                <svg viewBox="0 0 80 80" style={{ position: 'absolute', width: '100%', height: '100%' }}>
                  <circle cx="40" cy="40" r="35" fill="none" stroke="#E0E0E0" strokeWidth="8" />
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    fill="none"
                    stroke={stream.color}
                    strokeWidth="8"
                    strokeDasharray={`${(percentage / 100) * 220} 220`}
                    strokeLinecap="round"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                  />
                </svg>
                {/* Center badge */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center'
                }}>
                  <Award style={{ width: '24px', height: '24px', color: stream.color, margin: '0 auto' }} />
                </div>
              </div>
              <h4 style={{ fontSize: '12px', fontWeight: 'bold', color: colors.dark, margin: '10px 0 0 0' }}>
                {stream.label}
              </h4>
              <p style={{ fontSize: '11px', color: '#888', margin: '3px 0 0 0' }}>
                {percentage.toFixed(0)}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );

  const ResultsPage = ({ verdicts, parentView = false }) => {
    const content = getEducationalContent();

    if (parentView) {
      return (
        <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            backgroundColor: colors.primary,
            color: 'white',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h2 style={{ margin: '0 0 10px 0' }}>Parent Summary Report</h2>
            <p style={{ margin: 0, fontSize: '14px' }}>Assessment completed on {new Date().toLocaleDateString()}</p>
          </div>

          <div style={{ backgroundColor: colors.light, padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3 style={{ color: colors.dark, marginTop: 0 }}>Recommended Stream</h3>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: colors.primary, margin: '10px 0' }}>
              → {verdicts.recommended}
            </p>
            <p style={{ fontSize: '13px', color: colors.dark, margin: '10px 0' }}>
              Based on academic comfort, working style preference, and non-automatable skills.
            </p>
          </div>

          <div style={{ backgroundColor: colors.light, padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3 style={{ color: colors.dark, marginTop: 0 }}>What This Means</h3>
            <ul style={{ fontSize: '13px', color: colors.dark, lineHeight: '1.8' }}>
              <li>✓ Student shows natural aptitude in {verdicts.recommended}</li>
              <li>✓ Should focus on skill-stacking (technical + human skills)</li>
              <li>✓ Consider NEP 2020 interdisciplinary minors for future-proofing</li>
              <li>✓ 15-year trajectory: specialist → generalist → leader</li>
            </ul>
          </div>

          <div style={{ backgroundColor: colors.light, padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ color: colors.dark, marginTop: 0 }}>Next Steps</h3>
            <ol style={{ fontSize: '13px', color: colors.dark, lineHeight: '1.8' }}>
              <li>Discuss with school/career counselor</li>
              <li>Identify complementary skill courses</li>
              <li>Explore internships in recommended stream</li>
              <li>Re-assess annually to track growth</li>
            </ol>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{
          backgroundColor: colors.primary,
          color: 'white',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <h2 style={{ margin: '0 0 15px 0', fontSize: '28px' }}>Your Stream Verdict</h2>
          <p style={{ margin: '0', fontSize: '18px', fontWeight: 'bold' }}>
            🎯 {verdicts.recommended}
          </p>
          <p style={{ margin: '10px 0 0 0', fontSize: '13px', opacity: 0.9 }}>
            Based on your academic comfort, working style, and human strengths
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <div style={{ backgroundColor: colors.light, padding: '20px', borderRadius: '8px' }}>
            <h4 style={{ color: colors.dark, margin: '0 0 15px 0' }}>Why This Stream?</h4>
            <ul style={{ fontSize: '13px', color: colors.dark, lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
              <li>Natural alignment with your interests</li>
              <li>Strong performance in core subjects</li>
              <li>Your working style matches industry norms</li>
              <li>High human skill compatibility</li>
            </ul>
          </div>
          <div style={{ backgroundColor: colors.light, padding: '20px', borderRadius: '8px' }}>
            <h4 style={{ color: colors.dark, margin: '0 0 15px 0' }}>Your Alternatives</h4>
            <ul style={{ fontSize: '13px', color: colors.dark, lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
              <li>{verdicts.alternatives[0]} (secondary strength)</li>
              <li>{verdicts.alternatives[1]} (emerging potential)</li>
              <li>Consider double-majoring or minors</li>
            </ul>
          </div>
        </div>

        <TProfile scores={verdicts.scores} />
        <StreamStrengthsRings scores={verdicts.scores} />

        <div style={{ marginTop: '30px' }}>
          {content.vennDiagram}
          {content.nep2020}
          {content.skillStacking}
          {content.fifteenYearTimeline}
        </div>

        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: colors.accent2,
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h4 style={{ color: colors.dark, marginTop: 0 }}>🚀 Your Next Steps</h4>
          <ol style={{ fontSize: '13px', color: colors.dark, lineHeight: '1.8', textAlign: 'left', maxWidth: '600px', margin: '10px auto' }}>
            <li>Talk to your school counselor about stream choice</li>
            <li>Research colleges with strong programs in {verdicts.recommended}</li>
            <li>Start developing complementary skills NOW (coding, communication, data analysis)</li>
            <li>Shadow professionals or take internships</li>
            <li>Plan your 15-year skill-building roadmap</li>
          </ol>
        </div>
      </div>
    );
  };

  const renderPhaseContent = () => {
    if (showResults) {
      return (
        <div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
            <button
              onClick={() => setSelectedView('student')}
              style={{
                padding: '10px 20px',
                backgroundColor: selectedView === 'student' ? colors.primary : colors.light,
                color: selectedView === 'student' ? 'white' : colors.dark,
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 'bold'
              }}
            >
              My Results
            </button>
            <button
              onClick={() => setSelectedView('parent')}
              style={{
                padding: '10px 20px',
                backgroundColor: selectedView === 'parent' ? colors.accent : colors.light,
                color: selectedView === 'parent' ? 'white' : colors.dark,
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 'bold'
              }}
            >
              Parent Summary
            </button>
          </div>
          <ResultsPage verdicts={getStreamVerdicts()} parentView={selectedView === 'parent'} />
        </div>
      );
    }

    const phase = phases[currentPhase];
    const phaseKey = ['academic', 'workingStyle', 'humanMotor', 'fifteenYear'][currentPhase];

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '30px' }}>
          <span style={{ fontSize: '24px', marginRight: '10px' }}>{phase.icon}</span>
          <h2 style={{ display: 'inline', color: colors.dark, margin: 0 }}>
            {phase.title}
          </h2>
          <p style={{ color: '#666', marginTop: '10px', fontSize: '14px' }}>
            {phase.description}
          </p>
        </div>

        <div style={{ backgroundColor: colors.light, padding: '20px', borderRadius: '8px' }}>
          {phase.questions.map((q, i) => {
            const isMultipleChoice = q.type === 'mc';
            const options = isMultipleChoice ? q.options.map((_, idx) => String.fromCharCode(65 + idx)) : [1, 2, 3, 4, 5, 6];

            return (
              <div key={i} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: i < phase.questions.length - 1 ? `1px solid ${colors.primary}` : 'none' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: colors.dark, marginBottom: '10px' }}>
                  {q.label}
                </label>
                {isMultipleChoice && (
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px', fontStyle: 'italic' }}>
                    {q.options.map((opt, idx) => (
                      <div key={idx} style={{ marginBottom: '6px' }}>
                        <strong>{String.fromCharCode(65 + idx)})</strong> {opt}
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {options.map(option => (
                    <button
                      key={option}
                      onClick={() => handleResponse(currentPhase, q.id, option)}
                      style={{
                        width: isMultipleChoice ? '50px' : '40px',
                        height: '40px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: responses[phaseKey][q.id] === option ? colors.primary : '#E8E8E8',
                        color: responses[phaseKey][q.id] === option ? 'white' : colors.dark,
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontSize: isMultipleChoice ? '14px' : '12px'
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress indicator */}
        <div style={{ marginTop: '30px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
            {phases.map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: '4px',
                  backgroundColor: i <= currentPhase ? colors.primary : '#E0E0E0',
                  borderRadius: '2px'
                }}
              />
            ))}
          </div>
          <p style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
            Phase {currentPhase + 1} of {phases.length}
          </p>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '30px', justifyContent: 'space-between' }}>
          <button
            onClick={() => setCurrentPhase(Math.max(0, currentPhase - 1))}
            disabled={currentPhase === 0}
            style={{
              padding: '12px 20px',
              backgroundColor: currentPhase === 0 ? '#E0E0E0' : colors.light,
              color: colors.dark,
              border: 'none',
              borderRadius: '6px',
              cursor: currentPhase === 0 ? 'default' : 'pointer',
              fontSize: '13px',
              fontWeight: 'bold'
            }}
          >
            ← Back
          </button>
          {currentPhase < phases.length - 1 ? (
            <button
              onClick={() => setCurrentPhase(currentPhase + 1)}
              style={{
                padding: '12px 20px',
                backgroundColor: colors.primary,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => setShowResults(true)}
              style={{
                padding: '12px 20px',
                backgroundColor: colors.success,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 'bold'
              }}
            >
              See My Results
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      minHeight: '100vh',
      fontFamily: 'Inter, Poppins, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: colors.primary,
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        borderBottom: `3px solid ${colors.accent}`
      }}>
        <h1 style={{ margin: '0 0 5px 0', fontSize: '24px' }}>CareerWithNavya</h1>
        <p style={{ margin: 0, fontSize: '13px', opacity: 0.95 }}>
          Taking Stream Compass by Navya
        </p>
        <p style={{ margin: '8px 0 0 0', fontSize: '12px', opacity: 0.85 }}>
          Career Coaching Workshop | Navya
        </p>
      </header>

      {/* Main content */}
      <main style={{ padding: '30px 20px' }}>
        {renderPhaseContent()}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: colors.light,
        padding: '20px',
        textAlign: 'center',
        borderTop: `1px solid ${colors.secondary}`,
        fontSize: '12px',
        color: '#666',
        marginTop: '40px'
      }}>
        <p style={{ margin: '0 0 10px 0' }}>
          Designed by Navya | Career Compass Workshop
        </p>
        {showResults && (
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={() => window.print()}
              style={{
                padding: '8px 12px',
                backgroundColor: colors.secondary,
                color: colors.dark,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Download size={14} /> Download PDF
            </button>
            <button
              onClick={() => alert('Share link: ' + window.location.href)}
              style={{
                padding: '8px 12px',
                backgroundColor: colors.accent,
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Share2 size={14} /> Share
            </button>
          </div>
        )}
      </footer>
    </div>
  );
};

export default CareerWithNavya;
