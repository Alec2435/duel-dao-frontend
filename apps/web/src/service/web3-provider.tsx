import { useState, createContext, useContext, useEffect } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";

const INFURA_ID = "3c79214add5e49d9a15fd67ec5dba754";

interface AccountProviderValue {
    provider: providers.Web3Provider | undefined;
    connectAccount: () => void;
    disconnectAccount: () => void;
    chainId: number;
    address: string;
}

const Web3AccountContext = createContext<AccountProviderValue | undefined>(
    undefined,
);

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: INFURA_ID,
        },
    },
};

let web3Modal: Web3Modal | undefined;
if (typeof window !== "undefined") {
    web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions,
    });
}

export function Web3AccountProvider({ children }) {
    const [address, setAddress] = useState<string | undefined>(undefined);
    const [chainId, setChainId] = useState(0);
    const [provider, setProvider] = useState<
        providers.Web3Provider | undefined
    >(undefined);

    async function onConnect() {
        console.log("onConnect");

        if (!INFURA_ID) {
            throw new Error("Missing Infura ID");
        }

        const web3Provider = await web3Modal.connect();
        const provider = new providers.Web3Provider(web3Provider);
        setProvider(provider);

        const accounts = await web3Provider.enable();
        setAddress(accounts[0]);
        setChainId(web3Provider.chainId);
    }

    // If using MetaMask, listen for changes on the active account
    useEffect(() => {
        if (provider) {
            if (window.ethereum) {
                window.ethereum.on(
                    "accountsChanged",
                    (accounts: Array<string>) => {
                        if (
                            accounts.length > 0 &&
                            !accounts.includes(address)
                        ) {
                            setAddress(accounts[0]);
                        }
                    },
                );
            }
        }
    }, [provider]);

    function onDisconnect() {
        console.log("onDisconnect");

        if (provider) {
            web3Modal.clearCachedProvider();
        }
        setAddress(undefined);
    }

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            onConnect();
        }
    }, []);

    const value: AccountProviderValue = {
        provider,
        connectAccount: onConnect,
        disconnectAccount: onDisconnect,
        address,
        chainId,
    };

    return (
        <Web3AccountContext.Provider value={value}>
            {children}
        </Web3AccountContext.Provider>
    );
}

export function useWeb3Account() {
    return useContext(Web3AccountContext);
}
