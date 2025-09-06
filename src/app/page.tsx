'use client';

import Header from '@/components/Header';
import InputPanel from '@/components/InputPanel';
import OutputPanel from '@/components/OutputPanel';
import { JsonProcessor } from '@/utils/jsonProcessor';
import { useCallback, useMemo, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

export default function Home() {
  const [jsonInput, setJsonInput] = useState<string>('');

  const parseResult = useMemo(() => {
    if (!jsonInput.trim()) {
      return { isValid: false, data: null, error: null };
    }
    const result = JsonProcessor.validateJson(jsonInput);
    return {
      isValid: result.isValid,
      data: result.data || null,
      error: result.error || null
    };
  }, [jsonInput]);

  const handleInputChange = useCallback((value: string) => {
    setJsonInput(value);
  }, []);

  const handleClearInput = useCallback(() => {
    setJsonInput('');
  }, []);

  const handleCopyOutput = useCallback(async () => {
    if (parseResult.isValid && parseResult.data) {
      const formattedJson = JSON.stringify(parseResult.data, null, 2);
      await JsonProcessor.copyToClipboard(formattedJson);
    }
  }, [parseResult]);

  return (
    <div className="dark flex flex-col h-screen bg-gray-900">
      <Header />

      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={50} minSize={30} maxSize={70}>
            <InputPanel
              value={jsonInput}
              onChange={handleInputChange}
              onClear={handleClearInput}
              error={parseResult.error}
              isValid={parseResult.isValid}
            />
          </Panel>

          <PanelResizeHandle className="w-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors relative group">
            <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-300 dark:bg-gray-600 group-hover:bg-blue-400 transition-colors transform -translate-x-1/2"></div>
          </PanelResizeHandle>

          <Panel defaultSize={50} minSize={30}>
            <OutputPanel
              data={parseResult.data}
              isValid={parseResult.isValid}
              onCopy={handleCopyOutput}
            />
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
