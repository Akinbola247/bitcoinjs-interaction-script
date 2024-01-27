import bitcoin from 'bitcoinjs-lib'
import ECP from 'ecpair';
import * as ecc from 'tiny-secp256k1';


async function main() {
    const ECPair = ECP.ECPairFactory(ecc);
    const network = bitcoin.networks.testnet
    const keypair = ECPair.makeRandom({ network })
    const pubkey = keypair.publicKey
    const addressObject = bitcoin.payments.p2pkh({ pubkey, network })
    
    const public_Key = keypair.publicKey.toString('hex');
    const private_Key = keypair.privateKey.toString('hex');

    console.log('address:',addressObject.address)
    console.log('keypair-private:',private_Key)
    console.log('keypair-public:',public_Key)

}

main();