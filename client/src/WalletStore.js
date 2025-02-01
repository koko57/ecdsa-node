import {secp256k1} from "ethereum-cryptography/secp256k1";
import {toHex} from "ethereum-cryptography/utils";
import {keccak256} from "ethereum-cryptography/keccak";

class WalletStore {
    constructor() {
        this.wallets = new Map();
    }

    generateNewWallet() {
        const privateKey = secp256k1.utils.randomPrivateKey();
        const publicKey = secp256k1.getPublicKey(privateKey);

        const publicKeyWithoutPrefix = publicKey.slice(1);
        const hashedAddress = keccak256(publicKeyWithoutPrefix);
        // Take the last 20 bytes for the address
        const address = `0x${toHex(hashedAddress.slice(-20))}`;

        this.wallets.set(address, privateKey);

        return address;
    }

    async signTransaction(address, transaction) {
        const privateKey = this.wallets.get(address);
        if (!privateKey) throw new Error("Wallet not found");

        const messageHash = keccak256(Uint8Array.from(JSON.stringify(transaction)));
        const signature = await secp256k1.sign(messageHash, privateKey);
        const publicKey = secp256k1.getPublicKey(privateKey);

        return {
            signature: toHex(signature),
            publicKey: toHex(publicKey)
        };
    }

    // Optional: Get public key for an address
    getPublicKey(address) {
        const privateKey = this.wallets.get(address);
        if (!privateKey) return null;
        return toHex(secp256k1.getPublicKey(privateKey));
    }
}

export const walletStore = new WalletStore();
