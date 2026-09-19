import React from 'react';

interface IconProps {
  className?: string;
}

// Official React Atom Logo
export const ReactIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none">
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

// Official JavaScript Logo (Yellow Square with JS)
export const JavaScriptIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 105 105" className={className}>
    <rect width="105" height="105" rx="14" fill="#F7DF1E" />
    <path
      d="M29.5 83.5c3.2 5.2 7.4 8.7 15.3 8.7 8.3 0 13.6-4.1 13.6-14.3V38h-11.2v39.8c0 4.5-1.9 6.4-5.3 6.4-3 0-4.6-1.7-6.2-4.5l-6.2 3.8zm45.8-1c4 6.8 9.9 9.8 19.3 9.8 8.4 0 14.8-4.1 14.8-12 0-7.2-4.8-10.4-13.4-14.1l-4.6-2c-6.1-2.6-8.8-4.7-8.8-9.1 0-3.9 3.1-6.8 8.1-6.8 4.7 0 7.8 2 10.3 6.4l8.8-5.6C85.5 31.9 80 29.5 72.8 29.5c-11.7 0-19.1 7.4-19.1 17.5 0 8.1 4.9 12.3 14.3 16.3l4.6 2c7.2 3.1 9.9 5.5 9.9 10.1 0 4.8-4.2 7.4-9.8 7.4-7.5 0-11.8-4.2-14.7-9.5l-8.7 5.2z"
      fill="#000000"
    />
  </svg>
);

// Official HTML5 Logo
export const HTML5Icon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 512 512" className={className}>
    <path fill="#E34F26" d="M71 460L30 0h452l-41 460-185 52z" />
    <path fill="#EF652A" d="M256 472l149-41 35-391H256v432z" />
    <path fill="#EBEBEB" d="M256 208H164l-7-78h99V52H85l21 234h150zm0 162l-77-21-5-57H96l9 108 151 42z" />
    <path fill="#FFFFFF" d="M256 208v78h70l-7 74-63 17v78l114-31 17-186H256zm0-156v78h138l7-78H256z" />
  </svg>
);

// Official CSS3 Logo
export const CSS3Icon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 512 512" className={className}>
    <path fill="#1572B6" d="M71 460L30 0h452l-41 460-185 52z" />
    <path fill="#33A9DC" d="M256 472l149-41 35-391H256v432z" />
    <path fill="#EBEBEB" d="M256 208H164l-7-78h99V52H85l21 234h150zm0 162l-77-21-5-57H96l9 108 151 42z" />
    <path fill="#FFFFFF" d="M256 208v78h70l-7 74-63 17v78l114-31 17-186H256zm0-156v78h138l7-78H256z" />
  </svg>
);

// Official Node.js Logo
export const NodeIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 256 288" className={className}>
    <path
      fill="#5FA04E"
      d="M128 0L243.5 66.7v133.4L128 266.8 12.5 200.1V66.7L128 0z"
    />
    <path
      fill="#333333"
      d="M128 28.5l98.5 56.9v113.8L128 256.1l-98.5-56.9V85.4L128 28.5z"
    />
    <path
      fill="#FFFFFF"
      d="M128 54.3l74.2 42.8v85.7L128 225.6l-74.2-42.8V97.1L128 54.3z"
    />
    <path
      fill="#5FA04E"
      d="M128 78l53.7 31v62L128 202l-53.7-31v-62L128 78z"
    />
  </svg>
);

// Official Express.js Logo
export const ExpressIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect width="24" height="24" rx="5" fill="#1e293b" />
    <text
      x="12"
      y="16"
      textAnchor="middle"
      fill="#38bdf8"
      fontSize="11"
      fontWeight="900"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      ex
    </text>
  </svg>
);

