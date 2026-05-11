/* ============================================================
   DEVBOARD - CONFIG
   Replace API keys with your own before deploying.
   ============================================================ */

const CONFIG = {
  WEATHER_API_KEY: 'YOUR_OPENWEATHERMAP_API_KEY',
  WEATHER_API_URL: 'https://api.openweathermap.org/data/2.5/weather',
  WEATHER_UNITS: 'metric',

  NEWS_API_KEY: 'YOUR_NEWSAPI_KEY',
  NEWS_API_URL: 'https://newsapi.org/v2/top-headlines',
  NEWS_PAGE_SIZE: 8,
  NEWS_COUNTRY: 'in',

  APP_VERSION: '1.0.0',
  STORAGE_KEY: 'devboard_data',
  DEFAULT_CITY: 'Bengaluru',

  POMODORO_FOCUS: 25,
  POMODORO_BREAK: 5,

  DEMO_MODE: true,

  DEMO_WEATHER: {
    city: 'Bengaluru',
    temp: 27,
    feels_like: 29,
    condition: 'Partly Cloudy',
    humidity: 62,
    wind: 14,
    icon: 'Cloudy',
  },

  DEMO_NEWS_BY_CATEGORY: {
    technology: [
      { title: 'React 19 Stable Released - What You Need to Know', source: 'Vercel Blog', time: '2h ago', icon: 'React', url: '#' },
      { title: 'TypeScript 5.5 Brings Inferred Type Predicates', source: 'TypeScript Blog', time: '4h ago', icon: 'TS', url: '#' },
      { title: 'Node.js 22 Hits LTS - Key Features Breakdown', source: 'Node.js Foundation', time: '6h ago', icon: 'Node', url: '#' },
      { title: 'Docker Desktop 4.30 - New Features Overview', source: 'Docker Blog', time: '1d ago', icon: 'Docker', url: '#' },
    ],
    science: [
      { title: 'New Space Telescope Images Reveal Distant Star Formation', source: 'Science Daily', time: '1h ago', icon: 'Space', url: '#' },
      { title: 'Battery Research Pushes Solid-State Cells Closer to Market', source: 'Nature Tech', time: '3h ago', icon: 'Lab', url: '#' },
      { title: 'Ocean Climate Models Get More Accurate With Fresh Data', source: 'NOAA Research', time: '5h ago', icon: 'Ocean', url: '#' },
      { title: 'Medical Imaging AI Helps Detect Rare Conditions Earlier', source: 'Health Science', time: '9h ago', icon: 'Health', url: '#' },
    ],
    general: [
      { title: 'Cities Expand Public Transit to Reduce Commute Times', source: 'World Report', time: '2h ago', icon: 'City', url: '#' },
      { title: 'Small Teams Are Rethinking Hybrid Work Routines', source: 'Workplace Weekly', time: '4h ago', icon: 'Work', url: '#' },
      { title: 'Local Communities Invest More in Shared Public Spaces', source: 'Daily Journal', time: '7h ago', icon: 'Community', url: '#' },
      { title: 'Consumer Spending Trends Show Shift Toward Essentials', source: 'Market Watcher', time: '11h ago', icon: 'Market', url: '#' },
    ],
    business: [
      { title: 'Startups Focus on Profitability Over Growth at Any Cost', source: 'Business Desk', time: '2h ago', icon: 'Biz', url: '#' },
      { title: 'Small Businesses Adopt More Automation Tools', source: 'Market Pulse', time: '5h ago', icon: 'Ops', url: '#' },
      { title: 'Global Supply Chains Show Signs of Stabilizing', source: 'Trade Review', time: '8h ago', icon: 'Trade', url: '#' },
      { title: 'Retailers Prepare for a Slower Seasonal Cycle', source: 'Finance Daily', time: '12h ago', icon: 'Retail', url: '#' },
    ],
    health: [
      { title: 'Preventive Care Programs Gain Adoption Across Hospitals', source: 'Health Line', time: '1h ago', icon: 'Care', url: '#' },
      { title: 'Wearable Devices Continue Expanding Remote Monitoring', source: 'Med Tech', time: '4h ago', icon: 'Wear', url: '#' },
      { title: 'Nutrition Research Highlights Better Sleep Outcomes', source: 'Wellness Weekly', time: '7h ago', icon: 'Sleep', url: '#' },
      { title: 'Telehealth Services Improve Access in Rural Areas', source: 'Public Health', time: '10h ago', icon: 'Tele', url: '#' },
    ],
    sports: [
      { title: 'Training Analytics Are Reshaping Team Preparation', source: 'Sports Lab', time: '2h ago', icon: 'Fit', url: '#' },
      { title: 'Youth Academies Put More Emphasis on Recovery', source: 'Game Day', time: '4h ago', icon: 'Play', url: '#' },
      { title: 'Coaches Experiment With New Rotation Models', source: 'Match Weekly', time: '6h ago', icon: 'Coach', url: '#' },
      { title: 'Sports Venues Upgrade Fan Experience Technology', source: 'Arena News', time: '11h ago', icon: 'Arena', url: '#' },
    ],
    entertainment: [
      { title: 'Streaming Platforms Double Down on Limited Series', source: 'Screen Daily', time: '3h ago', icon: 'TV', url: '#' },
      { title: 'Independent Creators Build Bigger Direct Audiences', source: 'Creator Beat', time: '5h ago', icon: 'Create', url: '#' },
      { title: 'Studios Invest More in Regional Storytelling', source: 'Culture Wire', time: '8h ago', icon: 'Film', url: '#' },
      { title: 'Music Festivals Expand Hybrid Digital Experiences', source: 'Sound Report', time: '12h ago', icon: 'Music', url: '#' },
    ],
  },
};

Object.freeze(CONFIG);
