import type { FormatOptions } from '../types';

/**
 * Format a number as currency
 */
export function formatCurrency(
	amount: number, 
	options: FormatOptions = {}
): string {
	const { locale = 'en-US', currency = 'USD', precision = 2 } = options;
	
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
		minimumFractionDigits: precision,
		maximumFractionDigits: precision
	}).format(amount);
}

/**
 * Format a number with thousands separators
 */
export function formatNumber(
	num: number, 
	options: FormatOptions = {}
): string {
	const { locale = 'en-US', precision = 0 } = options;
	
	return new Intl.NumberFormat(locale, {
		minimumFractionDigits: precision,
		maximumFractionDigits: precision
	}).format(num);
}

/**
 * Format a date in a localized format
 */
export function formatDate(
	date: Date | string | number,
	options: Intl.DateTimeFormatOptions = {}
): string {
	const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
	const defaultOptions: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
	
	return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(dateObj);
}

/**
 * Format a relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(date: Date | string | number): string {
	const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
	
	const intervals = [
		{ label: 'year', seconds: 31536000 },
		{ label: 'month', seconds: 2592000 },
		{ label: 'week', seconds: 604800 },
		{ label: 'day', seconds: 86400 },
		{ label: 'hour', seconds: 3600 },
		{ label: 'minute', seconds: 60 },
		{ label: 'second', seconds: 1 }
	];
	
	for (const interval of intervals) {
		const count = Math.floor(diffInSeconds / interval.seconds);
		if (count >= 1) {
			return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
		}
	}
	
	return 'just now';
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength - 3) + '...';
}

/**
 * Capitalize the first letter of a string
 */
export function capitalize(str: string): string {
	if (!str) return str;
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert text to title case
 */
export function titleCase(str: string): string {
	return str.replace(/\w\S*/g, capitalize);
}
