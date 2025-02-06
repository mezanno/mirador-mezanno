import { bookmarksSlice } from '../../state/reducers/bookmarks';
import BookmarkNavigationControl from '../../common/BookmarkNavigationControl';
import bookmarkSaga from '../../state/sagas/bookmarks';

/**
 * Plugin for the WindowCanvasNavigationControls to add a bookmark button to the navigation controls.
 */
const WindowCanvasNavigationControlsPlugin = [
    {
        component: BookmarkNavigationControl,
        mode: 'add',
        target: 'WindowCanvasNavigationControls',
        reducers: {
            bookmarks: bookmarksSlice.reducer
        },
        saga: bookmarkSaga
    }
];

export default WindowCanvasNavigationControlsPlugin;