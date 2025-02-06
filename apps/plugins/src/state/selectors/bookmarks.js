export const getBookmarks = (state) => state?.bookmarks?.canvasIds ?? [];

export const isBookmarked = (canvasId) => (state) => {
    return getBookmarks(state).includes(canvasId);
};