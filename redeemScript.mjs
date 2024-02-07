import bitcoin from 'bitcoinjs-lib';
import ECP from 'ecpair';
import * as ecc from 'tiny-secp256k1';
import sendbitcoin from './sendingbitcoin.mjs'

// Define the preimage in hexadecimal
const preimageHex = '427472757374204275696c64657273';

function main() {

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

const private_key = 'private_key_string'
const ECPair = ECP.ECPairFactory(ecc);
const network = bitcoin.networks.testnet;
var privateKey = Buffer.from(private_key, 'hex');
var keyPair = ECPair.fromPrivateKey(privateKey, { network: network });

const outputNumber = 0;
const txid = '9eac156e418ed1ca5ec4dbb539bc750a73a075dcb4a286bfc8e40b1cef40607d';
const amount = 0.00090502;

const psbt = new bitcoin.Psbt({network: network});
const minerFee = 10000;
const destinationAddress = p2sh.address;
const outputAmount = amount*1e8 - minerFee;
const fullRawTransactionHex = '02000000000101c2add7b5dbe86fd8dd4fa8c420676c507bfa8a67b8423659209ade2b30140f170000000000fdffffff0286610100000000001976a9143d7c73abba50011192a02a618a46331d9288132388ac0ad04b2f000000001976a91484b860e19d5cd588a411fba64cda6909e97fb7f488ac0247304402200b19e0aba6e2e76c1de10ed0ce98198657b9caae984d96bf9ab847cd705d6e02022020dc0681db51c12aa83390672be4c716bfed7127a26778a70a838a537314c942012102b7194da20e99fb57a28f3affa5fd2f9c8b0ece1f5220aac040bb7696f8afb7955c4d2700'

psbt.addInput({hash: txid, index: outputNumber, nonWitnessUtxo: Buffer.from(fullRawTransactionHex, 'hex')});
psbt.addOutput({address: destinationAddress, value: outputAmount});
psbt.signInput(outputNumber, keyPair);
psbt.finalizeInput(0);
const rawTransaction = psbt.extractTransaction().toHex();
console.log(rawTransaction);
}

function Spend(preImageHex) {
    const providedPreimageHash = crypto.createHash('sha256').update(preimage).digest('hex');
    // creating the unlocking script
    const unlockingScript = bitcoin.script.compile([
        Buffer.from(preImageHex, 'hex') 
    ]);
    
    const outputNumber = 0;
    const txid = '0c091221f0d09290d8e03bd35303a89231377fdde19b61851f06cdab1d43a810';
    const amount = 0.00090502;
    const psbt = new bitcoin.Psbt({network: TESTNET});
    const minerFee = 10000;
    const destinationAddress = 'mv4rnyY3Su5gjcDNzbMLKBQkBicCtHUtFB';
    const outputAmount = amount*1e8 - minerFee;
    const fullRawTransactionHex = "0200000001c51c5f4305e220bbc8b8189671172b0543106ec5869e25f755203754e0657106000000006a4730440220491c3a0ceb5a691f9a84126a89b4ae08ac8b3be863294e938bc5ab6223aa744602205e8de7db21dec6e1aa3ffc0b16ff0556d9ce600ef32e42b4a80983a1cada3c26012102705c3aebbad8802720507e9fdff82d75827239021af780097c226e2e1130b3deffffffff01490000000000000017a9142e499d5c9ec379f2a3e20a639893a868d5640f658700000000";
    
  
    psbt.addInput({
        hash: txid,
        index: outputNumber,
        sequence: null,
        redeemScript: unlockingScript,
        nonWitnessUtxo: Buffer.from(fullRawTransactionHex, 'hex'),
        witnessUtxo: {
            script: redeemScript,
            value: amount 
        }
    });
    
    psbt.addOutput({
        address: destinationAddress,
        value: outputAmount
    });

    psbt.addOutput({
        address: destinationAddress,
        value: outputAmount
    });
    
    let privateKey = 'private_key_string';
    let privateBuf = Buffer.from(privateKey, 'hex');
    var keyPair = ECPair.fromPrivateKey(privateBuf, { network: TESTNET });
    
    psbt.signInput(0, keyPair);
    psbt.finalizeInput(0);
    const rawTransaction = psbt.extractTransaction().toHex();

    console.log('Transaction Hex:', rawTransaction);
}


main();
Spend()