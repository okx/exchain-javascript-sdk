import axios from "axios";

class RpcProxy {
    constructor(baseURL){
        this.httpClient = axios.create({ baseURL }) // withCredentials: true
    }

    send(method, path, params, opts) {
        const paramsObj = { method, url: path, ...opts }
        console.log(paramsObj)
        if (params) {
            method === "get" ? paramsObj.params = params : paramsObj.data = params
        }
        return this.httpClient
            .request(paramsObj)
            .then(response => {

                if (method === 'get')  {
                    return { result: response.data, status: response.status }
                }
                return response.data
            }).catch(err => {
                let fmtResponse = {
                    jsonrpc: "2.0",
                    id: '0',
                    err: {
                        code: -1,
                        message: err.response,
                        data: ''
                    }
                }
                console.log(err)
                return fmtResponse
            })
    }
}

export default RpcProxy