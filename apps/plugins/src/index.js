import Mirador from 'mirador';
import plugins from './plugins';

//get the manifests from localstorage
const manifests = JSON.parse(localStorage.getItem('manifests')) || [];

//get the manifest from the URL
const urlParams = new URLSearchParams(window.location.search);
const manifest = urlParams.get('manifest');
if(manifest) {
    if(!manifests.includes(manifest)) {
        manifests.push(manifest);
        localStorage.setItem('manifests', JSON.stringify(manifests));
    }
}

const config = {
    id: 'mirador',
    catalog: manifests.map(manifest => ({ manifestId: manifest })),
    windows: manifest ? [
        {
            manifestId: manifest
        }
    ] : []
};

Mirador.viewer(config, plugins);