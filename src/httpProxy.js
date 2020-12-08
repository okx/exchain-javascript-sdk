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
        if (method === 'get')  {
          return { result: response.data, status: response.status }
        }
        let fmtResponse = {
          code: 0,
          data: null,
          msg: 'success',
          detail_msg: ''
        }
        const data = response.data || null;
        if (data.code) {
          fmtResponse.code = data.code
          fmtResponse.msg = data.raw_log || ''
          fmtResponse.detail_msg = fmtResponse.msg
        }
        return { result: fmtResponse, status: response.status }
      }).catch(err => {
        console.error("HttpProxy", err.response && err.response.data)
      })
  }
}

export default HttpProxy
