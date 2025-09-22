export const formatUrl = (url: string): string => {
    if (!url) return '#';

    if (url.startsWith('mailto:') || url.startsWith('tel:')) {
        return url;
    }

    if (!/^(https?:\/\/)/i.test(url)) {
        return `https://${url}`;
    }

    return url;
};
