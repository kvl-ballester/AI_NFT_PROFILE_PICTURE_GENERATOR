import { AI_API } from '../components/ImageGenerator';

export default async function generateImage(apiUrl, body) {
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
        return URL.createObjectURL(blob)
        
    } catch (error) {
        throw new Error(`Error en la API: ${error.message}`);
    }

}