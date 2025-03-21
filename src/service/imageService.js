import { AI_API } from '../components/ImageGenerator';
import * as ipfsApi from '../api/ipfsApi';



export async function generateImage(apiUrl, body) {
    const api = AI_API.find(ai => ai.api === apiUrl)

    const headers =  { 
        Authorization: `Bearer ${api.key}`, 
        Accept: "image/*" 
    }

    const formData = new FormData();
    formData.append('prompt', body.prompt);

    try {
        const response = await fetch(api.url, {
            method: 'POST',
            headers: headers,
            body: formData
        })

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.statusText}`);
        }

        const blob = await response.blob();
        return blob
        
    } catch (error) {
        throw new Error(`Error en la API: ${error.message}`);
    }

}

export async function uploadImageToIpfs(blob, imageName) {
    if (!imageName) {
        imageName = `image-${Date.now()}`
    }

    try {
        const filename = createFilename(blob, imageName);
        const file = new File([blob], filename, { type: blob.type });
        const response = await ipfsApi.uploadImageToIpfs(file);
        return response;

    } catch (error) {
        throw new Error(`Error al subir el archivo: ${error.message}`);
    }
    

}



function createFilename(blob, name) {
    const extension = blob.type.split('/')[1];
    return `${name}.${extension}`
    
}


