import * as imageService from "../service/imageService"
import * as metadataService from "../service/metadataService"
import { useEffect, useState } from "react"
import './uploadToIPFS.css'
import Spinner from "./Spinner"

export default function UploadToIPFS({prompt, state, dispatch}) {
    const [imageName, setImageName] = useState("")
    
    const handleClickUpload = async () => {
        try {
            dispatch({ type: 'UPLOAD_IMAGE' })
            const response = await imageService.uploadImageToIpfs(state.generatedImageBlob, imageName)
            dispatch({ type: 'UPLOAD_IMAGE_SUCCESS', payload: response })
        } catch (error) {
            dispatch({ type: 'UPLOAD_IMAGE_ERROR', payload: error.message })
            
        }
    }

    useEffect(() => {
        async function uploadImageMetadata() {
            if (!state.uploadedImageData ) return;
            
            const metadata = {
                name: state.uploadedImageData.Name,
                description: prompt,
                image: `https://ipfs.io/ipfs/${state.uploadedImageData.IpfsHash}`
            }

            try {
                dispatch({ type: 'UPLOAD_IMAGE_METADATA' })
                const response = await metadataService.uploadMetadataToIpfs(metadata)
                dispatch({ type: 'UPLOAD_IMAGE_METADATA_SUCCESS', payload: response })
                
            } catch (error) {
                dispatch({ type: 'UPLOAD_IMAGE_METADATA_ERROR', payload: error.message })
            }
        }

        uploadImageMetadata()

    }, [state.uploadedImageData])

    useEffect(() => {
        

        async function getMetadata() {
            if (!state.uploadedMetadata) return;

            try {
                dispatch({ type: 'GET_IMAGE_METADATA' })
                const data = await metadataService.getMetadataByCid(state.uploadedMetadata.IpfsHash)
                dispatch({ type: 'GET_IMAGE_METADATA_SUCCESS', payload: data })
            } catch (error) {
                dispatch({ type: 'GET_IMAGE_METADATA_ERROR', payload: error.message })
            }
        }
        
        getMetadata()
        
      
    }, [state.uploadedMetadata])


    
    const isButtonDisabled = () => {
        if (!state.generatedImageBlob ||
            state.isUploadingImage ||   
            state.uploadedImageData 
        ) {
            return true
        }

        return false
    }



    return (
        <div className="upload2ipfs">
            <h1>Upload To IPFS</h1>
            <p>The InterPlanetary File System (IPFS) is a set of composable, peer-to-peer protocols for addressing, routing, and 
                transferring content-addressed data in a decentralized file system. 
            </p>
            <div className="upload-button">
                <input type="text" placeholder="Image name" value={imageName} onChange={(e) => setImageName(e.target.value)}/>
                <button onClick={handleClickUpload} disabled={isButtonDisabled()} className="upload">
                    Upload
                </button>
            </div>
            <div className="result">
                {(state.isUploadingImage || state.isUploadingMetadata || state.isFetchingMetadata) && 
                    <div className="loading">
                        <Spinner text={!state.uploadedImageData ? "Uploading image ..." : "Uploading metadata ..."}/>
                    </div>
                }
                {state.uploadedMetadata && state.fetchedMetadata &&
                    <div className="response">
                        <div className="metadata card">
                            <div className="row">
                                <div className="col info">
                                    <div className="name">
                                        <label htmlFor="">Name</label>
                                        <input type="text" value={state.fetchedMetadata.name} readOnly={true} />
                                    </div>
                                    <div className="description">
                                        <label htmlFor="">Description</label>
                                        <textarea value={state.fetchedMetadata.description} readOnly={true}></textarea>
                                    </div>
                                    <div className="image">
                                        <label htmlFor="">Image</label>
                                        <input type="text" value={state.fetchedMetadata.image} readOnly={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="links">
                            <div className="image-link">
                                <a href={`${state.fetchedMetadata.image}`} target="_blank" rel="noreferrer">Image Link</a>
                            </div>
                            <div className="metadata-link">
                                <a href={`https://ipfs.io/ipfs/${state.uploadedMetadata.IpfsHash}`} target="_blank" rel="noreferrer">Metadata Link</a>
                            </div>
                        </div>
                    </div> 
                }
                {(state.imageUploadError || state.metadataUploadError) && 
                    <div className="error">
                        {`Error: ${state.imageUploadError}`}
                    </div> 
                }
            </div>
           

        </div>
    )
}