// Official Python Logo
export const PythonIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 110 110" className={className}>
    <path
      fill="#3776AB"
      d="M54.5 5.5c-24.8 0-23.2 10.8-23.2 10.8l.1 11.2h23.7v3.4H21.5C9.7 30.9 0 37.8 0 54.6c0 19.3 8.3 22.8 19.3 22.8h11.5V67.8c0-13.6 11.3-13.4 11.3-13.4h23.5c10.4 0 15.6-7.8 15.6-15.6V19.4c0-8.9-8.4-13.9-26.7-13.9zm-13.2 7.3c2.3 0 4.1 1.9 4.1 4.1s-1.9 4.1-4.1 4.1-4.1-1.9-4.1-4.1 1.8-4.1 4.1-4.1z"
    />
    <path
      fill="#FFD43B"
      d="M55.5 104.5c24.8 0 23.2-10.8 23.2-10.8l-.1-11.2H54.9v-3.4h33.6c11.8 0 21.5-6.9 21.5-23.7 0-19.3-8.3-22.8-19.3-22.8H79.2v9.6c0 13.6-11.3 13.4-11.3 13.4H44.4c-10.4 0-15.6 7.8-15.6 15.6v19.4c0 8.9 8.4 13.9 26.7 13.9zm13.2-7.3c-2.3 0-4.1-1.9-4.1-4.1s1.9-4.1 4.1-4.1 4.1 1.9 4.1 4.1-1.8 4.1-4.1 4.1z"
    />
  </svg>
);

// Official Django Logo
export const DjangoIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <rect width="100" height="100" rx="16" fill="#092E20" />
    <path
      fill="#44B78B"
      d="M52 28h13v34c0 9.2-4.2 13-13 13-3.6 0-7.3-.8-9.8-2l2.6-9.6c1.6.8 3.5 1.2 5.5 1.2 4.2 0 6.2-2.1 6.2-6.6V40h-4.5v-12zm-22 9.5h11.5v36.5H30v-36.5zm5.8-13.5c3.8 0 6.8 2.8 6.8 6.5 0 3.6-3 6.5-6.8 6.5-3.7 0-6.8-2.9-6.8-6.5 0-3.7 3.1-6.5 6.8-6.5z"
    />
  </svg>
);

// Official MongoDB Leaf Logo
export const MongoDBIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path
      d="M11.996 0C11.996 0 5.4 7.427 5.4 13.385C5.4 18.066 8.547 21.6 12 24C15.453 21.6 18.6 18.066 18.6 13.385C18.6 7.427 11.996 0 11.996 0Z"
      fill="#47A248"
    />
    <path
      d="M12 0V23.95C12 23.95 18.6 18.04 18.6 13.385C18.6 7.427 12 0 12 0Z"
      fill="#499D4A"
    />
    <path
      d="M11.998 23.972C11.664 23.738 5.4 18.066 5.4 13.385C5.4 7.427 11.998 0 11.998 0V23.972Z"
      fill="#3FA037"
    />
    <path
      d="M12.001 22.95V1.2C12.001 1.2 12.33 1.5 12.44 1.7C14.74 5.38 17.5 10.42 17.5 13.5C17.5 17.65 14.85 21.32 12.001 22.95Z"
      fill="#13AA52"
    />
  </svg>
);

// Official MySQL Dolphin Logo
export const MySQLIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <rect width="64" height="64" rx="12" fill="#00758F" />
    <path
      d="M48 38c-2.4 0-4.8-1.5-6-3.8-2.2 2.4-5.3 3.8-8.8 3.8-4.5 0-8.4-2.4-10.4-6-1.5 1.5-3.6 2.4-6 2.4-4.4 0-8-3.6-8-8s3.6-8 8-8c2.4 0 4.5.9 6 2.4 2-3.6 5.9-6 10.4-6 3.5 0 6.6 1.4 8.8 3.8 1.2-2.3 3.6-3.8 6-3.8 4 0 7.2 3.2 7.2 7.2 0 1.2-.3 2.3-.8 3.2 1.9 1.8 3.2 4.3 3.2 7.2 0 4.8-4.3 9.6-9.6 9.6z"
      fill="#F29111"
    />
    <circle cx="26" cy="28" r="2.5" fill="#FFFFFF" />
    <circle cx="38" cy="28" r="2.5" fill="#FFFFFF" />
  </svg>
);

