import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { GalleryViewThumbnail } from 'mirador';
import { useEffect, useRef, useState } from 'react';
import Selecto from 'react-selecto';
import BookmarkNavigationControl from '../../common/BookmarkNavigationControl';
import { useDispatch, useSelector } from 'react-redux';
import { setSelection } from '../../state/reducers/selection';
import { getLists } from '../../state/selectors/lists';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

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

const ListGalleryView = ({ windowId }) => {
//   const htmlDir = viewingDirection === 'right-to-left' ? 'rtl' : 'ltr';
  const containerRef = useRef(null);
  const [selected, setSelected] = useState([]);
  const [canvases, setCanvases] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const dispatch = useDispatch();

  const lists = useSelector(getLists);

  useEffect(() => {
    if(selectedList) {
      setCanvases(selectedList && lists.find(list => list.id === selectedList)?.content || []);
    }
  }, [selectedList]);
  
  return (
    <>
    <h1>Gestion</h1>
    {lists && lists?.length > 0 ? (
      <FormControl fullWidth>
        <InputLabel htmlFor="list-select-label">Liste</InputLabel>
        <Select
          labelId='list-select-label'
          label="Liste"
          onChange={(e) => setSelectedList(e.target.value)}
          value={selectedList}
        >
          {lists.map(list => (
            <MenuItem key={list.id} value={list.id}>
              <Typography>
                {list.name} {list.content.length > 0 ? `(contient ${list.content.length} élément(s))` : '(ne contient aucun élément)'}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      ) : ( <Typography>Vous n'avez pas encore de liste</Typography>)
    }
    <Root
      component="section"
      aria-label="gallery section"
    //   dir={htmlDir}
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
        onSelect={e => {
          setSelected(e.selected.map(el => el.dataset.index));
          dispatch(setSelection(e.selected.map(el => el.dataset.canvas)));
        }}
      />
      {canvases?.length > 0 &&
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
            //   setCanvas={setCanvas}
            //   focusOnCanvas={focusOnCanvas}
            />
            <div>
              <BookmarkNavigationControl windowId={windowId} canvas={canvas} />
            </div>
          </SelectableItem>
        ))
      }

    </Root>
    </>
  );
}

export default ListGalleryView