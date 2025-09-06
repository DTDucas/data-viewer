'use client';

import { JsonProcessor } from '@/utils/jsonProcessor';
import { memo, useMemo, useState } from 'react';
import TreeView from './TreeView';

interface OutputPanelProps {
  data: any;
  isValid: boolean;
  onCopy: () => void;
}

const OutputPanel = memo(({ data, isValid, onCopy }: OutputPanelProps) => {
  const [activeTab, setActiveTab] = useState<'formatted' | 'tree'>('tree');

  const stats = useMemo(() => {
    if (!data || !isValid) return null;

    const formattedJson = JSON.stringify(data, null, 2);
    const lines = formattedJson.split('\n').length;
    const bytes = new Blob([formattedJson]).size;
    const { count: itemCount, type: itemType } = JsonProcessor.getItemCount(data);

    return {
      lines,
      bytes,
      itemCount,
      itemType,
      formattedJson
    };
  }, [data, isValid]);

  const renderEmptyState = () => (
    <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 m-4">
      <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p className="text-lg font-medium mb-2">No JSON data to display</p>
      <p className="text-sm text-center max-w-sm">
        Paste valid JSON content in the left panel to see formatted output
      </p>
    </div>
  );

  if (!data || !isValid) {
    return (
      <div className="h-full flex flex-col bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Output
            </h2>
          </div>
        </div>
        {renderEmptyState()}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="h-full flex flex-col bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Output
            </h2>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500 dark:text-gray-400">Processing...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Header with tabs */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Output
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('tree')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                activeTab === 'tree'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
              }`}
            >
              <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Tree View
            </button>
            <button
              onClick={() => setActiveTab('formatted')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                activeTab === 'formatted'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
              }`}
            >
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Formatted
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <span>{stats.lines} lines</span>
            <span>•</span>
            <span>{stats.bytes} bytes</span>
            {stats.itemCount > 0 && (
              <>
                <span>•</span>
                <span>{stats.itemCount} {stats.itemType}</span>
              </>
            )}
          </div>

          <button
            onClick={onCopy}
            className="flex items-center space-x-1 px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            title="Copy formatted JSON"
            aria-label="Copy formatted JSON"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Copy</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'tree' ? (
          <TreeView data={data} />
        ) : (
          <div className="h-full overflow-auto">
            <pre className="p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words font-mono">
              <code className="language-json">
                {stats.formattedJson}
              </code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
});

OutputPanel.displayName = 'OutputPanel';

export default OutputPanel;
