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
        let raw_log = (data && data.raw_log) || '';
        if (raw_log) {
          raw_log = JSON.parse(raw_log)
          if (raw_log.length && raw_log[0]) {
              fmtResponse.data = raw_log
            return { result: fmtResponse, status: response.status }
          }
          fmtResponse.code = raw_log.code
          fmtResponse.msg = raw_log.message
          fmtResponse.detail_msg = fmtResponse.msg
        }
        return { result: fmtResponse, status: response.status }
      }).catch(err => {
        console.error("HttpProxy", err.response && err.response.data)
      })
  }
}

export default HttpProxy
