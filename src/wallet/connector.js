import WalletConnect from '@walletconnect/client';

const GET_ACCOUNTS = {
  jsonrpc: '2.0',
  method: 'get_accounts'
};

const GET_SIGN = {
  jsonrpc: '2.0',
  method: 'okt_signTransaction'
};

const OKEXCHAIN = 'okexchain';

// const DURING = 5000;

class Connector {

  constructor() {
    this.resetConnector();
  }

  resetConnector() {
    if(this.interval) clearInterval(this.interval);
    this.walletConnector = null;
    this.account = null;
    this.address = '';
    this.interval = null;
    this.callback = {};
  }

  handleConnect(accounts) {
    this.account = accounts[0];
  }

  async onConnect(payload) {
    try {
      await this.getAccounts();
      const { accounts } = payload.params[0];
      this.handleConnect(accounts);
      if(!this.address) throw new Error;
      this.doCallback('success',{address: this.address});
    } catch {
      this.doCallback('error');
    }
  }

  onDisconnect() {
    this.killSession();
  }
  
  async getAccounts() {
    const walletConnector = this.walletConnector;
    if(!walletConnector) return '';
    // this.startTimer();
    return new Promise((resolve,reject) => {
      let address = '';
      // let timer = setTimeout(() => {
      //   if(!address) {
      //     console.log('获取address超时，将断开链接');
      //     this.killSession();
      //   }
      // }, DURING);
      const params = {...GET_ACCOUNTS, id: Date.now()};
      console.log('get address params: ' + JSON.stringify(params));
      walletConnector.sendCustomRequest(params).then((res) => {
        const okexchainAccount = res.find((account) => {
          return account.address.startsWith(OKEXCHAIN);
        });
        if (okexchainAccount) {
          address = okexchainAccount.address;
          this.address = address;
        }
        if(!address) throw new Error('get address failed');
        resolve(this.address);
      }).catch(err => {
        // console.log('获取address失败，将断开链接');
        // this.killSession();
        reject(err);
      }).finally(() => {
        // clearTimeout(timer);
      });
    });
  }

  async startTimer() {
    if(this.startTimer.interval) return;
    this.startTimer.interval = setInterval(() => {
      console.log('get address');
      this.getAccounts();
    }, DURING);
  }

  async subscribeToEvents() {
    const walletConnector = this.walletConnector;
    if (!walletConnector) {
      return;
    }
    walletConnector.on('call_request', (error, payload) => {
      console.log('call_request', payload, error);
      if (error) {
        throw error;
      }
    });

    walletConnector.on('connect', (error, payload) => {
      console.log('connect', payload);
      if (error) {
        throw error;
      }
      this.onConnect(payload);
    });

    walletConnector.on('disconnect', (error, payload) => {
      console.log('disconnect', payload);
      this.onDisconnect();
      if (error) {
        throw error;
      }
    });

    walletConnector.on('session_request',(error, payload) => {
      console.log('session_request', payload);
      if (error) {
        throw error;
      }
    });

    if (walletConnector.connected) {
      const { accounts } = walletConnector;
      this.handleConnect(accounts);
    }
  }

  async createSession() {
    const walletConnector = this.walletConnector;
    if(!walletConnector) return;
    await walletConnector.createSession();
  }

  async walletConnectInit() {
    const bridge = 'wss://bridge.walletconnect.org';
    const walletConnector = new WalletConnect({ bridge });
    walletConnector._clientMeta.name = 'ΟKEx DEX';
    walletConnector._clientMeta.url = walletConnector._clientMeta.url.replace(/okex/i,'οkex');
    this.walletConnector = walletConnector;

    this.subscribeToEvents();

    if (!walletConnector.connected || !walletConnector.uri) {
      console.log('create session');
      await this.createSession();
    } else {
      await this.getAccounts();
    }
  }

  killSession(callback) {
    const walletConnector = this.walletConnector;
    if (walletConnector && walletConnector.connected) {
      walletConnector.killSession();
    }
    if(callback) callback();
    else this.doCallback('sessionCancel');
    this.resetConnector();
  }

  setCallback(callback={}) {
    this.callback = callback;
  }

  doCallback(type,params) {
    if(typeof this.callback[type] === 'function' )this.callback[type](params);
  }
  
  async getSession(callback) {
    this.setCallback(callback);
    let session = '';
    try {
      if(!this.walletConnector || !this.walletConnector.uri) {
        await this.walletConnectInit();
      }
      session = this.walletConnector.uri;
    } finally {
      if(!session) {
        console.log('初始链接失败')
        this.killSession();
      }
      else this.doCallback('sessionSuccess');
    }
    return session;
  }

  async sign(signMsg) {
    return new Promise((resolve,reject) => {
      const params = {...GET_SIGN,params:[signMsg],id:Date.now()};
      console.log('发送签名数据',JSON.stringify(params));
      this.walletConnector.sendCustomRequest(params).then((res) => {
        res = JSON.parse(res);
        console.log(res);
        resolve(res.tx.signatures);
      }).catch(err => {
        console.log('签名失败')
        reject(err);
      });
    });
  }
}

export default new Connector();
