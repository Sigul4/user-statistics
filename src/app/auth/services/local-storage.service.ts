import { Injectable } from '@angular/core';

/**
 * Local storage service
 */
@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    /**
     * This method returns the value by the key from local storage
     * @param {string} key Key in local storage
     * @returns {any}
     */
    public get(key: string): any {
        try {
            return JSON.parse(localStorage.getItem(key) || JSON.stringify(''));
        } catch (e) {
            console.error('Error getting data from localStorage', e);
            return null;
        }
    }

    /**
     * Method to add data to local storage
     * @param key
     * @param data
     * @returns {void}
     */
    public set(key: string, data: any): void {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('Error setting data to localStorage', e);
        }
    }

    /**
     * Remove data from local storage by key
     * @param {string} key
     * @returns {void}
     */
    public remove(key: string): void {
        localStorage.removeItem(key);
    }
}
