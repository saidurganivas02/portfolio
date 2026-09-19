import { Project, Experience, SkillCategory, MetricHighlight, Education, Certification } from '../types';

export const personalInfo = {
  name: "Kommireddy Sai Durga Nivas",
  role: "Full Stack Developer",
  tagline: "Building responsive web applications, robust REST APIs, and scalable MERN stack solutions.",
  location: "East Godavari, Andhra Pradesh, India",
  phone: "+91-6300697301",
  availability: "Available for Full-Time Roles",
  email: "saidurganivas02@gmail.com",
  github: "https://github.com/saidurganivas02?tab=repositories",
  linkedin: "https://www.linkedin.com/in/sai-durga-nivas-kommireddi-61bb0233b",
  twitter: "https://twitter.com",
  heroHeadline: "Engineering sleek, resilient full-stack web apps with modern craft.",
  heroHeadlineHighlight: "full-stack web apps",
  heroHeadlineFontSize: "medium" as 'small' | 'medium' | 'large' | 'xlarge',
  heroBio: "I am Kommireddy Sai Durga Nivas, a Full Stack Developer with production internship experience across MERN stack architectures, Python workflows, and RESTful API integrations.",
  terminalFileName: "sai-durga-nivas.config.ts",
  terminalStack: ["React", "Node.js", "MongoDB", "Python", "MySQL"],
  terminalComment: "// Ready to build robust, scalable applications",
  yearsOfExperience: "MCA Graduate • MERN Stack Specialist",
  bio: "MCA graduate with hands-on experience in Full Stack Development using React.js, Node.js, Express.js, Django, and database systems.\n\nExperienced in developing REST APIs, responsive web applications, secure user authentication, and seamless database integration. Completed MERN Stack and Web Development internships with proven experience working in Agile teams.\n\nPassionate about optimizing frontend performance by reducing unnecessary API calls and component re-renders, establishing clean API contracts, and writing maintainable code.",
  bioMatter: [
    "MCA graduate with hands-on experience in Full Stack Development using React.js, Node.js, Express.js, Django, and database systems.",
    "Experienced in developing REST APIs, responsive web applications, secure user authentication, and seamless database integration. Completed MERN Stack and Web Development internships with proven experience working in Agile teams.",
    "Passionate about optimizing frontend performance by reducing unnecessary API calls and component re-renders, establishing clean API contracts, and writing maintainable code."
  ]
};

export const heroMetrics: MetricHighlight[] = [
  { value: "8.1", label: "MCA CGPA", sublabel: "Aditya PG College, AKNU" },
  { value: "2", label: "Internships Completed", sublabel: "ADHOC Networks & Makers Mind" },
  { value: "5", label: "Certifications", sublabel: "Cisco, Oracle, Pearson & GenAI" },
  { value: "100%", label: "Responsive & Agile", sublabel: "Mobile & Desktop Optimized" },
];

export const educationData: Education[] = [
  {
    id: "edu-mca",
    degree: "Master of Computer Applications (MCA)",
    institution: "Aditya Degree & PG College, AKNU University",
    period: "2024 — 2026",
    cgpa: "CGPA: 8.1",
    details: "Advanced study in Full Stack Development, Distributed Systems, Software Engineering, and Database Management."
  },
  {
    id: "edu-bcs",
    degree: "Bachelors in Computer Science",
    institution: "Pragati Degree College, AKNU University",
    period: "2020 — 2024",
    cgpa: "CGPA: 6.2",
    details: "Core foundations in Data Structures, Algorithms, Web Technologies, Object-Oriented Programming, and DBMS."
  },
  {
    id: "edu-inter",
    degree: "Intermediate (MPC)",
    institution: "K.S.N Junior College",
    period: "2018 — 2020",
    cgpa: "CGPA: 6.2",
    details: "Mathematics, Physics, and Chemistry (MPC) with focus on logical reasoning and analytical problem solving."
  },
  {
    id: "edu-ssc",
    degree: "Secondary School Certificate (SSC)",
    institution: "Sri Vivekananda High School",
    period: "2017 — 2018",
    cgpa: "CGPA: 9.0",
    details: "Distinction in secondary school education with high academic achievement."
  }
];

