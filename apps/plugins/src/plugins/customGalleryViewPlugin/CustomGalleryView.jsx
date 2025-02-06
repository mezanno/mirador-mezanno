import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { GalleryViewThumbnail } from 'mirador';
import { useRef, useState } from 'react';
import Selecto from 'react-selecto';
import BookmarkNavigationControl from '../../common/BookmarkNavigationControl';
import { useDispatch, useSelector } from 'react-redux';
import { setSelection } from '../../state/reducers/selection';

const Root = styled(Paper, { name: 'GalleryView', slot: 'root' })(({ theme }) => ({
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflowX: 'hidden',
    overflowY: 'scroll',
    padding: '50px 0 50px 20px',
    width: '100%',
  }));

const SelectableItem = styled('div', { name: 'SelectableItem', slot: 'root' })`
  position: relative;
  background-color: ${(props) => (props.selected ? props.theme.palette.primary.main : '')};
`;

const CustomGalleryView = ({ canvases, viewingDirection = '', windowId, setCanvas, focusOnCanvas, getWindow, getManifest }) => {   
    const htmlDir = viewingDirection === 'right-to-left' ? 'rtl' : 'ltr';
    const containerRef = useRef(null);
    const [selected, setSelected] = useState([]);
    
    const dispatch = useDispatch();

    const window = useSelector(state => getWindow(state, { windowId }));
    const manifestId = window.manifestId;
    const manifest = useSelector(state => getManifest(state, { manifestId, windowId }));
    console.log("manifest: ", manifest);
    

    // console.log("CustomGalleryView - canvases", canvases);
 
    const topLevelCanvases = canvases.map((c) => {
      return {
        ...c,
        options: undefined
      }
    });
    // console.log("CustomGalleryView - topLevelCanvases", topLevelCanvases);
    
    const handleSelect = (e) => {
      setSelected(e.selected.map(el => el.dataset.index));

      //enregistre la selection dans le store
      const selectedCanvasIndexes = e.selected.map(el => el.dataset.canvas);
      const selection = topLevelCanvases.filter((c) => selectedCanvasIndexes.includes(c.id.toString()));
      dispatch(setSelection(selection));
    }

    return (
      <Root
        component="section"
        aria-label="gallery section"
        dir={htmlDir}
        square
        elevation={0}
        id={`${windowId}-gallery`}
        ref={containerRef}
      >
        <Selecto 
          container={containerRef.current}
          selectableTargets={['.selectable-item']}
          selectByClick={true}
          selectFromInside={true}
          toggleContinueSelect={["shift"]}
          hitRate={0}
          onSelect={handleSelect}
        />
        {
          canvases.map((canvas, index) => (
            <SelectableItem 
              key={index} 
              data-index={index}
              data-canvas={canvas.id}
              className="selectable-item" 
              selected={selected.includes(index.toString())}
            >
              <GalleryViewThumbnail
                windowId={windowId}
                canvas={canvas}
                setCanvas={setCanvas}
                focusOnCanvas={focusOnCanvas}
              />
              <div>
                <BookmarkNavigationControl windowId={windowId} canvas={canvas} />
              </div>
            </SelectableItem>
          ))
        }

      </Root>
    );
};

CustomGalleryView.propTypes = {
    canvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    viewingDirection: PropTypes.string,
    windowId: PropTypes.string.isRequired,
};

export default CustomGalleryView