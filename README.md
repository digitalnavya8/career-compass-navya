# CareerWithNavya - Stream Compass Assessment Tool

**By Navya | Career Coaching Workshop**

A beautiful, interactive assessment tool that helps high school & college students discover their ideal academic stream (Science/Commerce/Humanities) and build future-proof skills.

---

## 🎯 What This Tool Does

### For Students:
- ✅ **4-Phase Assessment** (18-26 minutes)
  - Phase 1: Academic Comfort (which subjects energize you?)
  - Phase 2: Working Style (how do you naturally work?)
  - Phase 3: Human Moat (non-automatable skills you possess)
  - Phase 4: 15-Year Reality Check (what matters to you long-term?)

- ✅ **Real-Time T-Profile** (updates as you answer)
  - Horizontal bar: Stream strength (Science/Commerce/Humanities)
  - Vertical bar: Skill gaps in each stream

- ✅ **Results Dashboard**
  - Stream verdict + alternatives
  - Skill badges with progress rings (Empathy, Communication, Systems Thinking)
  - Educational diagrams (Venn diagram, NEP 2020 minors, skill-stacking, 15-year roadmap)

- ✅ **Share & Download**
  - Get a unique link to revisit/share with counselors
  - Download as PDF for records
  - Return anytime to re-assess

### For Parents:
- Simplified summary view (key findings only)
- Understand what stream means for their child
- Clear action steps for next conversation

---

## 🎨 Design Features

- **Pastel Color Palette**: Soft sage green, cream, lavender, sky blue (calming, professional)
- **Premium Typography**: Clean, modern (Inter, Poppins fonts)
- **Real-Time Interactivity**: T-Profile updates as they answer
- **Skill Badges**: Progress rings showing empathy, communication, systems thinking
- **Educational Diagrams**: 
  - Why Stream + Skills = Future-Proof (Venn diagram)
  - NEP 2020 interdisciplinary minors
  - Skill-stacking visual (technical + human layer)
  - 15-year career roadmap
- **Multi-Stakeholder Views**: Student vs Parent summary
- **Persistent Artifact**: Hybrid view (summary by default, full interactive on demand)

---

## 📁 Project Structure

```
career-compass-navya/
├── package.json                    # Dependencies
├── public/
│   └── index.html                  # Main HTML file
├── src/
│   ├── index.js                    # React entry point
│   └── App.jsx                     # Main component (CareerWithNavya)
├── README.md                       # This file
└── .gitignore                      # Git ignore file
```

---

## 🚀 Quick Start (3 Steps)

### Step 1: Clone or Create Repository
```bash
# Option A: Clone if you have GitHub
git clone https://github.com/YOUR_USERNAME/career-compass-navya.git
cd career-compass-navya

# Option B: Create new
mkdir career-compass-navya
cd career-compass-navya
git init
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run Locally
```bash
npm start
```
- Opens automatically at http://localhost:3000
- Live reload as you make changes

---

## 📦 Deployment Options

### Option 1: Vercel (Recommended - Easiest)
```bash
npm install -g vercel
vercel login
vercel
```
**Result:** Live URL like `https://career-compass-navya.vercel.app/`

### Option 2: Netlify
```bash
npm run build
# Then drag & drop 'build' folder to https://app.netlify.com/drop
```
**Result:** Live URL like `https://career-compass-navya.netlify.app/`

### Option 3: GitHub Pages
```bash
npm run build
# Push to GitHub, enable Pages in Settings
```
**Result:** Live URL like `https://YOUR_USERNAME.github.io/career-compass-navya/`

**See `GITHUB_SETUP_&_DEPLOYMENT_GUIDE.md` for detailed instructions**

---

## 🎮 How It Works

1. **Student Opens Link** → CareerWithNavya tool loads
2. **4-Phase Assessment** → Real-time T-Profile updates as they answer
3. **Results Dashboard** → 
   - Recommended stream verdict
   - Alternative streams
   - Skill badges + progress rings
   - Educational diagrams
   - Next steps
4. **Multi-Views** → Toggle between "My Results" and "Parent Summary"
5. **Share & Download** → Get unique URL, download PDF
6. **Return Later** → Same link, see updated results

