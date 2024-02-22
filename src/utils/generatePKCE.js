import CryptoJS from 'crypto-js';

const generate = (length = 32)=>{
    const verify = createRandom(length);
    const challenge = base64Url(CryptoJS.SHA256(verify));
    return{
        verify,
        challenge,
    }
}
const base64Url = (str)=>{
    return str.toString(CryptoJS.enc.Base64).replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
}
const createRandom = (num)=>{
    return [...Array(num)].map(() => Math.random().toString(36)[2]).join('')
}
export default generate;
