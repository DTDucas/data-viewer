'use client';

import { JsonProcessor } from '@/utils/jsonProcessor';
import { memo, useState } from 'react';

interface TreeNodeProps {
  data: any;
  keyName?: string;
  path: string;
  level: number;
  expandedNodes: Set<string>;
  onToggleExpand: (path: string) => void;
}

const TreeNode = memo(({ data, keyName, path, level, expandedNodes, onToggleExpand }: TreeNodeProps) => {
  const type = JsonProcessor.getValueType(data);
  const isExpandable = type === 'object' || type === 'array';
  const isExpanded = expandedNodes.has(path);
  const { count } = JsonProcessor.getItemCount(data);

  const getValueColor = (valueType: string): string => {
    switch (valueType) {
      case 'string': return 'text-emerald-400';
      case 'number': return 'text-blue-400';
      case 'boolean': return 'text-purple-400';
      case 'null': return 'text-gray-500';
      case 'array': return 'text-orange-400';
      case 'object': return 'text-rose-400';
      default: return 'text-white';
    }
  };

  const handleToggle = () => {
    if (isExpandable) {
      onToggleExpand(path);
    }
  };

  const renderValue = () => {
    if (!isExpandable) {
      return (
        <span className={`${getValueColor(type)} break-all`}>
          {JsonProcessor.formatValue(data, type)}
        </span>
      );
    }

    if (isExpanded) {
      const entries = type === 'array'
        ? data.map((item: any, index: number) => ({ key: index, value: item }))
        : Object.entries(data).map(([key, value]) => ({ key, value }));

      return (
        <div>
          <div className="flex items-center">
            <span className={getValueColor(type)}>
              {type === 'array' ? '[' : '{'}
            </span>
            {count > 0 && (
              <span className="text-gray-500 text-xs ml-2">
                {count} {type === 'array' ? 'items' : 'properties'}
              </span>
            )}
          </div>
          <div className="ml-4 mt-1">
            {entries.map(({ key, value }: { key: string | number; value: any }) => (
              <TreeNode
                key={key}
                data={value}
                keyName={String(key)}
                path={`${path}${type === 'array' ? `[${key}]` : `.${key}`}`}
                level={level + 1}
                expandedNodes={expandedNodes}
                onToggleExpand={onToggleExpand}
              />
            ))}
          </div>
          <span className={getValueColor(type)}>
            {type === 'array' ? ']' : '}'}
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center">
          <span className={getValueColor(type)}>
            {type === 'array' ? '[...]' : '{...}'}
          </span>
          {count > 0 && (
            <span className="text-gray-500 text-xs ml-2">
              {count} {type === 'array' ? 'items' : 'properties'}
            </span>
          )}
        </div>
      );
    }
  };

  return (
    <div className="group hover:bg-gray-800/50 transition-colors">
      <div className="flex items-start py-1 px-2">
        <div style={{ paddingLeft: `${level * 20}px` }} className="flex items-center">
          {isExpandable && (
            <button
              onClick={handleToggle}
              className="w-4 h-4 flex items-center justify-center text-gray-500 hover:text-gray-300 mr-2 flex-shrink-0"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          )}

          {!isExpandable && <span className="w-6"></span>}

          {keyName && (
            <>
              <span className="text-blue-300 font-medium mr-2">
                "{keyName}"
              </span>
              <span className="text-gray-500 mr-2">:</span>
            </>
          )}
        </div>

        <div className="flex-1 min-w-0">
          {renderValue()}
        </div>
      </div>
    </div>
  );
});

TreeNode.displayName = 'TreeNode';

interface TreeViewProps {
  data: any;
}

const TreeView = memo(({ data }: TreeViewProps) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));

  const handleToggleExpand = (path: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    const allPaths = new Set<string>();

    const collectPaths = (obj: any, currentPath: string) => {
      allPaths.add(currentPath);

      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          const newPath = `${currentPath}[${index}]`;
          if (typeof item === 'object' && item !== null) {
            collectPaths(item, newPath);
          }
        });
      } else if (typeof obj === 'object' && obj !== null) {
        Object.entries(obj).forEach(([key, value]) => {
          const newPath = `${currentPath}.${key}`;
          if (typeof value === 'object' && value !== null) {
            collectPaths(value, newPath);
          }
        });
      }
    };

    collectPaths(data, 'root');
    setExpandedNodes(allPaths);
  };

  const collapseAll = () => {
    setExpandedNodes(new Set(['root']));
  };

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-lg font-medium mb-2">No JSON data to display</p>
        <p className="text-sm">Upload a file or paste JSON content to get started</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-800">
        <h3 className="text-sm font-medium text-gray-300">Tree View</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={expandAll}
            className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
            title="Expand all nodes"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
            title="Collapse all nodes"
          >
            Collapse All
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto font-mono text-sm bg-gray-900">
        <div className="p-2">
          <TreeNode
            data={data}
            path="root"
            level={0}
            expandedNodes={expandedNodes}
            onToggleExpand={handleToggleExpand}
          />
        </div>
      </div>
    </div>
  );
});

TreeView.displayName = 'TreeView';

export default TreeView;
