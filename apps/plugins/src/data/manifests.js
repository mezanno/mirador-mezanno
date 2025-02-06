const getManifests = () => {
    return JSON.parse(localStorage.getItem('miradorManifests') || '[]');
};

const addManifestToCollection = (manifestId) => {
    const manifests = getManifests();
    if (!manifests.find(m => m.id === manifestId)) {
        manifests.push({id: manifestId});
        localStorage.setItem('miradorManifests', JSON.stringify(manifests));
    }
    return manifests;
};

const deleteManifest = (manifestId) => {
    const manifests = getManifests();
    const others = manifests.filter(m => m.id !== manifestId);
    localStorage.setItem('miradorManifests', JSON.stringify(others));
    return others;
};

export { getManifests, addManifestToCollection as addManifest, deleteManifest };