export const certificationsData: Certification[] = [
  {
    id: "cert-1",
    title: "Generative AI for All",
    issuer: "Industry Program",
    iconType: "ai"
  },
  {
    id: "cert-2",
    title: "Cisco Python Essentials",
    issuer: "Cisco Networking Academy",
    iconType: "cisco"
  },
  {
    id: "cert-3",
    title: "Cisco C Essentials",
    issuer: "Cisco Networking Academy",
    iconType: "cisco"
  },
  {
    id: "cert-4",
    title: "Oracle Query Quest",
    issuer: "Oracle Academy / Database Systems",
    iconType: "oracle"
  },
  {
    id: "cert-5",
    title: "Mepro Pearson",
    issuer: "Pearson English Proficiency",
    iconType: "pearson"
  }
];

export const projectsData: Project[] = [
  {
    id: "mern-task-hub",
    title: "MERN Stack Agile Task & Project Portal",
    tagline: "Full-stack collaboration platform with JWT authentication and RESTful services",
    category: "Full-Stack",
    featured: true,
    description: "An end-to-end task and project management suite built with MongoDB, Express.js, React.js, and Node.js, featuring secure token authentication and optimized API calls.",
    longDescription: "Engineered during hands-on MERN stack development to provide seamless sprint tracking. Integrated REST APIs with Postman testing, implemented role-based protected routes, and reduced frontend re-renders using React hooks memoization and efficient state management.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Postman", "Tailwind CSS"],
    metrics: ["100% REST Coverage", "Zero Unnecessary Renders", "Secure JWT Auth"],
    githubUrl: "https://github.com/saidurganivas02?tab=repositories",
    liveUrl: "https://example.com"
  },
  {
    id: "django-portal",
    title: "Django & Python Data Explorer",
    tagline: "Scalable backend management with relational schema modeling",
    category: "Backend & API",
    featured: true,
    description: "A robust web application powered by Python and Django, handling complex relational queries, REST endpoints, and automated CRUD workflows.",
    longDescription: "Leverages Django's ORM and REST framework to interface with relational SQL databases. Features custom authentication, automated form validation, database migrations, and clean modular architecture.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Python", "Django", "MySQL", "REST APIs", "Postman", "HTML5", "CSS3"],
    metrics: ["Clean ORM Queries", "RESTful Endpoints", "Modular Architecture"],
    githubUrl: "https://github.com/saidurganivas02?tab=repositories",
    liveUrl: "https://example.com"
  },
  {
    id: "responsive-commerce",
    title: "Responsive Web Showcase & Catalog",
    tagline: "Cross-device responsive web application with Axios data fetching",
    category: "Frontend",
    featured: true,
    description: "Modern, responsive e-commerce web application compatible with desktop, tablet, and mobile devices with fast client-side rendering.",
    longDescription: "Developed with an emphasis on responsive web design principles using HTML5, CSS3, JavaScript, and React.js. Utilizes Axios for asynchronous REST data fetching, dynamic product filtering, and fluid viewport adaptation.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    technologies: ["React.js", "JavaScript", "HTML5", "CSS3", "Axios", "Responsive UI"],
    metrics: ["100% Mobile Ready", "Sub-100ms UI Latency", "Cross-Browser Verified"],
    githubUrl: "https://github.com/saidurganivas02?tab=repositories",
    liveUrl: "https://example.com"
  },
  {
    id: "sql-inventory-dbms",
    title: "Database Management & SQL Query System",
    tagline: "Relational data modeling, indexing, and transactional integrity",
    category: "Databases",
    featured: false,
    description: "A structured DBMS application demonstrating relational schema design, SQL query optimization, and transaction handling inspired by Oracle Query Quest.",
    longDescription: "Designed to handle normalized relational schemas with MySQL and MongoDB. Includes complex SQL joins, aggregations, query tuning, and index strategies to support high-throughput read/write operations.",
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80",
    technologies: ["SQL", "MySQL", "MongoDB", "DBMS", "Node.js", "Express.js"],
    metrics: ["Optimized Queries", "ACID Compliance", "Normalized Schema"],
    githubUrl: "https://github.com/saidurganivas02?tab=repositories",
    liveUrl: "https://example.com"
  }
];

