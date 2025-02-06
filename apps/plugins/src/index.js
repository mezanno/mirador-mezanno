import Mirador from 'mirador';
import plugins from './plugins';

const config = {
    id: 'mirador',
    windows: [
        {
            manifestId: 'https://gallica.bnf.fr/iiif/ark:/12148/bpt6k11620369/manifest.json'
        }
    ]
};

Mirador.viewer(config, plugins);