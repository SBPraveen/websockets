 const httpRoute = {
    method: "GET",
    path: '/httpRoute',
    handler: (request,h) => {
        return {msg:"Duty api called by " + request.query.name}
    }
}
export default httpRoute