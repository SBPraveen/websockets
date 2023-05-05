 const httpRoute = {
    method: "GET",
    path: '/httpRoute',
    handler: (request,h) => {
        return {msg:"Duty api called by jobId: " + request.query.jobId}
    }
}
export default httpRoute