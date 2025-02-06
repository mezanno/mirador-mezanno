import { useDispatch, useSelector } from "react-redux";
import { getLists } from "../../state/selectors/lists";
import { getSelection } from "../../state/selectors/selection";
import { Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Icon, TextField, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { v4 as uuid } from 'uuid';
import { addList, addSelectionToList, removeList, updateList, removeSelectionFromList } from "../../state/reducers/lists";
import { useState } from "react";

const AnnotationToolPanel = () => {  
  const selection = useSelector(getSelection);
  const lists = useSelector(getLists);
  
  //return the common ids between the list and the current selection
  const getCommonIds = (list, selection) => {
    const listCanvasIds = list.content.map(item => item.id);
    const selectionCanvasIds = selection.map(item => item.id);
    
    return listCanvasIds.filter(id => selectionCanvasIds.includes(id));
  }

  const handleRemoveSelectionFromList = (list, selection) => {
    const commonIds = getCommonIds(list, selection);
    dispatch(removeSelectionFromList({ listId: list.id, idsToRemove: commonIds }));
  }

  const dispatch = useDispatch();

  const [editedList, setEditedList] = useState(null);
  const listDialogOpen = editedList !== null;

  const handleCreateList = () => {
    const newList = {
      id: uuid(),
      name: 'Nouvelle liste',
      content: []
    };
    dispatch(addList({ newList }));
  };

  const handleCreateListFromSelection = () => {
    const newList = {
      id: uuid(),
      name: 'Nouvelle liste',
      content: selection
    };
    dispatch(addList({ newList }));
  }

  const handleAddSelectionToList = (listId) => {
    // alert(JSON.stringify(selection));
    console.log(selection);
    
    dispatch(addSelectionToList({ listId, selection }));
  };

  const handleDeleteList = (listId) => {
    dispatch(removeList({ listId }));
  }

  const handleSaveEditedList = () => {    
    dispatch(updateList({ updatedList: editedList }));

    setEditedList(null);
  }

    return (
      <div style={{ background: 'white', padding: '10px'}}>
        <Typography>
          Vous avez actuellement <span style={{ fontWeight: 'bold' }}>{lists.length}</span> liste(s).
        </Typography>
        <Divider style={{ margin: '10px 0' }} />
        <div>
          <Button variant="text" color="primary" onClick={handleCreateList}>
            <Typography>Créer une liste</Typography>
          </Button>
          <br/>
          {selection && selection.length > 0 &&
            <Button variant="text" color="primary" onClick={handleCreateListFromSelection}>
              <Typography>Créer une liste à partir de ces <span style={{ fontWeight: 'bold' }}>{selection.length}</span> élément(s)</Typography>
            </Button>
          }
        </div>
        <Divider style={{ margin: '10px 0' }} />
        <div>
          {lists.map(list => (
          <div key={list.id}>
            <Card style={{ margin: '10px 0', padding: '10px' }}>
              <CardHeader
                title={list.name}
                action={
                  <Button onClick={() => setEditedList(list)}><Icon component={EditOutlinedIcon}/></Button>
                }
              />
              <CardContent>
                {list.content && list.content.length > 0 ? (
                  <Typography>Contient <span style={{ fontWeight: 'bold' }}>{list.content.length}</span> éléments</Typography>
                ) : (
                <Typography>Aucun élément</Typography>
                )}
                {selection && selection.length > 0 &&
                  <Button variant="text" color="primary" onClick={() => handleAddSelectionToList(list.id)}>
                  <Typography>Ajouter <span style={{ fontWeight: 'bold' }}>{selection.length}</span> élément(s) à la sélection</Typography>
                  </Button>
                }
                <br/>
                {getCommonIds(list, selection).length > 0 && (
                  <Button variant="text" color="error" onClick={() => handleRemoveSelectionFromList(list, selection)}>
                    <Typography color="error">Retirer <span>{getCommonIds(list, selection).length}</span> élément(s) de la sélection</Typography>
                  </Button>
                )}
              </CardContent>
              <CardActions>
                <Button onClick={() => handleDeleteList(list.id)} size="small">
                    <Icon component={DeleteOutlineOutlinedIcon}/>
                </Button>
              </CardActions>
            </Card>
          </div>
          ))}
        </div>
        <Dialog open={listDialogOpen} onClose={() => setEditedList(null)}>
          <DialogTitle><Icon component={EditOutlinedIcon}/></DialogTitle>
          <DialogContent>
            <TextField 
              autoFocus
              required
              margin="dense"
              id="name"
              label="Nom de la liste"
              type="text"
              fullWidth
              variant="standard"
              value={editedList ? editedList.name : ''}
              onChange={(e) => setEditedList({ ...editedList, name: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditedList(null)}>Annuler</Button>
            <Button type="submit" onClick={handleSaveEditedList}>Enregistrer</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  };

const AnnotationToolPanelPlugin = [
    {
        component: AnnotationToolPanel,
        mode: 'add',
        companionWindowKey: 'annotation-tool-panel',
        target: 'AnnotationSettings',
    }
];

export default AnnotationToolPanelPlugin;