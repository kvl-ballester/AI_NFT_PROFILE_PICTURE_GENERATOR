import * as imageService from "../service/imageService"
import * as metadataService from "../service/metadataService"
import { useEffect, useState } from "react"
import './uploadToIPFS.css'
import ok from '../assets/ok.png'
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
        <div className="upload-to-ipfs">
            <h1>Upload To IPFS</h1>
            <p>The InterPlanetary File System (IPFS) is a set of composable, peer-to-peer protocols for addressing, routing, and 
                transferring content-addressed data in a decentralized file system. 
            </p>
            <div className="col upload-button">
                <div className="col name field">
                    <label htmlFor="">Image name</label>
                    <input type="text" placeholder="Image name" value={imageName} onChange={(e) => setImageName(e.target.value)}/>

                </div>
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
                {state.uploadedMetadata && state.fetchedMetadata  &&
                    <div className="response">
                        <div className="success-box row">
                            <div className="ok-logo">
                                <div className="logo-container">
                                    <img src={ok} alt="ok" />
                                </div>
                            </div>
                            <div className="info">
                                <h2>Success</h2>
                                <p>Your image and metadata have been uploaded successfully.</p>
                                <p>You can check them out in the following links.</p>
                                <div className="links row">
                                    <div className="image-link">
                                        <a href={`${state.fetchedMetadata.image}`} target="_blank" rel="noreferrer">Image </a>
                                    </div>
                                    <div className="metadata-link">
                                        <a href={`https://ipfs.io/ipfs/${state.uploadedMetadata.IpfsHash}`} target="_blank" rel="noreferrer">Metadata </a>
                                    </div>
                                </div>
                                
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


