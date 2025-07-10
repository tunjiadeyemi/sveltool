import { writable } from 'svelte/store';

const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('sveltool-notes') : '';
export const notes = writable(stored || '');
export const enableNotepad = writable<boolean>(false);