---

## 🛠️ Customization

### Change Colors
In `src/App.jsx` (line ~30):
```javascript
const colors = {
  primary: '#A8D5BA',      // Sage green
  secondary: '#E8D5C4',    // Cream
  accent: '#B4C7E7',       // Sky blue
  accent2: '#D4C5F9',      // Lavender
  accent3: '#FFD4B4',      // Peach
  // ...
};
```

### Add/Edit Questions
In `src/App.jsx`, find the `phases` array and modify questions per phase:
```javascript
const phases = [
  {
    title: 'Academic Comfort',
    questions: [
      { id: 'math', label: 'Mathematics & Logic', category: 'Science' },
      // Add your questions here
    ]
  }
];
```

### Update Educational Content
Find `getEducationalContent()` function and update diagrams/explanations.

### Change Tool Name/Branding
In the Header section:
```javascript
<h1>CareerWithNavya</h1>
<p>Taking Stream Compass by Navya</p>
```

---

## 📊 Data & Privacy

- **No Backend Database**: All data stored locally in student's browser
- **No Tracking**: No cookies, analytics, or user tracking
- **No Cloud Upload**: Responses never leave student's device
- **PDF Download**: Students own their results
- **Shareable Link**: Uses URL parameters (optional persistence layer can be added later)

---

## 🔧 Technical Stack

- **Frontend**: React 18
- **Charts**: Recharts (for T-Profile, heatmaps, radars)
- **Icons**: Lucide React
- **Styling**: Inline CSS (no CSS files, everything self-contained)
- **Deployment**: Vercel, Netlify, or GitHub Pages (all free)

---

## 📱 Responsive Design

- ✅ Mobile-friendly (works on phones, tablets, laptops)
- ✅ Touch-optimized buttons (6-rating scale is finger-friendly)
- ✅ Readable on small screens
- ✅ Print-friendly for PDF export

---

## 🎓 NEP 2020 Integration

Tool recommends interdisciplinary minors per stream:
- **Science + CS**: AI/ML, Data Science
- **Commerce + Data**: Business Intelligence
- **Humanities + Tech**: Digital Communication, UX Design
- **Any Stream + Sustainability**: Green Economics, CSR

---

## 📈 Future Enhancements (Optional)

- [ ] Backend database to store results over time
- [ ] Email PDF results directly
- [ ] Comparison with industry salary trends
- [ ] Chatbot for Q&A
- [ ] Integration with college databases
- [ ] Multi-language support
- [ ] Animated diagrams
- [ ] Progress tracking dashboard for counselors

---

## 💡 Tips for Using This Tool

### For Workshops:
1. Project the tool on a screen
2. Let students answer together (20 mins)
3. Discuss results as a group
4. Send them the link to retake at home

### For One-on-One Coaching:
1. Have student take the assessment
2. Review their T-Profile together
3. Discuss skill-stacking needs
4. Plan 15-year roadmap

### For Schools:
1. Share link in LMS (Google Classroom, etc.)
2. Have students complete as homework
3. Counselors review results in their office
4. Parents view "Parent Summary" view

---

## 📝 License

This tool is created by Navya for educational purposes. Feel free to customize and share within your network.

---

## 🤝 Support & Feedback

- **Issues?** Check the troubleshooting section in `GITHUB_SETUP_&_DEPLOYMENT_GUIDE.md`
- **Want to modify?** Edit `src/App.jsx` and redeploy
- **Need help?** Refer to React docs: https://react.dev/

---

## 🎯 Your Deployment Checklist

- [ ] All files created (App.jsx, package.json, index.html, index.js)
- [ ] GitHub repository created & files pushed
- [ ] Dependencies installed (`npm install`)
- [ ] Tested locally (`npm start`)
- [ ] Deployed to Vercel/Netlify/GitHub Pages
- [ ] Got a live URL
- [ ] Tested the live URL
- [ ] Shared with students/parents
- [ ] Collected feedback

---

**Made with ❤️ by Navya**

Career Compass Workshop | Stream Suitability Assessment Tool

*Helping students make informed decisions about their academic future.*
