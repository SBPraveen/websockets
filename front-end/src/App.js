import './App.css';
import { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client';
import WssComponent from './WssComponent';


function App() {
  const [outputData, setOutputData] = useState([])
  const [jobId, setJobId] = useState("")
  let socket = useRef(null);
  useEffect(() => {
    console.log("useEffectuseEffectuseEffectuseEffect")
    socket.current = io("ws://0.0.0.0:8081", {
      transports: ["websocket"],
      autoConnect: false
    });
  }, [])




  const onClickHttpCall = async () => {
    let apiDataCall = await fetch('http://0.0.0.0:8080/httpRoute?jobId=jobId')
    let apiDataCallJson = await apiDataCall.json()
    let httpData = [...outputData, apiDataCallJson.msg]
    setOutputData(httpData)
  }
  const onClickWebsocketCall = (e) => {
    socket.current.connect()
    socket.current.emit("generateChecklist", { jobId: jobId, timeStamp: Date.now() })
    socket.current.on("generateChecklistData", (data) => {
      setOutputData(outputData => [...outputData,data])
    })    
    socket.current.on("Done", (data) => {
      socket.current.removeListener("generateChecklistData");
    })    
  }

  const css = {
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"column",
  }

  return (
    <div className="App" style={css}>
      
      <input onChange={(e) => setJobId(e.target.value)} value={jobId}></input>
      <WssComponent outputData={outputData} onClickHttpCall={onClickHttpCall} onClickWebsocketCall={onClickWebsocketCall} />
    </div>
  );
}

export default App;
