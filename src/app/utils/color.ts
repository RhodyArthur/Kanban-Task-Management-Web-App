import { v4 as uuidv4 } from 'uuid';

export function generateRandomColor(): string {
    const randomHex = uuidv4().substring(0, 6);
    const color = `#${randomHex}`;

    // Ensure the color is not too dark or too light for readability
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    if (luma < 128) {
        // If the color is too dark, add some brightness
        return color + '80';
    } else {
        return color;
    }
}
