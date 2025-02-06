import { Button, Icon, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { removeManifest, removeResource, addResource } from 'mirador';
import { deleteManifest } from "../../data/manifests";

//Plugin mettant à jour l'affichage des items de la liste des manifests
const ManifestListItemActionBar = (props) => {
    const children = props.children;
    const { manifestId, removeResource } = props;

    const handleClick = () => {
      if (manifestId) {
        removeResource();
      } else {
        console.error('Manifest ID is missing!');
      }
    }

  return (
    <div>
        <Button onClick={handleClick}>
            <Icon component={ClearIcon} color="error"/>
            <Typography color="error">Supprimer</Typography>
        </Button>
      {children}
    </div>
  );
};

// const mapStateToProps = (state, { windowId }) => ({
//   manifestId: getManifestoInstance(state, { windowId }).id,
// });

const mapDispatchToProps = (dispatch, {manifestId}) => ({
  removeResource: () => {
    //TODO: refactoriser dans un reducer
    deleteManifest(manifestId);
    return dispatch(removeResource(manifestId))
  },
  addResource: (manifestId) => dispatch(addResource(manifestId)),
});

const ManifestListItemPlugin = [
  {
    component: ManifestListItemActionBar,
    mode: 'wrap',
    target: 'ManifestListItem',
    // mapStateToProps: mapStateToProps
    mapDispatchToProps: mapDispatchToProps
  }
];

export default ManifestListItemPlugin;
