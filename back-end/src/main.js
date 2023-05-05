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
                origin:["*"]
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

    io.on('connection', (socket) => {
        console.log('connected and no of clients connected', io.engine.clientsCount);  
        socket.on('generateChecklist', (data) => {
            let jobId = data.jobId
            let timeStamp = data.timeStamp  
            let i= 0
            const setInter = setInterval(()=>{
                if(i === 5){
                    clearInterval(setInter)
                }
                let msg = ""
                switch(i){
                    case 0:
                        msg = `Duty api called for the job ${jobId} and timestamp is ${timeStamp}`;
                        break;
                    case 1:
                        msg = `Job service and job item service called for the job ${jobId} and timestamp is ${timeStamp}`;
                        break;
                    case 2:
                        msg = `Checklist api called for the job ${jobId} and timestamp is ${timeStamp}`;
                        break;
                    case 3:
                        msg = `Flatfile api called for the job ${jobId} and timestamp is ${timeStamp}`;
                        break;
                    case 4:
                        msg = `Checklist history called for the job ${jobId} and timestamp is ${timeStamp}`;
                        break;
                    default:
                        msg = `Done`
                }
                if( msg === `Done`){
                    socket.emit("Done" ,msg);
                    socket.disconnect(true)
                }
                else{
                    socket.emit("generateChecklistData" ,msg);
                }
                
                i += 1
            }, 1000)     
        });   
    });

    await server.start()
    console.log(`Websocket server running on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
    console.log("Problem while starting the server: " + err)
    process.exit(1)
})

initWebsockets()

