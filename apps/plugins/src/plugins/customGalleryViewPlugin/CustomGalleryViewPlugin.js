import { selectionSlice } from "../../state/reducers/selection";
import CustomGalleryView from "./CustomGalleryView";
import { setCanvas, setWindowViewType, getWindow, getManifest } from "mirador";


const mapDispatchToProps = (dispatch, { canvas, id, windowId }) => ({
  focusOnCanvas: () => dispatch(setWindowViewType(windowId, 'single')),
  setCanvas: (...args) => dispatch(setCanvas(windowId, ...args)),
  getWindow,
  getManifest
});

const CustomGalleryViewPlugin = [
    {
      component: CustomGalleryView,
      mode: 'wrap',
      target: 'GalleryView',
      mapDispatchToProps,
      reducers: {
        selection: selectionSlice.reducer
      }
    }
  ];
  
  export default CustomGalleryViewPlugin;