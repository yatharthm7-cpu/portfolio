import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'day' | 'night' | 'void';
type ThemeMode = 'auto' | 'void';

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  toggleVoidTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('auto');
  const [theme, setTheme] = useState<Theme>('night');

  useEffect(() => {
    if (themeMode === 'void') {
      setTheme('void');
      return;
    }

    const checkTime = () => {
      const currentHour = new Date().getHours();
      // Assuming Day theme is from 6:00 AM (6) to 5:59 PM (17)
      const newTheme = (currentHour >= 6 && currentHour < 18) ? 'day' : 'night';
      setTheme(newTheme);
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, [themeMode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleVoidTheme = () => {
    setThemeMode(prev => prev === 'auto' ? 'void' : 'auto');
  };

  return (
    <ThemeContext.Provider value={{ theme, themeMode, toggleVoidTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
