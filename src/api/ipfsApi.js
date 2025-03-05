
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

        //TODO: CHANGE BACKEND TO RETURN A JSON WITH THE CID
        response = await response.text()
        return response

    } catch (error) {
        throw new Error(`Error uploding image: ${error.message}`);
        
    }
}
