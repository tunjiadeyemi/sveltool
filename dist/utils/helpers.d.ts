/**
 * Generate a random UUID v4
 */
export declare function generateUUID(): string;
/**
 * Debounce function calls
 */
export declare function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void;
/**
 * Throttle function calls
 */
export declare function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void;
/**
 * Deep clone an object
 */
export declare function deepClone<T>(obj: T): T;
/**
 * Check if two objects are deeply equal
 */
export declare function deepEqual(a: any, b: any): boolean;
/**
 * Sleep/delay function
 */
export declare function sleep(ms: number): Promise<void>;
/**
 * Create a range of numbers
 */
export declare function range(start: number, end?: number, step?: number): number[];
/**
 * Clamp a number between min and max
 */
export declare function clamp(value: number, min: number, max: number): number;
/**
 * Convert bytes to human readable format
 */
export declare function formatBytes(bytes: number, decimals?: number): string;
/**
 * Get a random item from an array
 */
export declare function randomChoice<T>(array: T[]): T;
/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export declare function shuffle<T>(array: T[]): T[];
/**
 * Group array items by a key function
 */
export declare function groupBy<T, K extends string | number | symbol>(array: T[], keyFn: (item: T) => K): Record<K, T[]>;
