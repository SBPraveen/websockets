import config from "../config";
import Hapi from "@hapi/hapi"
import httpRoute from "./routes/httpRoute";
import SocketIO from "socket.io"

const initHttp = async () => {
    const server = Hapi.server({
        port : config.httpServerconfig.listenPort,
        host: config.httpServerconfig.listenHost,
        routes:{
            cors:{
                origin:[config.cors]
            }
        }
    })

    //routes
    server.route(httpRoute)

    await server.start()
    console.log(`Server running on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
    console.log("Problem while starting the server: " + err)
    process.exit(1)
})

initHttp()

const initWebsockets = async () => {
    const server = Hapi.server({
        port : config.websocketServerconfig.listenPort ,
        host: config.websocketServerconfig.listenHost,
        routes:{
            cors:{
                origin:["http://localhost:3000"]
            }
        }
    })

    const io = SocketIO(server.listener, {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"]
        }
      })

    let jobId=""
    let timeStamp=""

    io.on('connection', (socket) => {
        console.log('connected');  
        socket.on('generateChecklist', (data) => {
            console.log('generateChecklist========================'); 
            jobId = data.jobId
            timeStamp = data.timeStamp  
            let i= 0
            const setInter = setInterval(()=>{
                if(i === 4){
                    clearInterval(setInter)
    
                }
                let msg = ""
                switch(i){
                    case 0:
                        msg = "duty result";
                        break;
                    case 1:
                        msg = "checklist result";
                        break;
                    case 2:
                        msg = "flatfile result";
                        break;
                    default:
                        msg = "All calls are over"
                }
                socket.emit("generateChecklistData" ,msg);
                i += 1
            }, 1000)     
        });   
    });




    // io.on("connection", function (socket) {

    //     console.log('connected');
    
    //      Do all the socket stuff here.
    
    // })
    

    await server.start()
    console.log(`Websocket server running on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
    console.log("Problem while starting the server: " + err)
    process.exit(1)
})

initWebsockets()

