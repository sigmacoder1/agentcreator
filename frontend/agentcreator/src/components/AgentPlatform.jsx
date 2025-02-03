import React, { useState, useEffect } from 'react';
import { 
  Moon, 
  Sun, 
  Monitor, 
  Menu, 
  X, 
  Bot, 
  User, 
  LogIn, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

// Theme Context for managing dark/light/system mode
const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system');
  const [isDark, setIsDark] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const systemThemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleThemeChange = (e) => {
      if (theme === 'system') {
        setIsDark(e.matches);
      }
    };

    systemThemeMedia.addEventListener('change', handleThemeChange);
    return () => systemThemeMedia.removeEventListener('change', handleThemeChange);
  }, [theme]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    
    if (newTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else if (newTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      // System mode
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(systemDark);
      systemDark 
        ? document.documentElement.classList.add('dark')
        : document.documentElement.classList.remove('dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Login/Signup Modal Component
const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-96 animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-800 dark:hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>
        
        <form className="space-y-4">
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full p-3 border dark:border-gray-700 rounded-lg dark:bg-gray-900 dark:text-white"
            />
          )}
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 border dark:border-gray-700 rounded-lg dark:bg-gray-900 dark:text-white"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 border dark:border-gray-700 rounded-lg dark:bg-gray-900 dark:text-white"
          />
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            {isLogin ? 'Login' : 'Create Account'}
            <ArrowRight className="ml-2" size={20} />
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin 
              ? 'Need an account? Sign Up' 
              : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  toggleTheme('system');

  return (
    <>
      <header className="fixed w-full top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="https://agimesh.in" rel="noopener noreferrer">
          <div className="flex items-center space-x-4">
            <Bot size={32} className="text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              AGI Mesh
            </h1>
          </div>
        </a>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Features</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Pricing</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Docs</a>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            {/* <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1">
              <button
                onClick={() => toggleTheme('light')}
                className={`p-2 rounded-full ${theme === 'light' ? 'bg-white shadow-md' : ''}`}
              >
                <Sun size={20} className="text-yellow-500" />
              </button>
              <button
                onClick={() => toggleTheme('dark')}
                className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 shadow-md' : ''}`}
              >
                <Moon size={20} className="text-blue-400" />
              </button>
              <button
                onClick={() => toggleTheme('system')}
                className={`p-2 rounded-full ${theme === 'system' ? 'bg-gray-200 dark:bg-gray-700 shadow-md' : ''}`}
              >
                <Monitor size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div> */}

            {/* Auth Buttons */}
            <div className="flex space-x-2">
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
              >
                <LogIn className="mr-2" size={20} />
                Try Now
              </button>
              <button 
                className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center"
              >
                <ShieldCheck className="mr-2" size={20} />
                View Demo
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

// Main Content Component with Scrollable Cards
const MainContent = () => {
  const dummyCards = Array(15).fill(null).map((_, index) => ({
    id: index,
    title: `GPT ${index + 1}`,
    description: 'Automate complex tasks with custom AI agents',
    icon: Bot
  }));

  return (
    <main className="pt-20 pb-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Create AI Agents Network in Minutes
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Empower your business with custom AI agents that automate complex workflows and enhance productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto pr-4">
          {dummyCards.map((card) => (
            <div 
              key={card.id} 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                <card.icon size={40} className="text-blue-600 mr-4" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {card.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {card.description}
              </p>
              <button className="mt-4 text-blue-600 hover:underline flex items-center">
                Create Agent <ArrowRight className="ml-2" size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">AGI Mesh</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Revolutionize your business with AI-powered automation
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Features</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Pricing</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Integrations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Documentation</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Tutorials</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Community</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Connect</h4>
            <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600" target="_blank" rel="noopener noreferrer">Contact Us</a></li>
            <li><a href="https://www.x.com" className="text-gray-600 dark:text-gray-300 hover:text-blue-600" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.linkedin.com/in/mr-ayush-raj/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t dark:border-gray-800 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © 2025 AGIMesh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const AgentPlatform = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default AgentPlatform;