import { useState, useReducer } from 'react'
import ImageGenerator from './components/ImageGenerator'
import { AI_API } from './components/ImageGenerator'
import './App.css'
import UploadToIPFS from './components/UploadToIPFS'
import MintNft from './components/MintNft'
import Header from './components/Header'


function reducer(state, action) {
  switch (action.type) {
    case 'GENERATE_IMAGE':
      return {
        ...state,
        isGeneratingImage: true,
        imageGenerationError: null
      }
    case 'GENERATE_IMAGE_SUCCESS':
      return {
        ...state,
        isGeneratingImage: false,
        generatedImageBlob: action.payload
      }
    case 'GENERATE_IMAGE_ERROR':
      return {
        ...state,
        isGeneratingImage: false,
        imageGenerationError: action.payload
      }
    
    case 'UPLOAD_IMAGE':
      return {
        ...state,
        isUploadingImage: true,
        imageUploadError: null
      }
    case 'UPLOAD_IMAGE_SUCCESS':
      return {
        ...state,
        isUploadingImage: false,
        uploadedImageData: action.payload
      }
    case 'UPLOAD_IMAGE_ERROR':
      return {
        ...state,
        isUploadingImage: false,
        imageUploadError: action.payload
      }
    case 'UPLOAD_IMAGE_METADATA':
      return {
        ...state,
        isUploadingMetadata: true,
        metadataUploadError: null
      }
    case 'UPLOAD_IMAGE_METADATA_SUCCESS':
      return {
        ...state,
        isUploadingMetadata: false,
        uploadedMetadata: action.payload
      }
    case 'UPLOAD_IMAGE_METADATA_ERROR':
      return {
        ...state,
        isUploadingMetadata: false,
        metadataUploadError: action.payload
      }
    case 'GET_IMAGE_METADATA':
      return {
        ...state,
        isFetchingMetadata: true,
        fetchMetadataError: null
      }
    case 'GET_IMAGE_METADATA_SUCCESS':
      return {
        ...state,
        isFetchingMetadata: false,
        fetchedMetadata: action.payload
      }
    case 'GET_IMAGE_METADATA_ERROR':
      return {
        ...state,
        isFetchingMetadata: false,
        fetchMetadataError: action.payload
      }
    default:
      return state
  }
}


function App() {
  const [apiUrl, setApiUrl] = useState(AI_API[0].api)
  const [prompt, setPrompt] = useState("a monkey with a real madrid tshirt")

  const [state, dispatch] = useReducer(reducer, {
    //Image Generation
    isGeneratingImage: false,
    imageGenerationError: null,
    generatedImageBlob: null,
    //Response from uploading-file operation
    isUploadingImage: false,
    uploadedImageData: null,
    imageUploadError: null,
    //Response from uploading-json operation
    isUploadingMetadata: false,
    uploadedMetadata: null,
    metadataUploadError: null,
    //Metadata itself
    isFetchingMetadata: false,
    fetchedMetadata: null,
    fetchMetadataError: null
  })

  return (
    <div className="app main">
      <Header />
      <h1>AI NFT GENERATOR</h1>
      <ImageGenerator state={state} dispatch={dispatch} apiUrl={apiUrl} setApiUrl={setApiUrl} 
        prompt={prompt} setPrompt={setPrompt} 
      />
      {state.generatedImageBlob && 
        <UploadToIPFS prompt={prompt} state={state} dispatch={dispatch}/>
      }

      {state.fetchedMetadata && 
        <MintNft state={state} dispatch={dispatch}/>
      }

    </div>
  )
}

export default App
