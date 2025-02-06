import { useSelector } from "react-redux";
import { getLists } from '../../state/selectors/lists';
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

const SelectList = ( { selectedListId, setSelectedListId } ) => {
  const lists = useSelector(getLists);

  return (
    <>
    {lists && lists?.length > 0 ? (
      <FormControl fullWidth>
        <InputLabel htmlFor="list-select-label">Liste</InputLabel>
        <Select
          labelId='list-select-label'
          label="Liste"
          onChange={(e) => setSelectedListId(e.target.value)}
          value={selectedListId}
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
    </>
  )
}

export default SelectList