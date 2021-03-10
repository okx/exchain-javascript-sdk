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
  let address = connector.address;
  try {
    if(!address) address = await connector.getAccounts();
  } catch {
    console.log('get address fail');
  }
  return address;
}

export function sign(signMsg) {
  return connector.sign(signMsg);
}


