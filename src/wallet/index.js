import connector from './connector';

/**
 * {sessionSuccess,sessionFail,sessionCancel,success,error}
 * @param {*} callbacks 
 */
export function getSession(callback={}) {
  return connector.getSession(callback);
}

export function killSession() {
  return connector.killSession();
}

export async function getAddress() {
  let address = connector.exAddress;
  try {
    if(!address) {
      await connector.getAccounts();
      address = connector.exAddress;
    }
  } catch {
    console.log('get address fail');
  }
  return address;
}

export function sign(signMsg) {
  return connector.sign(signMsg);
}


