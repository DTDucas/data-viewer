export type JsonValueType = 'string' | 'number' | 'boolean' | 'null' | 'undefined' | 'object' | 'array';

export interface JsonProcessorOptions {
  maxDepth?: number;
  maxArrayLength?: number;
  includeCircularRefs?: boolean;
}

export interface SearchResult {
  path: string;
  key: string;
  value: any;
  type: JsonValueType;
  match: string;
}
