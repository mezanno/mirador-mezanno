import React from 'react'
import { useRef } from 'react'

const GallicaViewer = () => {
    const iframeRef = useRef(null);

    const handleClick = () => {
        console.log(iframeRef.current.contentWindow.location.href);
        
    };

    return (
        <div style={{ width: '100%', height: '100%', border: 'none' }}>
        <div>
            <button onClick={handleClick}>Test</button>
        </div>
        <iframe
            ref={iframeRef}
            title="Gallica Viewer"
            src="https://gallica.bnf.fr/services/engine/search/sru"
            style={{ width: '100%', height: '100%', border: 'none' }}
        />
        </div>
    )
}

export default GallicaViewer