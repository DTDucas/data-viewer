import { JsonValueType } from '@/types';

export class JsonProcessor {
  static getValueType(value: any): JsonValueType {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (Array.isArray(value)) return 'array';
    return typeof value as JsonValueType;
  }

  static formatValue(value: any, type: JsonValueType): string {
    switch (type) {
      case 'string': return `"${value}"`;
      case 'null': return 'null';
      case 'undefined': return 'undefined';
      case 'boolean': return value ? 'true' : 'false';
      default: return String(value);
    }
  }

  static getItemCount(value: any): { count: number; type: string } {
    if (Array.isArray(value)) {
      return { count: value.length, type: value.length === 1 ? 'item' : 'items' };
    }
    if (value && typeof value === 'object' && value !== null) {
      const count = Object.keys(value).length;
      return { count, type: count === 1 ? 'property' : 'properties' };
    }
    return { count: 0, type: '' };
  }

  static validateJson(jsonString: string): { isValid: boolean; data?: any; error?: string } {
    try {
      const data = JSON.parse(jsonString);
      return { isValid: true, data };
    } catch (error) {
      return {
        isValid: false,
        error: error instanceof Error ? error.message : 'Unknown parsing error'
      };
    }
  }

  static copyToClipboard(text: string): Promise<boolean> {
    return navigator.clipboard.writeText(text)
      .then(() => true)
      .catch(() => false);
  }
}
