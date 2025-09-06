'use client';

import { memo } from 'react';

const Header = memo(() => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            JSON Data Viewer
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Real-time JSON formatter and viewer
          </p>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400">
          Created by{' '}
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Duong Tran Quang (DTDucas)
          </span>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
