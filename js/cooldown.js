export function calculateNewCooldown(currentSpeed, speedChange) {
    return currentSpeed * (1 + speedChange / 100);
}