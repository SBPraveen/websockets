const WssComponent = ({onClickHttpCall, onClickWebsocketCall, outputData}) => {
    const buttonCss = {
        margin: "1rem",
        display:"flex",
        width: "38vw",
        alignItems:"center",
        justifyContent:"space-between",
        
      }
    return(
        <>
        
      <div style={buttonCss}>
      <button onClick={onClickHttpCall}>http call</button>
      <button onClick={onClickWebsocketCall}>Call websocket</button>
      </div>
      
      <p>Output</p>
      {outputData.length > 0 && outputData.map((wsData) => {
        return (
          <p key={Math.random()}>{wsData}</p>
        )
      })}

        </>
    )
}

export default WssComponent