export const experienceData: Experience[] = [
  {
    id: "exp-1",
    period: "May 2025 — July 2025",
    role: "MERN Stack Developer Intern",
    company: "ADHOC Networks",
    companyLocation: "India",
    summary: "Developed full-stack web applications and integrated REST APIs using the MERN stack while collaborating within Agile sprint cycles.",
    achievements: [
      "Developed full-stack features using MongoDB, Express.js, React.js, and Node.js.",
      "Created and integrated REST APIs with React applications using Postman for API testing and verification.",
      "Improved frontend performance by reducing unnecessary API calls and component re-renders.",
      "Worked in Agile sprints and collaborated with team members to develop, review, and debug application features."
    ],
    skills: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs", "Postman", "Agile / Scrum", "Performance Optimization"]
  },
  {
    id: "exp-2",
    period: "April 2023 — July 2023",
    role: "Web Development Intern",
    company: "Makers Mind Soft Solutions",
    companyLocation: "India",
    summary: "Engineered responsive, accessible client interfaces and web modules compatible with desktop and mobile form factors.",
    achievements: [
      "Developed responsive web pages using HTML, CSS, and modern JavaScript.",
      "Created web interfaces fully compatible with desktop, tablet, and mobile devices.",
      "Completed assigned feature modules on schedule within strict project timelines."
    ],
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Web Design", "Cross-Browser Compatibility", "Agile Timelines"]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend Development",
    description: "Building responsive, performant user interfaces with React and modern web standards",
    skills: [
      { name: "React.js & Hooks", iconName: "react", tag: "Library & SPA" },
      { name: "JavaScript (ES6+)", iconName: "javascript", tag: "Core Language" },
      { name: "HTML5 & CSS3", iconName: "html5", tag: "Markup & Styles" },
      { name: "Responsive UI & Layouts", iconName: "responsive", tag: "Cross-Device" },
      { name: "Axios & Fetch API", iconName: "axios", tag: "HTTP & REST" },
      { name: "Frontend Optimization", iconName: "optimization", tag: "Performance" }
    ]
  },
  {
    name: "Backend & REST APIs",
    description: "Developing robust server-side services, endpoints, and authentication",
    skills: [
      { name: "Node.js & Express.js", iconName: "nodejs", tag: "MERN Backend" },
      { name: "REST API Design & Integration", iconName: "restapi", tag: "Endpoints" },
      { name: "Django (Python)", iconName: "django", tag: "Framework" },
      { name: "User Authentication & JWT", iconName: "security", tag: "Auth & Security" },
      { name: "Postman API Testing", iconName: "postman", tag: "Verification" },
      { name: "Python Programming", iconName: "python", tag: "Core Language" }
    ]
  },
  {
    name: "Databases & Data Management",
    description: "Relational and NoSQL database modeling, querying, and optimization",
    skills: [
      { name: "MongoDB (MERN)", iconName: "mongodb", tag: "NoSQL Document" },
      { name: "MySQL", iconName: "mysql", tag: "Relational DB" },
      { name: "SQL Queries & Aggregations", iconName: "sql", tag: "DQL / DDL" },
      { name: "DBMS & Schema Design", iconName: "database", tag: "Data Modeling" },
      { name: "Database Integration", iconName: "database", tag: "CRUD Workflows" }
    ]
  },
  {
    name: "Tools, Languages & Methodologies",
    description: "Version control, development environments, and collaborative frameworks",
    skills: [
      { name: "Git & GitHub", iconName: "git", tag: "Version Control" },
      { name: "Agile & Scrum Practices", iconName: "agile", tag: "Sprint Cycles" },
      { name: "C Language Essentials", iconName: "c", tag: "Foundations" },
      { name: "Generative AI Foundations", iconName: "ai", tag: "GenAI Essentials" }
    ]
  }
];

export const workingPrinciples = [
  {
    title: "Full-Stack Synergy",
    description: "Harmonizing frontend components with backend REST endpoints and databases for end-to-end data integrity and smooth user flows."
  },
  {
    title: "Frontend Performance & Optimization",
    description: "Preventing unnecessary re-renders, optimizing hooks, and caching API responses to ensure fast, responsive interactions on all devices."
  },
  {
    title: "Rigorous API Testing",
    description: "Validating every REST endpoint with Postman and adhering to HTTP status standards before shipping to production."
  },
  {
    title: "Agile Collaboration",
    description: "Working effectively in sprints, communicating proactively with team members, and delivering high-quality modules within timelines."
  }
];
