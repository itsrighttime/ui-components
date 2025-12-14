/**
 * Redirects the browser to the specified target URL.
 *
 * @param {string} target - The URL to navigate to. If falsy, no action is taken.
 */
export const redirectURL = (target) => {
    if (target) {
        window.location.href = target;
    }
};

