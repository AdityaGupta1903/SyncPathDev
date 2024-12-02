export interface Root {
    [x: string]: any
    data: Daum[]
    status: number
    statusText: string
    headers: Headers
    config: Config
    request: Request
  }
  
  export interface Daum {
    ZapId: string
    ZapName: string
    UserId: string
  }
  
  export interface Headers {
    "content-length": string
    "content-type": string
  }
  
  export interface Config {
    transitional: Transitional
    adapter: string[]
    transformRequest: any[]
    transformResponse: any[]
    timeout: number
    xsrfCookieName: string
    xsrfHeaderName: string
    maxContentLength: number
    maxBodyLength: number
    env: Env
    headers: Headers2
    params: Params
    method: string
    url: string
  }
  
  export interface Transitional {
    silentJSONParsing: boolean
    forcedJSONParsing: boolean
    clarifyTimeoutError: boolean
  }
  
  export interface Env {}
  
  export interface Headers2 {
    Accept: string
  }
  
  export interface Params {
    email: string
  }
  
  export interface Request {}
  