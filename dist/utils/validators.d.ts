import type { ValidationResult } from '../types';
/**
 * Validate email address
 */
export declare function validateEmail(email: string): ValidationResult;
/**
 * Validate password strength
 */
export declare function validatePassword(password: string, minLength?: number): ValidationResult;
/**
 * Validate phone number (basic US format)
 */
export declare function validatePhoneNumber(phone: string): ValidationResult;
/**
 * Validate URL
 */
export declare function validateUrl(url: string): ValidationResult;
/**
 * Validate required field
 */
export declare function validateRequired(value: any, fieldName?: string): ValidationResult;
/**
 * Validate string length
 */
export declare function validateLength(value: string, min?: number, max?: number, fieldName?: string): ValidationResult;
/**
 * Validate credit card number using Luhn algorithm
 */
export declare function validateCreditCard(cardNumber: string): ValidationResult;
