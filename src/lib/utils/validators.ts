import type { ValidationResult } from '../types';

/**
 * Validate email address
 */
export function validateEmail(email: string): ValidationResult {
	const errors: string[] = [];
	
	if (!email) {
		errors.push('Email is required');
	} else {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			errors.push('Email format is invalid');
		}
	}
	
	return {
		isValid: errors.length === 0,
		errors
	};
}

/**
 * Validate password strength
 */
export function validatePassword(password: string, minLength = 8): ValidationResult {
	const errors: string[] = [];
	
	if (!password) {
		errors.push('Password is required');
	} else {
		if (password.length < minLength) {
			errors.push(`Password must be at least ${minLength} characters long`);
		}
		if (!/[A-Z]/.test(password)) {
			errors.push('Password must contain at least one uppercase letter');
		}
		if (!/[a-z]/.test(password)) {
			errors.push('Password must contain at least one lowercase letter');
		}
		if (!/\d/.test(password)) {
			errors.push('Password must contain at least one number');
		}
		if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
			errors.push('Password must contain at least one special character');
		}
	}
	
	return {
		isValid: errors.length === 0,
		errors
	};
}

/**
 * Validate phone number (basic US format)
 */
export function validatePhoneNumber(phone: string): ValidationResult {
	const errors: string[] = [];
	
	if (!phone) {
		errors.push('Phone number is required');
	} else {
		// Remove all non-digit characters
		const cleaned = phone.replace(/\D/g, '');
		
		if (cleaned.length !== 10 && cleaned.length !== 11) {
			errors.push('Phone number must be 10 or 11 digits');
		} else if (cleaned.length === 11 && !cleaned.startsWith('1')) {
			errors.push('11-digit phone number must start with 1');
		}
	}
	
	return {
		isValid: errors.length === 0,
		errors
	};
}

/**
 * Validate URL
 */
export function validateUrl(url: string): ValidationResult {
	const errors: string[] = [];
	
	if (!url) {
		errors.push('URL is required');
	} else {
		try {
			new URL(url);
		} catch {
			errors.push('URL format is invalid');
		}
	}
	
	return {
		isValid: errors.length === 0,
		errors
	};
}

/**
 * Validate required field
 */
export function validateRequired(value: any, fieldName = 'Field'): ValidationResult {
	const errors: string[] = [];
	
	if (value === null || value === undefined || value === '' || 
		(Array.isArray(value) && value.length === 0)) {
		errors.push(`${fieldName} is required`);
	}
	
	return {
		isValid: errors.length === 0,
		errors
	};
}

/**
 * Validate string length
 */
export function validateLength(
	value: string, 
	min?: number, 
	max?: number, 
	fieldName = 'Field'
): ValidationResult {
	const errors: string[] = [];
	
	if (min !== undefined && value.length < min) {
		errors.push(`${fieldName} must be at least ${min} characters long`);
	}
	
	if (max !== undefined && value.length > max) {
		errors.push(`${fieldName} must be no more than ${max} characters long`);
	}
	
	return {
		isValid: errors.length === 0,
		errors
	};
}

/**
 * Validate credit card number using Luhn algorithm
 */
export function validateCreditCard(cardNumber: string): ValidationResult {
	const errors: string[] = [];
	
	if (!cardNumber) {
		errors.push('Credit card number is required');
	} else {
		const cleaned = cardNumber.replace(/\s|-/g, '');
		
		if (!/^\d+$/.test(cleaned)) {
			errors.push('Credit card number must contain only digits');
		} else if (cleaned.length < 13 || cleaned.length > 19) {
			errors.push('Credit card number must be between 13 and 19 digits');
		} else {
			// Luhn algorithm
			let sum = 0;
			let isEven = false;
			
			for (let i = cleaned.length - 1; i >= 0; i--) {
				let digit = parseInt(cleaned.charAt(i), 10);
				
				if (isEven) {
					digit *= 2;
					if (digit > 9) {
						digit = digit % 10 + 1;
					}
				}
				
				sum += digit;
				isEven = !isEven;
			}
			
			if (sum % 10 !== 0) {
				errors.push('Credit card number is invalid');
			}
		}
	}
	
	return {
		isValid: errors.length === 0,
		errors
	};
}
