import { listsSlice } from "../../state/reducers/lists";
import listsSaga from "../../state/sagas/lists";
import { WINDOW_TARGETS } from "./CustomWindowConstants";

const CustomWindow = (props) => {    
    const children = props.children;    
    const { manifestId } = props;    
    
    let content = WINDOW_TARGETS[manifestId] || children;
    return (
      <>
        {content}
      </>
    );
};

const mapStateToProps = (state, { windowId }) => ({
    manifestId: state.windows[windowId]?.manifestId || "Aucun manifest",
});

const CustomWindowPlugin = [
    {
      component: CustomWindow,
      mode: 'wrap',
      target: 'Window',
      mapStateToProps,
      reducers: {
          lists: listsSlice.reducer
      },
      saga: listsSaga
    }
  ];
  
export default CustomWindowPlugin;

