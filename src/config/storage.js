const TIKTOK_STORAGE_KEY = 'TIKTOK_UI';

export const get = () => {
    return JSON.parse(localStorage.getItem(TIKTOK_STORAGE_KEY)) || {};
};

export const set = (config) => {
    localStorage.setItem(TIKTOK_STORAGE_KEY, JSON.stringify(config));
};
