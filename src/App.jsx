import { useState, useReducer } from 'react'
import ImageGenerator from './components/ImageGenerator'
import { AI_API } from './components/ImageGenerator'
import './App.css'


function reducer(state, action) {
  switch (action.type) {
    case 'GENERATE_IMAGE':
      return {
        ...state,
        isImageGenerationLoanding: true,
        imageGenerationError: null
      }
    case 'GENERATE_IMAGE_SUCCESS':
      return {
        ...state,
        isImageGenerationLoanding: false,
        imageGeneratedUrl: action.payload
      }
    case 'GENERATE_IMAGE_ERROR':
      return {
        ...state,
        isImageGenerationLoanding: false,
        imageGenerationError: action.payload
      }
    default:
      return state
  }
}


function App() {
  const [apiUrl, setApiUrl] = useState(AI_API[0].api)
  const [prompt, setPrompt] = useState("a monkey with a real madrid tshirt")

  const [state, dispatch] = useReducer(reducer, {
    isImageGenerationLoanding: false,
    imageGenerationError: null,
    imageGeneratedUrl: null
  })

  


  return (
    <div className="app main">
      <h1>AI NFT GENERATOR</h1>
      <ImageGenerator state={state} dispatch={dispatch} apiUrl={apiUrl} setApiUrl={setApiUrl} 
        prompt={prompt} setPrompt={setPrompt} 
      />
      

      
    </div>
  )
}

export default App
