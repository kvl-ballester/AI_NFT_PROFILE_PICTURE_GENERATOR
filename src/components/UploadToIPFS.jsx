import * as imageService from "../service/imageService"
import { useEffect, useState } from "react"
import './uploadToIPFS.css'

export default function UploadToIPFS({state, dispatch}) {
    const [dots, setDots] = useState("")
    const [imageName, setImageName] = useState("")
    const handleClickUpload = async () => {
        try {
            dispatch({ type: 'UPLOAD_IMAGE' })
            const cid = await imageService.uploadImageToIpfs(state.imageGeneratedBlob, imageName)
            dispatch({ type: 'UPLOAD_IMAGE_SUCCESS', payload: cid })
        } catch (error) {
            dispatch({ type: 'UPLOAD_IMAGE_ERROR', payload: error.message })
            
        }
    }

    useEffect(() => {
        const id =  setInterval(() => {
            setDots(value => {
                if (value.length === 3) {
                    return ""
                }
                
                return value + "."
            })
          }, 500)
        
        return () => clearInterval(id)
      
    }, [state.isImageUploading])
    
    const isButtonDisabled = () => {
        if (state.imageUploadedCid || !state.imageGeneratedBlob || state.isImageUploading) {
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
                    {!state.isImageUploading && !state.imageUploadedCid && 'Upload'}
                    {state.isImageUploading && <div className="loading-message">
                        Uploding {dots}
                    </div> }
                    {state.imageUploadedCid && 'Uploaded'}

                </button>
            </div>
            <div className="result">
                {state.imageUploadedCid && <div className="ipfs-image-link">
                    Uploaded with success: <a href={`https://ipfs.io/ipfs/${state.imageUploadedCid}`} target="_blank" rel="noreferrer">https://ipfs.io/ipfs/{state.imageUploadedCid}</a>
                </div> }
                {state.imageUploadError && <div className="error">
                    {`Error: ${state.imageUploadError}`}
                </div> }
            </div>
           

        </div>
    )
}