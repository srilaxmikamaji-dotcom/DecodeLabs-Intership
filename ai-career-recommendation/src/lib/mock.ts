// Mock data for OpportunityRadar AI

export type Opportunity = {
  id: string;
  company: string;
  role: string;
  platform: string;
  type: "internship" | "hackathon" | "scholarship" | "research" | "job";
  matchScore: number;
  selectionProbability: number;
  interviewProbability: number;
  offerProbability: number;
  whyRecommended: string;
  requiredSkills: string[];
  missingSkills: string[];
  deadline: string; // ISO
  urgency: "high" | "medium" | "low";
  location: string;
  stipend?: string;
};

export const opportunities: Opportunity[] = [
  {
    id: "1",
    company: "Google",
    role: "STEP Internship 2026",
    platform: "Google Careers",
    type: "internship",
    matchScore: 92,
    selectionProbability: 78,
    interviewProbability: 64,
    offerProbability: 42,
    whyRecommended: "Strong CS foundation, DSA skills, and 2nd-year eligibility match perfectly.",
    requiredSkills: ["DSA", "Java", "Python", "OOP"],
    missingSkills: ["System Design"],
    deadline: new Date(Date.now() + 6 * 86400000).toISOString(),
    urgency: "high",
    location: "Bangalore, IN",
    stipend: "₹1.2L/mo",
  },
  {
    id: "2",
    company: "Microsoft",
    role: "Microsoft Explore Intern",
    platform: "Microsoft Careers",
    type: "internship",
    matchScore: 88,
    selectionProbability: 71,
    interviewProbability: 58,
    offerProbability: 38,
    whyRecommended: "Your portfolio shows the full-stack and PM-thinking they look for.",
    requiredSkills: ["C#", ".NET", "Problem Solving"],
    missingSkills: ["Azure"],
    deadline: new Date(Date.now() + 12 * 86400000).toISOString(),
    urgency: "medium",
    location: "Hyderabad, IN",
    stipend: "₹1.1L/mo",
  },
  {
    id: "3",
    company: "Amazon",
    role: "Applied Scientist ML Intern",
    platform: "Amazon Jobs",
    type: "internship",
    matchScore: 81,
    selectionProbability: 62,
    interviewProbability: 49,
    offerProbability: 28,
    whyRecommended: "ML coursework + Kaggle activity align with team needs.",
    requiredSkills: ["PyTorch", "Python", "ML Theory"],
    missingSkills: ["AWS Sagemaker", "Distributed Training"],
    deadline: new Date(Date.now() + 3 * 86400000).toISOString(),
    urgency: "high",
    location: "Remote",
    stipend: "$8K/mo",
  },
  {
    id: "4",
    company: "MeitY",
    role: "Smart India Hackathon 2025",
    platform: "SIH Portal",
    type: "hackathon",
    matchScore: 85,
    selectionProbability: 70,
    interviewProbability: 0,
    offerProbability: 0,
    whyRecommended: "Your team's full-stack + AI mix fits the AI/ML problem statements.",
    requiredSkills: ["React", "Node", "AI/ML"],
    missingSkills: [],
    deadline: new Date(Date.now() + 18 * 86400000).toISOString(),
    urgency: "medium",
    location: "Pan-India",
  },
  {
    id: "5",
    company: "Google",
    role: "Google Summer of Code 2026",
    platform: "GSoC",
    type: "internship",
    matchScore: 76,
    selectionProbability: 55,
    interviewProbability: 0,
    offerProbability: 0,
    whyRecommended: "Open-source PRs detected on your GitHub align with eligible orgs.",
    requiredSkills: ["Open Source", "Git", "Docs Writing"],
    missingSkills: ["Contributor Track Record"],
    deadline: new Date(Date.now() + 30 * 86400000).toISOString(),
    urgency: "low",
    location: "Remote",
    stipend: "$3K-$6.6K",
  },
  {
    id: "6",
    company: "Stanford AI Lab",
    role: "Undergrad Research Fellowship",
    platform: "Stanford",
    type: "research",
    matchScore: 68,
    selectionProbability: 41,
    interviewProbability: 30,
    offerProbability: 18,
    whyRecommended: "Recent paper interest in NLP matches lab's current focus area.",
    requiredSkills: ["Research", "PyTorch", "LaTeX"],
    missingSkills: ["Publications"],
    deadline: new Date(Date.now() + 22 * 86400000).toISOString(),
    urgency: "low",
    location: "Remote / Stanford",
  },
];

