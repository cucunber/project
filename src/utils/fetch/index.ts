export const getFetchUrl = (url: string) => {
    const url_ = url.startsWith('/') ? url.slice(1) : url;
    const domain = process.env.DOMAIN;
    const base = domain?.endsWith('/') ? domain : `${domain}/`;
    return `${domain}${url}`;
}