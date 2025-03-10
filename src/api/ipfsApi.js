
export async function getMetadataByCid(cid) {
    try {
        const response = await fetch(`${import.meta.env.VITE_IPFS_GATEWAY}/${cid}`)
        if (!response.ok) {
            throw new Error(`Error getting metadata: ${response.statusText}`);
        }
        const json = await response.json();
        console.log("json", json)
        return json;

    } catch (error) {
        throw new Error(`Error getting metadata: ${error.message}`);
    }
}


export async function uploadImageToIpfs(file) {

    const formData = new FormData();
    formData.append('image', file);

    try {
        let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/image`, {
            method: 'POST',
            body: formData
        })

        if (!response.ok) {
            throw new Error(`Error uploading image: ${response.statusText}`);
        }

        response = await response.json();
        return response

    } catch (error) {
        throw new Error(`Error uploding image: ${error.message}`);
        
    }
}

export async function uploadMetadataToIpfs(metadata) {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/metadata`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(metadata)
        })

        if (!response.ok) {
            throw new Error(`Error uploading metadata: ${response.statusText}`);
        }
        const json = await response.json();
        return json;

    } catch (error) {
        throw new Error(`Error uploading metadata: ${error.message}`);
    }
}
