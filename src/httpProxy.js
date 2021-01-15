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

    return this.httpClient
      .request(paramsObj)
      .then(response => {

        if (method === 'get')  {
          return { result: response.data, status: response.status }
        }
        let fmtResponse = {
          code: 0,
          data: '',
          msg: 'success',
          detail_msg: ''
        }
        const data = response.data || null
        if(data) {
            if (data.code) {
                fmtResponse.code = cosmosCode[data.code] ? cosmosCode[data.code] : data.code
                fmtResponse.msg = data.raw_log || ''
                fmtResponse.detail_msg = fmtResponse.msg
            } else {
                fmtResponse.data = data.txhash || ''
            }
        } else {
            fmtResponse.code = -1
            fmtResponse.data = ''
            fmtResponse.msg = 'response data return null'
        }
        return { result: fmtResponse, status: response.status }
      }).catch(err => {
        let fmtResponse = {
            code: -1,
            data: '',
            msg: err.response && err.response.data,
            detail_msg: ''
        }
        try {
            fmtResponse.msg = JSON.stringify(fmtResponse.msg)
        } catch (e) {
            fmtResponse.msg = err.response && err.response.data
        }
        console.error("HttpProxy", err.response && err.response.data)
        const cmErr = err.response.data
        if (cmErr && cmErr.code && cmErr.code > 0) {
            fmtResponse.code = cosmosCode[cmErr.code] ? cosmosCode[cmErr.code] : -1
            fmtResponse.msg = cmErr.raw_log || ''
            return { result: fmtResponse, status: 200 }
        }
        return { result: fmtResponse, status: 200 }
      })
  }
}

export default HttpProxy
