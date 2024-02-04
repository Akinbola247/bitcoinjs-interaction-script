import bitcoin from 'bitcoinjs-lib';
import ECP from 'ecpair';
import * as ecc from 'tiny-secp256k1';


function main() {
// Define the preimage in hexadecimal
const preimageHex = '427472757374204275696c64657273';

// Define the opcodes for OP_SHA256 and OP_EQUAL
const opSHA256 = '0xa8';
const opEqual = '0x87';

// Create the redeem script
const redeemScript = bitcoin.script.compile([
 Buffer.from(opSHA256, 'hex'),
 Buffer.from(preimageHex, 'hex'),
 Buffer.from(opEqual, 'hex')
]);

const p2sh = bitcoin.payments.p2sh({ redeem: { output: redeemScript, network: bitcoin.networks.testnet }, network: bitcoin.networks.testnet });


console.log('address',p2sh.address);




}

main();