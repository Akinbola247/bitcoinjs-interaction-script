import bitcoin from 'bitcoinjs-lib'
import * as assert from 'assert';
import ECP from 'ecpair';
import * as ecc from 'tiny-secp256k1';



function main(private_key) {
    const ECPair = ECP.ECPairFactory(ecc);
    const network = bitcoin.networks.testnet;
    var privateKey = Buffer.from(private_key, 'hex');
    var keyPair = ECPair.fromPrivateKey(privateKey, { network: network });

    const outputNumber = 0;
    const txid = '9eac156e418ed1ca5ec4dbb539bc750a73a075dcb4a286bfc8e40b1cef40607d';
    const amount = 0.00090502;

    const psbt = new bitcoin.Psbt({network: network});
    const minerFee = 10000;
    const destinationAddress = 'mv4rnyY3Su5gjcDNzbMLKBQkBicCtHUtFB';
    const outputAmount = amount*1e8 - minerFee;
    const fullRawTransactionHex = '02000000000101c2add7b5dbe86fd8dd4fa8c420676c507bfa8a67b8423659209ade2b30140f170000000000fdffffff0286610100000000001976a9143d7c73abba50011192a02a618a46331d9288132388ac0ad04b2f000000001976a91484b860e19d5cd588a411fba64cda6909e97fb7f488ac0247304402200b19e0aba6e2e76c1de10ed0ce98198657b9caae984d96bf9ab847cd705d6e02022020dc0681db51c12aa83390672be4c716bfed7127a26778a70a838a537314c942012102b7194da20e99fb57a28f3affa5fd2f9c8b0ece1f5220aac040bb7696f8afb7955c4d2700'

    psbt.addInput({hash: txid, index: outputNumber, nonWitnessUtxo: Buffer.from(fullRawTransactionHex, 'hex')});
    psbt.addOutput({address: destinationAddress, value: outputAmount});
    psbt.signInput(outputNumber, keyPair);
    psbt.finalizeInput(0);
    const rawTransaction = psbt.extractTransaction().toHex();

    console.log(rawTransaction);
     
    }
    main('private_key');