import * as ethUtil from "ethereumjs-util";
import Web3 from 'web3';

export const web3 = new Web3('http://127.0.0.1:8545/');

export function hashPersonalMessage(msg) {
    const buffer = Buffer.from(msg);
    const result = ethUtil.hashPersonalMessage(buffer);
    const hash = ethUtil.bufferToHex(result);
    return hash;
}

export function recoverPublicKey(sig, hash) {
    const sigParams = ethUtil.fromRpcSig(sig);
    const hashBuffer = Buffer.from(hash.replace("0x", ""), "hex");
    const result = ethUtil.ecrecover(
        hashBuffer,
        sigParams.v,
        sigParams.r,
        sigParams.s
    );
    const signer = ethUtil.bufferToHex(ethUtil.publicToAddress(result));
    return signer;
}

export function recoverPersonalSignature(sig, msg) {
    const hash = hashPersonalMessage(msg);
    const signer = recoverPublicKey(sig, hash);
    return signer;
}