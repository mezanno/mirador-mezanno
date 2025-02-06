import Mirador from 'mirador';

console.log('Mirador', Mirador.viewer);

const config = {
    id: 'mirador',
    windows: [
        {
            manifestId: 'https://gallica.bnf.fr/iiif/ark:/12148/bpt6k11620369/manifest.json'
        }
    ]
};

Mirador.viewer(config);