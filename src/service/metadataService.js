import * as ipfsApi from '../api/ipfsApi';

export async function uploadMetadataToIpfs(metadata) {
    try {
        const response = await ipfsApi.uploadMetadataToIpfs(metadata);
        return response;
    } catch (error) {
        throw new Error(`Error al subir el archivo: ${error.message}`);
        
    }
}


export async function getMetadataByCid(cid) {
    try {
        const response = await ipfsApi.getMetadataByCid(cid);
        return response;
    } catch (error) {
        throw new Error(`Error al obtener el archivo: ${error.message}`);
    }
    
}
