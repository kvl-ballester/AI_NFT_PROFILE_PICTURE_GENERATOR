import generateImage from '../service/imageService'
import Spinner from './Spinner'
import './imageGenerator.css'


export const AI_API = [{
  name: 'Stability AI',
  url: 'https://api.stability.ai/v2beta/stable-image/generate/core',
  key: import.meta.env.VITE_STABILITY_API_KEY
}, {
  name: 'AI 2',
  url: 'https://api.ai2.com'
}, {
  name: 'AI 3',
  url: 'https://api.ai3.com'
}]

export default function ImageGenerator({
  state,
  dispatch,
  apiUrl,
  setApiUrl,
  prompt,
  setPrompt,
}) {

  const handleClickGenerate = async () => {
    
    try {
      dispatch({ type: 'GENERATE_IMAGE' })
      const body = {
        prompt
      }
      const imageGeneratedUrl = await generateImage(apiUrl, body)
      dispatch({ type: 'GENERATE_IMAGE_SUCCESS', payload: imageGeneratedUrl })
    } catch (error) {
      dispatch({ type: 'GENERATE_IMAGE_ERROR', payload: error.message })
    }

  }

  return (
    <div className="image-generator">
      <div className="ai row">
        <div className="prompt col">
          <label htmlFor="">Prompt</label>
          <textarea type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </div>
        <div className="ai-api col">
          <label htmlFor="">AI</label>
          <select value={apiUrl} onChange={(e) => { setApiUrl(e.target.value) }} >
            {AI_API.map((ai, index) => {
              return <option key={index} value={ai.api}>{ai.name}</option>
            })}
          </select>
        </div>
      </div>
      <div className="generate-button row">
        <button onClick={handleClickGenerate}  className="generate">
          Generate
        </button>
      </div>
      <div className="image-generated">
        {state.isImageGenerationLoanding && <Spinner />}
        {state.imageGenerationError && <div className="error">{state.imageGenerationError}</div>}
        {!state.isImageGenerationLoanding && state.imageGeneratedUrl && <img src={state.imageGeneratedUrl} width={"300"} alt="Generated Image" />}
      </div>
      
    </div>
  )
}