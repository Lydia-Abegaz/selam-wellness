import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TopNavBar from './components/layout/TopNavBar';

// Auth Screens
import LandingPage from './screens/LandingPage';
import LoginScreen from './screens/Auth/LoginScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';

// App Screens
import Home from './screens/Home';
import WomensHaven from './screens/WomensHaven/WomensHaven';
import CycleTracker from './screens/WomensHaven/CycleTracker';
import CirclesDiscovery from './screens/Circles/CirclesDiscovery';
import CircleFeed from './screens/Circles/CircleFeed';
import CreatePost from './screens/Circles/CreatePost';
import EventsPage from './screens/EventsPage';
import GrowthPage from './screens/GrowthPage';
import Profile from './screens/Profile';
import SelfCareHub from './screens/SelfCareHub';
import ExperienceDetail from './screens/Retreats/ExperienceDetail';
import BookingFlow from './screens/Retreats/BookingFlow';
import RetreatsDiscover from './screens/Retreats/RetreatsDiscover';

// Screens that DON'T show the top nav
const NO_NAV_SCREENS = ['landing', 'login', 'register', 'create-post', 'booking', 'cycle'];

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [screenParams, setScreenParams] = useState({});
  const [user, setUser] = useState(null);

  // Restore session from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('selam_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setScreen('home');
      } catch (e) {
        localStorage.removeItem('selam_user');
      }
    }
  }, []);

  const navigate = (to, params = {}) => {
    setScreen(to);
    setScreenParams(params);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('selam_user', JSON.stringify(userData));
    setScreen('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('selam_user');
    setScreen('landing');
  };

  const screenProps = { navigate, params: screenParams, user };

  const renderScreen = () => {
    switch (screen) {
      // Auth / Public
      case 'landing':    return <LandingPage {...screenProps} />;
      case 'login':      return <LoginScreen {...screenProps} onLogin={handleLogin} />;
      case 'register':   return <RegisterScreen {...screenProps} onLogin={handleLogin} />;

      // Protected App Screens
      case 'home':          return <Home {...screenProps} />;
      case 'womens':        return <WomensHaven {...screenProps} />;
      case 'cycle':         return <CycleTracker {...screenProps} />;
      case 'circles':       return <CirclesDiscovery {...screenProps} />;
      case 'circle-feed':   return <CircleFeed {...screenProps} />;
      case 'create-post':   return <CreatePost {...screenProps} />;
      case 'events':        return <EventsPage {...screenProps} />;
      case 'growth':        return <GrowthPage {...screenProps} />;
      case 'profile':       return <Profile {...screenProps} />;
      case 'journal':       return <SelfCareHub {...screenProps} />;
      case 'daily':         return <SelfCareHub {...screenProps} />;
      case 'self-care':     return <SelfCareHub {...screenProps} />;
      case 'mood':          return <SelfCareHub {...screenProps} />;
      case 'experiences':   return <RetreatsDiscover {...screenProps} />;
      case 'notifications': return <Home {...screenProps} />;
      case 'experience':    return <ExperienceDetail {...screenProps} />;
      case 'booking':       return <BookingFlow {...screenProps} />;
      default:              return <LandingPage {...screenProps} />;
    }
  };

  const showNav = user && !NO_NAV_SCREENS.includes(screen);

  return (
    <div className="app-shell">
      <div className="tibeb-bg" />

      {/* Top nav — only shown after login, on main screens */}
      {showNav && (
        <TopNavBar
          activeTab={screen}
          onNavigate={navigate}
          user={user}
          onLogout={handleLogout}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
