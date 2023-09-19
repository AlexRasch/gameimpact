export function getQueryParam(paramName) {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get(paramName);
}