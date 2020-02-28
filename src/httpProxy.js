import axios from "axios"
/**
 * HttpProxy
 */
class HttpProxy {
  constructor(baseURL){
    this.httpClient = axios.create({ baseURL }) // withCredentials: true
  }

  send(method, path, params, opts) {
    const paramsObj = { method, url: path, ...opts }
    if (params) {
      method === "get" ? paramsObj.params = params : paramsObj.data = params
    }
    return this.httpClient
      .request(paramsObj)
      .then(response => {
        return { result: response.data, status: response.status }
      }).catch(err => {
        console.error("HttpProxy", err.response && err.response.data && JSON.parse(err.response.data.message))
      })
  }
}

export default HttpProxy
