import type { FormatOptions } from '../types';
/**
 * Format a number as currency
 */
export declare function formatCurrency(amount: number, options?: FormatOptions): string;
/**
 * Format a number with thousands separators
 */
export declare function formatNumber(num: number, options?: FormatOptions): string;
/**
 * Format a date in a localized format
 */
export declare function formatDate(date: Date | string | number, options?: Intl.DateTimeFormatOptions): string;
/**
 * Format a relative time (e.g., "2 days ago")
 */
export declare function formatRelativeTime(date: Date | string | number): string;
/**
 * Truncate text with ellipsis
 */
export declare function truncateText(text: string, maxLength: number): string;
/**
 * Capitalize the first letter of a string
 */
export declare function capitalize(str: string): string;
/**
 * Convert text to title case
 */
export declare function titleCase(str: string): string;