export const trendingRoles = [
  { name: "AI/ML Engineer", change: 31, demand: 920 },
  { name: "Frontend (React)", change: 24, demand: 1240 },
  { name: "Data Analyst", change: 18, demand: 780 },
  { name: "DevOps", change: 15, demand: 540 },
  { name: "Product Manager", change: 12, demand: 460 },
  { name: "Cloud Engineer", change: 22, demand: 690 },
];

export const trendSeries = Array.from({ length: 12 }).map((_, i) => ({
  month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  AI: 200 + Math.round(Math.sin(i / 2) * 80) + i * 30,
  React: 180 + Math.round(Math.cos(i / 2) * 60) + i * 22,
  Data: 120 + Math.round(Math.sin(i / 3) * 50) + i * 18,
}));

export const profileRadar = [
  { skill: "DSA", score: 78 },
  { skill: "Frontend", score: 85 },
  { skill: "Backend", score: 62 },
  { skill: "ML", score: 58 },
  { skill: "Cloud", score: 41 },
  { skill: "System Design", score: 36 },
];

export const notifications = [
  { id: "n1", title: "Google STEP closes in 6 days", kind: "deadline", time: "2m ago" },
  { id: "n2", title: "New: Stripe Frontend Intern matched at 89%", kind: "match", time: "14m ago" },
  { id: "n3", title: "AI/ML demand spiked +31% this week", kind: "trend", time: "1h ago" },
  { id: "n4", title: "Microsoft Explore deadline next week", kind: "deadline", time: "3h ago" },
  { id: "n5", title: "Recruiter viewed your profile on LinkedIn", kind: "recruiter", time: "1d ago" },
];

export const chatStarters = [
  "What should I apply to this week?",
  "How do I crack ML internships?",
  "What projects should I build?",
  "Which skills am I missing for Google STEP?",
  "Create a 4-week prep roadmap",
];

export const interviewQuestions = [
  "Walk me through a project where you optimized performance.",
  "Reverse a linked list in-place. Explain the time/space complexity.",
  "Design a URL shortener at high level.",
  "Tell me about a time you disagreed with a teammate.",
  "What's the difference between SQL and NoSQL? When would you pick each?",
];

export const roadmap = [
  { week: 1, title: "Arrays + Strings", tasks: ["Solve 30 array problems", "2 string problems daily", "Sliding window mastery"] },
  { week: 2, title: "Trees + Graphs", tasks: ["Binary trees + BST", "BFS/DFS templates", "Topological sort"] },
  { week: 3, title: "SQL + DBMS", tasks: ["Joins + window funcs", "Indexes + transactions", "Build mini analytics query set"] },
  { week: 4, title: "Capstone Project + Deploy", tasks: ["Ship full-stack project", "Write README + demo video", "Add to portfolio"] },
];

export const connectors = [
  { id: "linkedin", name: "LinkedIn Jobs", connected: true, autoSync: true },
  { id: "internshala", name: "Internshala", connected: true, autoSync: true },
  { id: "unstop", name: "Unstop", connected: true, autoSync: false },
  { id: "naukri", name: "Naukri", connected: false, autoSync: false },
  { id: "indeed", name: "Indeed", connected: true, autoSync: true },
  { id: "wellfound", name: "Wellfound", connected: false, autoSync: false },
  { id: "github", name: "GitHub Internships", connected: true, autoSync: true },
  { id: "careers", name: "Company Career Pages", connected: true, autoSync: true },
];

export const hunterFeed = [
  "→ Scanning LinkedIn... found 12 new postings",
  "✓ Matched Stripe Frontend Intern (89%)",
  "→ Scanning Internshala...",
  "✓ Matched Razorpay SDE Intern (84%)",
  "→ Scanning Unstop hackathons...",
  "⚡ URGENT: HackByte 3.0 closes in 48h",
  "→ Polling GitHub Internships repo...",
  "✓ Matched Vercel DX Intern (91%)",
  "→ Scanning research portals...",
  "✓ Matched Stanford NLP Fellowship",
];
