export function getConfig() {
    return {
        username: process.env.TTA_USERNAME || 'standard_user',
        password: process.env.TTA_PASSWORD || 'tta_secret',
        baseURL: process.env.BASE_URL || 'https://app.thetestingacademy.com',
    };
}
