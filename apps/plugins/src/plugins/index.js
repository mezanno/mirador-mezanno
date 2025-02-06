import AnnotationToolPanelPlugin from "./annotationToolPanelPlugin/AnnotationToolPanelPlugin";
import AnnotationTopBarButtonPlugin from "./annotationTopBarButtonPlugin/AnnotationTopBarButtonPlugin";
import ManifestListItemPlugin from "./manifestListItemPlugin/ManifestListItemPlugin";
import WindowCanvasNavigationControlsPlugin from "./windowCanvasNavigationControlsPlugin/WindowCanvasNavigationControlsPlugin";
import OpenCustomWindowPlugin from "./customWindowPlugin/OpenCustomWindowPlugin";
import CustomWindowPlugin from "./customWindowPlugin/CustomWindowPlugin";
import CustomGalleryViewPlugin from "./customGalleryViewPlugin/CustomGalleryViewPlugin";

const plugins = [ OpenCustomWindowPlugin, CustomWindowPlugin, AnnotationToolPanelPlugin, 
    AnnotationTopBarButtonPlugin, ManifestListItemPlugin, WindowCanvasNavigationControlsPlugin,
CustomGalleryViewPlugin ];


export default plugins;