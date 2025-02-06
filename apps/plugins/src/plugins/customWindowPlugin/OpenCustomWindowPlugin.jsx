import { addWindow, MiradorMenuButton } from 'mirador';
import ReceiptLongSharpIcon from '@mui/icons-material/ReceiptLongSharp';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import SelectList from './SelectList';
import { useSelector } from 'react-redux';
import { getLists } from '../../state/selectors/lists';
import { useEffect } from 'react';

const DialogOpenList = ({ isOpen, handleClose, addWindow }) => {
  const [selectedListId, setSelectedListId] = useState(null);
  const lists = useSelector(getLists);

  useEffect(() => {
    if(selectedListId) {
      const list = selectedListId && lists.find(list => list.id === selectedListId);
        
      if(list) {
        const canvases = list?.content || [];
          
        const manifest = {
          "@context": "http://iiif.io/api/presentation/2/context.json",
          // "@id": "Test",
          // "@id": "https://gallica.bnf.fr/iiif/ark:/12148/bpt6k11620369/manifest.json",
          "@type": "sc:Manifest",
          "label": list.name,
          "sequences" : [{
            "canvases": canvases.map((canvas, index) => canvas.__jsonld),
            "label": "Current Page Order",
            "@type": "sc:Sequence",
            // "@id": "https://gallica.bnf.fr/iiif/ark:/12148/bpt6k11620369/sequence/default"
          }],
          // "thumbnail": {
          //   "@id": "https://gallica.bnf.fr/ark:/12148/bpt6k11620369.thumbnail"
          // }
        }
        const jsonContent = JSON.stringify(manifest);
        addWindow(jsonContent);
        handleClose();
      }
    }
  }, [selectedListId]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
    >
    <DialogTitle>Visualiser une liste</DialogTitle>
    <DialogContent>
      <SelectList selectedListId={selectedListId} setSelectedListId={setSelectedListId}/>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Annuler</Button>
      </DialogActions>
    </Dialog>
  )
}
//Plugin mettant à jour l'affichage des items de la liste des manifests
const OpenCustomWindowComponent = (props) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const children = props.children;
    const { addWindow } = props;

  return (
    <>
      <MiradorMenuButton
        onClick={() => setDialogOpen(true)}
        aria-label="Visualisation de listes"
      >
        <ReceiptLongSharpIcon />
      </MiradorMenuButton>
      <DialogOpenList isOpen={dialogOpen} handleClose={() => setDialogOpen(false)} addWindow={addWindow}/>      
      {children}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
    addWindow: (type) => {
      dispatch(addWindow({manifestId: type, view: 'gallery'}));
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