// Official Git Logo
export const GitIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 128 128" className={className}>
    <path
      fill="#F05032"
      d="M125.6 55.4L72.6 2.4c-3.2-3.2-8.4-3.2-11.6 0L46.8 16.6l14.7 14.7c3.4-1.2 7.4-.4 10.1 2.3 2.7 2.7 3.5 6.7 2.3 10.1l14.2 14.2c3.4-1.2 7.4-.4 10.1 2.3 3.9 3.9 3.9 10.2 0 14.1s-10.2 3.9-14.1 0c-2.8-2.8-3.5-6.9-2.2-10.4L68.2 49.9v35.3c1.2.6 2.3 1.4 3.2 2.3 3.9 3.9 3.9 10.2 0 14.1s-10.2 3.9-14.1 0c-3.9-3.9-3.9-10.2 0-14.1 1.2-1.2 2.7-2.1 4.3-2.6V48.5c-1.6-.5-3.1-1.4-4.3-2.6-2.8-2.8-3.6-7-2.1-10.5L34.8 20.8 2.4 53.2c-3.2 3.2-3.2 8.4 0 11.6l53 53c3.2 3.2 8.4 3.2 11.6 0l58.6-58.6c3.2-3.2 3.2-8.4 0-11.6z"
    />
  </svg>
);

// Official GitHub Logo
export const GitHubIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

// Official Postman Logo
export const PostmanIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 128 128" className={className}>
    <circle cx="64" cy="64" r="64" fill="#FF6C37" />
    <path
      fill="#FFFFFF"
      d="M74.8 28.5l-4.4 7.6 15 8.7 4.4-7.6-15-8.7zm-20.2 12.8l-18.9 33 8.7 5 18.9-33-8.7-5zm36.3 7.8L51.4 77.8l6.8 3.9 39.5-28.7-6.8-3.9zm-46 38.6l-5.3 9.2 11.2 6.4 5.3-9.2-11.2-6.4zm23.8-3.3l-8.4 14.5 9.7 5.6 8.4-14.5-9.7-5.6z"
    />
  </svg>
);

// Official C Programming Language Logo
export const CIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 128 128" className={className}>
    <path
      fill="#A8B9CC"
      d="M115.4 30.7L66.7 2.6c-1.6-.9-3.7-.9-5.3 0L12.6 30.7c-1.6.9-2.6 2.7-2.6 4.5v56.6c0 1.9 1 3.6 2.6 4.5l48.8 28.1c.8.5 1.7.7 2.7.7s1.8-.2 2.7-.7l48.8-28.1c1.6-.9 2.6-2.7 2.6-4.5V35.2c-.2-1.8-1.2-3.6-2.8-4.5z"
    />
    <path
      fill="#283593"
      d="M64 21.6c-23.4 0-42.4 19-42.4 42.4S40.6 106.4 64 106.4c17.1 0 31.8-10.1 38.4-24.6l-16.7-8.1c-4 8.7-12.2 14.5-21.7 14.5-13.4 0-24.2-10.9-24.2-24.2 0-13.4 10.9-24.2 24.2-24.2 9.4 0 17.7 5.8 21.7 14.5l16.7-8.1C95.8 31.7 81.1 21.6 64 21.6z"
    />
    <path
      fill="#5C6BC0"
      d="M93.3 54.5l-10.6 5.1c-1.9-4.1-5.1-7.4-9.2-9.5l5.2-10.6c6.2 3.1 11.2 8.3 14.6 15z"
    />
  </svg>
);

// REST API / Endpoints Symbol
export const RestApiIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect width="24" height="24" rx="6" fill="#0284c7" />
    <path
      d="M6 12h3m6 0h3m-9-4h6a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4a2 2 0 012-2z"
      stroke="#ffffff"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="6" cy="12" r="1.5" fill="#ffffff" />
    <circle cx="18" cy="12" r="1.5" fill="#ffffff" />
  </svg>
);

