export const BASEURL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000'
        : 'https://api.tapahtumavaraus.tk'
