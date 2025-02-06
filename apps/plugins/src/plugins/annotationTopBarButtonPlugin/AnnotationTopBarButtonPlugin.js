import AnnotationTopBarButton from "./AnnotationTopBarButton";
import { addCompanionWindow, removeCompanionWindow } from 'mirador';

const mapDispatchToProps = {
    addCompanionWindow,
    removeCompanionWindow
};

const AnnotationTopBarButtonPlugin = [
    {
        component: AnnotationTopBarButton,
        mode: 'add',
        target: 'WindowTopBarPluginArea',
        mapDispatchToProps,
    }
];

export default AnnotationTopBarButtonPlugin;