// SQL / Relational DBMS Symbol
export const SqlDatabaseIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect width="24" height="24" rx="6" fill="#0369a1" />
    <ellipse cx="12" cy="7" rx="6" ry="2.5" stroke="#ffffff" strokeWidth="1.6" />
    <path d="M6 7v5c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5V7" stroke="#ffffff" strokeWidth="1.6" />
    <path d="M6 12v5c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5v-5" stroke="#ffffff" strokeWidth="1.6" />
  </svg>
);

// Axios / Fetch API Symbol
export const AxiosIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect width="24" height="24" rx="6" fill="#5A29E4" />
    <path
      d="M7 15l5-6 5 6M9.5 12h5"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Responsive UI / Mobile Layouts Symbol
export const ResponsiveUiIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect width="24" height="24" rx="6" fill="#2563eb" />
    <rect x="5" y="6" width="14" height="10" rx="1.5" stroke="#ffffff" strokeWidth="1.5" />
    <path d="M10 18h4" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Agile / Scrum Sprint Symbol
export const AgileScrumIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect width="24" height="24" rx="6" fill="#d97706" />
    <path
      d="M7 10a5 5 0 119.5 2M16.5 14A5 5 0 117 12"
      stroke="#ffffff"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path d="M16 8l2 2-2 2M8 16l-2-2 2-2" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Performance / Optimization Symbol
export const PerformanceIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect width="24" height="24" rx="6" fill="#059669" />
    <path
      d="M13 3L6 14h6l-1 7 8-12h-6l1-6z"
      fill="#ffffff"
      stroke="#ffffff"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

// Security / Authentication Symbol
export const SecurityAuthIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect width="24" height="24" rx="6" fill="#0f766e" />
    <path
      d="M12 4l6 2.5v5c0 4.5-3 8-6 9.5-3-1.5-6-5-6-9.5v-5L12 4z"
      stroke="#ffffff"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M10 11.5l1.5 1.5 3-3" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Generative AI Foundations Symbol
export const GenerativeAiIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect width="24" height="24" rx="6" fill="#7c3aed" />
    <path
      d="M12 5v14m-7-7h14M7.5 7.5l9 9m-9 0l9-9"
      stroke="#ffffff"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <circle cx="12" cy="12" r="2.5" fill="#facc15" />
  </svg>
);

// Helper function to resolve the authentic symbol component for a skill
export const getSkillIcon = (iconKey?: string, name?: string) => {
  const key = (iconKey || name || '').toLowerCase();
  
  if (key.includes('react')) return <ReactIcon />;
  if (key.includes('javascript') || key.includes('js')) return <JavaScriptIcon />;
  if (key.includes('html')) return <HTML5Icon />;
  if (key.includes('css')) return <CSS3Icon />;
  if (key.includes('node')) return <NodeIcon />;
  if (key.includes('express')) return <ExpressIcon />;
  if (key.includes('python')) return <PythonIcon />;
  if (key.includes('django')) return <DjangoIcon />;
  if (key.includes('mongo')) return <MongoDBIcon />;
  if (key.includes('mysql')) return <MySQLIcon />;
  if (key.includes('git') && !key.includes('github')) return <GitIcon />;
  if (key.includes('github')) return <GitHubIcon />;
  if (key.includes('postman')) return <PostmanIcon />;
  if (key.includes('c language') || key === 'c' || key.includes('c essentials')) return <CIcon />;
  if (key.includes('rest') || key.includes('api')) return <RestApiIcon />;
  if (key.includes('sql') || key.includes('dbms') || key.includes('database')) return <SqlDatabaseIcon />;
  if (key.includes('axios') || key.includes('fetch')) return <AxiosIcon />;
  if (key.includes('responsive') || key.includes('ui')) return <ResponsiveUiIcon />;
  if (key.includes('agile') || key.includes('scrum')) return <AgileScrumIcon />;
  if (key.includes('optimization') || key.includes('re-render') || key.includes('performance')) return <PerformanceIcon />;
  if (key.includes('auth') || key.includes('security')) return <SecurityAuthIcon />;
  if (key.includes('ai') || key.includes('generative')) return <GenerativeAiIcon />;

  return <ReactIcon />;
};
