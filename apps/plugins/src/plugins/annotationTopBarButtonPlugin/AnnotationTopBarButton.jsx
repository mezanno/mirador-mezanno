import EditNoteIcon from '@mui/icons-material/EditNote';
import { MiradorMenuButton } from 'mirador';
import { useState } from 'react';

const AnnotationTopBarButton = ({ windowId, addCompanionWindow, removeCompanionWindow }) => {
    const [panelId, setPanelId] = useState('');

    const handleOpenAnnotationTool = () => {
        if(panelId !== '') {
            removeCompanionWindow(windowId, panelId);
            setPanelId('');
        } else {
            const action = addCompanionWindow(windowId, {
                content: 'annotation-tool-panel',
                position: 'right',
            });        
            setPanelId(action.id);
        }
    };

    return (
        <MiradorMenuButton
            onClick={handleOpenAnnotationTool}
            aria-label="Open annotation tool"
        >
            <EditNoteIcon />
        </MiradorMenuButton>
    );
};

export default AnnotationTopBarButton;