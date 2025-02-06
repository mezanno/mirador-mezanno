import CustomView from './CustomView';
import GallicaViewer from './GallicaViewer';

export const WINDOW_TYPES = {
  GALLICA_EXPLORER: 'gallica-explorer',
  CUSTOM: 'custom',
  LIST_GALLERY: 'list-gallery'
};
//for each window type, define the component to be rendered

export const WINDOW_TARGETS = {
  [WINDOW_TYPES.GALLICA_EXPLORER]: <GallicaViewer />,
  [WINDOW_TYPES.CUSTOM]: <CustomView/>
};
