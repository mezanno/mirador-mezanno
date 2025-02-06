import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import ToggleButton from '@mui/material/ToggleButton';
import { useDispatch, useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import { isBookmarked } from "../state/selectors/bookmarks";
import { addBookmark, removeBookmark } from "../state/reducers/bookmarks";

const BookmarkButton = styled(ToggleButton)(({ theme, selected }) => ({
    border: 'none',
    backgroundColor: 'transparent',
    '&.Mui-selected': {
        border: 'none',
        backgroundColor: 'transparent',
    },
    '&:hover': {
        backgroundColor: 'transparent',
    },
    position: 'absolute',
    top: '1px',
    right: '1px',
}));

const BookmarkNavigationControl = ({ windowId, canvas }) => {
    const dispatch = useDispatch();
    
    let currentCanvasId = useSelector(state => state.windows[windowId]?.canvasId);
    if(canvas) {
        currentCanvasId = canvas.id;
    }
    
    const bookmarked = useSelector(isBookmarked(currentCanvasId));
    const handleBookmarkChange = () => {
        if (bookmarked) {
            dispatch(removeBookmark({ canvasId: currentCanvasId }));
        } else {
            dispatch(addBookmark({ canvasId: currentCanvasId }));
        }
    };

    return (
        <BookmarkButton
            value="check"
            selected={bookmarked}
            onChange={handleBookmarkChange}
        >
            {bookmarked ?
                <BookmarkOutlinedIcon />
                :
                <BookmarkBorderOutlinedIcon />
            }
        </BookmarkButton>
    )
};

export default BookmarkNavigationControl;