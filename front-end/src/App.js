import './App.css';
import {useState, useEffect} from 'react'
import io from 'socket.io-client';


function App() {
  const [apiData, setApiData] = useState("")
  const [webSocketData, setWebSocketData] = useState("")
  const [jobId, setjobId] = useState("")
  let socket
  useEffect(()=>{
   socket = io.connect("ws://0.0.0.0:8081", {
      transports: ["websocket", "polling"]
    });
  },[])
  
    


  const onClickHttpCall = async() => {
    let apiDataCall = await fetch('http://0.0.0.0:8080/httpRoute?name=SB')
    let apiDataCallJson =  await apiDataCall.json()
    console.log("apiDataCallJson", apiDataCallJson)
    setApiData(apiDataCallJson.msg)
  }
  const onClickWebsocketCall = (e) => {
    e.preventDefault();
    socket.emit("generateChecklist", {jobId:"1234asdf", timeStamp:"98712340"})
    e.preventDefault();
    socket.on("generateChecklistData",(data)=>{
      console.log("generateChecklistData88888888888888888888", data)
      setWebSocketData(data)
    })
  }

  return (
    <div className="App">
      <input onChange={()=>setjobId(e.target.value)} value={jobId}></input>
      <button onClick={onClickHttpCall}>http call</button>
      <p>{apiData? apiData : "http not called"}</p>
      <button onClick={onClickWebsocketCall}>Call websocket</button>
      <p>{webSocketData? webSocketData : "WSS not called"}</p>
    </div>
  );
}

export default App;
