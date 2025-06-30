/**
 * Converts a date string from "yyyy-MM-dd" format to "yyyy-MM-ddT00:00:00Z" format
 * @param dateString - Date string in format "yyyy-MM-dd"
 * @returns ISO string with time set to midnight UTC
 * @throws Error if the input format is invalid
 */
export function formatDateToISO(dateString: string): string {
    // Validate input format using regex
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(dateString)) {
        throw new Error(`Invalid date format. Expected "yyyy-MM-dd", got "${dateString}"`);
    }

    // Simply append the time and timezone
    return `${dateString}T00:00:00Z`;
}

/**
 * Alternative version using Date object for validation
 * Converts a date string from "yyyy-MM-dd" format to "yyyy-MM-ddT00:00:00Z" format
 * @param dateString - Date string in format "yyyy-MM-dd"
 * @returns ISO string with time set to midnight UTC
 * @throws Error if the date is invalid
 */
function formatDateToISOWithValidation(dateString: string): string {
    // Validate input format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(dateString)) {
        throw new Error(`Invalid date format. Expected "yyyy-MM-dd", got "${dateString}"`);
    }

    // Create Date object to validate the date
    const date = new Date(dateString + 'T00:00:00Z');

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        throw new Error(`Invalid date: ${dateString}`);
    }

    // Return the formatted string
    return `${dateString}T00:00:00Z`;
}

/**
 * Version that handles null/undefined and returns null for invalid inputs
 * @param dateString - Date string in format "yyyy-MM-dd" or null/undefined
 * @returns ISO string with time set to midnight UTC, or null if input is null/undefined/invalid
 */
export function formatDateToISOSafe(dateString: string | null | undefined): string | null {
    if (!dateString) {
        return null;
    }

    try {
        return formatDateToISO(dateString);
    } catch {
        return null;
    }
}

/**
 * Formats an ISO date string to display format for tables
 * Converts from "2024-06-27T00:00:00Z" to "2024-06-27"
 * @param isoDateString - ISO date string or null/undefined
 * @returns Formatted date string "yyyy-MM-dd" or null if input is invalid
 */
export function formatDateForDisplay(isoDateString: string | null | undefined): string | null {
    if (!isoDateString) {
        return null;
    }

    try {
        // Parse the ISO date string
        const date = new Date(isoDateString);
        
        // Check if the date is valid
        if (isNaN(date.getTime())) {
            return null;
        }

        // Format to yyyy-MM-dd
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    } catch {
        return null;
    }
}

/**
 * Formats an ISO date string to Vietnamese locale format
 * Converts from "2024-06-27T00:00:00Z" to "27/06/2024"
 * @param isoDateString - ISO date string or null/undefined
 * @returns Formatted date string in Vietnamese format or null if input is invalid
 */
export function formatDateForDisplayVN(isoDateString: string | null | undefined): string | null {
    if (!isoDateString) {
        return null;
    }

    try {
        const date = new Date(isoDateString);
        
        if (isNaN(date.getTime())) {
            return null;
        }

        return date.toLocaleDateString('vi-VN');
    } catch {
        return null;
    }
}