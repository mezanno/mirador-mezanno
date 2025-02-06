import { addWindow, MiradorMenuButton } from 'mirador';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ReceiptLongSharpIcon from '@mui/icons-material/ReceiptLongSharp';
import { WINDOW_TYPES } from "./CustomWindowConstants";

//Plugin mettant à jour l'affichage des items de la liste des manifests
const OpenCustomWindowComponent = (props) => {
    const children = props.children;
    const { addWindow } = props;

    const handleOpenListGallery = () => {
        addWindow(WINDOW_TYPES.LIST_GALLERY);
    }

  return (
    <>
      <MiradorMenuButton
        onClick={handleOpenListGallery}
        aria-label="Visualisation de listes"
      >
        <ReceiptLongSharpIcon />
      </MiradorMenuButton>
      
      {children}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
    addWindow: (type) => {
      dispatch(addWindow({manifestId: type}));
    }
});

const OpenCustomWindowPlugin = [
  {
    component: OpenCustomWindowComponent,
    mode: 'wrap',
    target: 'WorkspaceMenu',
    mapDispatchToProps: mapDispatchToProps
  }
];

export default OpenCustomWindowPlugin;
