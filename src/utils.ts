/** Non-TSX Utility Functions and Tools **/

export function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}
