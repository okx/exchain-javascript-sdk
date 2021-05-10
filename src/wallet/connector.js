import WalletConnect from '@walletconnect/client';
import * as crypto from "../crypto";

const GET_ACCOUNTS = {
  jsonrpc: '2.0',
  method: 'get_accounts'
};

const GET_SIGN = {
  jsonrpc: '2.0',
  method: 'okt_signTransaction'
};

const EXCHAIN = /(^ex)|(^0x)/i;

const ZEROX = /^0x/i;

const DURING = 5000;

const signType = '20';

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
      this.doCallback('success',{address: this.exAddress});
    } catch {
      this.doCallback('error');
    }
  }

  get exAddress() {
    if(ZEROX.test(this.address)) {
      return crypto.convertHexToBech32(this.address)[0];
    }
    return this.address;
  }

  onDisconnect() {
    this.killSession();
  }

  async getAccounts() {
    const walletConnector = this.walletConnector;
    if(!walletConnector) return '';
    // this.startTimer();
    let address = '';
    // let timer = setTimeout(() => {
    //   if(!address) {
    //     console.log('获取address超时，将断开链接');
    //     this.killSession();
    //   }
    // }, DURING);
    const params = {...GET_ACCOUNTS, id: Date.now()};
    console.log('get address params: ' + JSON.stringify(params));
    return walletConnector.sendCustomRequest(params).then((res) => {
      const okexchainAccount = res.find((account) => {
        return EXCHAIN.test(account.address);
      });
      if (okexchainAccount) {
        address = okexchainAccount.address;
        this.address = address;
      }
      if(!address) throw new Error('get address failed');
      return this.address
    }).catch(() => {
      // console.log('获取address失败，将断开链接');
      // this.killSession();
    }).finally(() => {
      // clearTimeout(timer);
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

  async walletConnectInit(storageId) {
    const bridge = 'wss://bridge.walletconnect.org';
    const walletConnector = new WalletConnect({ bridge });
    walletConnector._clientMeta.name = 'ΟKEx DEX';
    walletConnector._clientMeta.url = walletConnector._clientMeta.url.replace(/okex/i,'οkex');
    if(storageId) walletConnector._sessionStorage.storageId = storageId;
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

  async getSession(callback, storageId) {
    this.setCallback(callback);
    let session = '';
    try {
      if(!this.walletConnector || !this.walletConnector.uri) {
        await this.walletConnectInit(storageId);
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

  sendSignMsg(signMsg) {
    const params = {...GET_SIGN,params:[signMsg],id:Date.now()};
    console.log('发送签名数据',JSON.stringify(params));
    return this.walletConnector.sendCustomRequest(params).catch(() => console.log('签名失败'));
  }

  async sign(signMsg) {
    return this.sendSignMsg(signMsg).then(res => {
      res = JSON.parse(res);
      return res.tx.signatures;
    });
  }

  async sign4Token(signMsg) {
    signMsg = {...signMsg, signType};
    return this.sendSignMsg({
      data: JSON.stringify(signMsg)
    }).then(res => ({rawTransaction: res}));
  }
}

export default new Connector();
