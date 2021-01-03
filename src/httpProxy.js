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
        const cosmosCode = {
            "1": 60001,
            "2": 60002,
            "3": 60003,
            "4": 60004,
            "5": 60005,
            "6": 60006,
            "7": 60007,
            "8": 60008,
            "9": 60009,
            "10": 60010,
            "11": 60011,
            "12": 60012,
            "13": 60013,
            "14": 60014,
            "15": 60015,
            "16": 60016,
            "17": 60017,
            "18": 60018,
            "19": 60019,
            "20": 60020,
            "21": 60021,
            "111222": 60099
        }
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
          fmtResponse.code = cosmosCode[data.code] ? cosmosCode[data.code] : data.code
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
