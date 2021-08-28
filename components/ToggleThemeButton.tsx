import { SunIcon, MoonIcon } from '@heroicons/react/solid';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

const ToggleThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div>
      {!loading && (
        <div className="flex flex-wrap justify-center items-center">
          <button onClick={toggleTheme} className="p-2">
            <p className="flex items-center p-1 px-2 border border-white dark:border-gray-500 rounded-full text-white transform transition-all duration-150 ease-in-out hover:bg-purple-400 dark:hover:bg-gray-600">
              {resolvedTheme === 'dark' ? (
                <MoonIcon className="h-6 mr-2" />
              ) : (
                <SunIcon className="h-6 mr-2" />
              )}
              {resolvedTheme}
            </p>
          </button>
        </div>
      )}
    </div>
  );
};

export default ToggleThemeButton;
