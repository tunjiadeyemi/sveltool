/**
 * Generate a random UUID v4
 */
export function generateUUID(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		const r = Math.random() * 16 | 0;
		const v = c === 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

/**
 * Debounce function calls
 */
export function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout>;
	
	return function executedFunction(...args: Parameters<T>) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

/**
 * Throttle function calls
 */
export function throttle<T extends (...args: any[]) => any>(
	func: T,
	limit: number
): (...args: Parameters<T>) => void {
	let inThrottle: boolean;
	
	return function executedFunction(...args: Parameters<T>) {
		if (!inThrottle) {
			func(...args);
			inThrottle = true;
			setTimeout(() => inThrottle = false, limit);
		}
	};
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
	if (obj === null || typeof obj !== 'object') return obj;
	if (obj instanceof Date) return new Date(obj.getTime()) as T;
	if (obj instanceof Array) return obj.map(item => deepClone(item)) as T;
	if (typeof obj === 'object') {
		const clonedObj = {} as T;
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				clonedObj[key] = deepClone(obj[key]);
			}
		}
		return clonedObj;
	}
	return obj;
}

/**
 * Check if two objects are deeply equal
 */
export function deepEqual(a: any, b: any): boolean {
	if (a === b) return true;
	
	if (a instanceof Date && b instanceof Date) {
		return a.getTime() === b.getTime();
	}
	
	if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) {
		return a === b;
	}
	
	if (a === null || a === undefined || b === null || b === undefined) {
		return false;
	}
	
	if (a.prototype !== b.prototype) return false;
	
	const keys = Object.keys(a);
	if (keys.length !== Object.keys(b).length) {
		return false;
	}
	
	return keys.every(k => deepEqual(a[k], b[k]));
}

/**
 * Sleep/delay function
 */
export function sleep(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Create a range of numbers
 */
export function range(start: number, end?: number, step = 1): number[] {
	if (end === undefined) {
		end = start;
		start = 0;
	}
	
	const result: number[] = [];
	for (let i = start; i < end; i += step) {
		result.push(i);
	}
	return result;
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

/**
 * Convert bytes to human readable format
 */
export function formatBytes(bytes: number, decimals = 2): string {
	if (bytes === 0) return '0 Bytes';
	
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Get a random item from an array
 */
export function randomChoice<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export function shuffle<T>(array: T[]): T[] {
	const result = [...array];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}

/**
 * Group array items by a key function
 */
export function groupBy<T, K extends string | number | symbol>(
	array: T[],
	keyFn: (item: T) => K
): Record<K, T[]> {
	return array.reduce((groups, item) => {
		const key = keyFn(item);
		if (!groups[key]) {
			groups[key] = [];
		}
		groups[key].push(item);
		return groups;
	}, {} as Record<K, T[]>);
}
