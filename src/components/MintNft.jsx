import "./mintNft.css";
export default function MintNft({state, dispatch}) {

    return (
        <div className="mint-nft">
            <h1>MINT NFT</h1>
            <MetadataCard 
                name={state.fetchedMetadata.name} 
                description={state.fetchedMetadata.description} 
                imageUrl={state.fetchedMetadata.image}
            />
            <button onClick={() => dispatch({ type: 'MINT_NFT' })}>Mint NFT</button>
        </div>
    )
}




function MetadataCard({name, description, imageUrl}) {
    return (
        <div className="metadata card">
            <div className="row">
                <div className="col info">
                    <div className="col name">
                        <label htmlFor="">Name</label>
                        <input type="text" value={name} disabled={true} />
                    </div>
                    <div className="col description">
                        <label htmlFor="">Description</label>
                        <textarea value={description} disabled={true}></textarea>
                    </div>
                    <div className="col image">
                        <label htmlFor="">Image</label>
                        <textarea type="text" value={imageUrl} disabled={true} ></textarea>
                    </div>
                </div>
                <div className="col image">
                    <img src={imageUrl} alt={imageUrl} />
                </div>
            </div>
        </div>
    )
}