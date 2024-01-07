import { createContext, useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";

import {
  CHAIN_NAMESPACES,
  WEB3AUTH_NETWORK,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "./web3RPC.ts"; // for using web3.js
// import RPC from "./ethersRPC"; // for using ethers.js

// Plugins
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";

// Adapters
import {
  WalletConnectV2Adapter,
  getWalletConnectV2Settings,
} from "@web3auth/wallet-connect-v2-adapter";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";

const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; // get from https://dashboard.web3auth.io
const walletV2ProjectId = "3e959b35a1c72b02582fd4f639494497";
const Web3AuthContext = createContext();

const flareConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x72", // hex of 16   0x72 = 114
  rpcTarget: "https://coston2-api.flare.network/ext/C/rpc",
  displayName: "Coston2 testnet",
  blockExplorer: "https://coston2-explorer.flare.network/",
  ticker: "C2FLR",
  tickerName: "C2FLR",
};

// eslint-disable-next-line react/prop-types
export const Web3AuthContextProvider = ({ children }) => {
  const [web3auth, setWeb3auth] = useState(null);
  const [torusPlugin, setTorusPlugin] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const [idToken, setIdToken] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: flareConfig,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
          // uiConfig refers to the whitelabeling options, which is available only on Growth Plan and above
          // Please remove this parameter if you're on the Base Plan
          uiConfig: {
            appName: "W3A",
            theme: {
              primary: "blue",
            },
            mode: "auto",
            logoLight: "https://web3auth.io/images/web3auth-logo.svg",
            logoDark: "https://web3auth.io/images/web3auth-logo---Dark.svg",
            defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
            loginGridCol: 3,
            primaryButton: "externalLogin", // "externalLogin" | "socialLogin" | "emailLogin"
          },
        });

        // adding wallet connect v2 adapter
        // const defaultWcSettings = await getWalletConnectV2Settings(
        //   CHAIN_NAMESPACES.EIP155,
        //   [16],
        //   walletV2ProjectId
        // );
        // const walletConnectV2Adapter = new WalletConnectV2Adapter({
        //   adapterSettings: { ...defaultWcSettings.adapterSettings },
        //   loginSettings: { ...defaultWcSettings.loginSettings },
        // });

        // web3auth.configureAdapter(walletConnectV2Adapter);

        // adding metamask adapter
        const metamaskAdapter = new MetamaskAdapter({
          clientId,
          sessionTime: 3600, // 1 hour in seconds
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
          chainConfig: flareConfig,
        });
        // we can change the above settings using this function
        metamaskAdapter.setAdapterSettings({
          sessionTime: 86400, // 1 day in seconds
          chainConfig: flareConfig,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
        });

        // it will add/update  the metamask adapter in to web3auth class
        web3auth.configureAdapter(metamaskAdapter);

        setWeb3auth(web3auth);

        await web3auth.initModal({
          modalConfig: {
            [WALLET_ADAPTERS.OPENLOGIN]: {
              label: "openlogin",
              loginMethods: {
                // Disable facebook and reddit
                facebook: {
                  name: "facebook",
                  showOnModal: false,
                },
                reddit: {
                  name: "reddit",
                  showOnModal: false,
                },
                google: {
                  name: "google",
                  showOnModal: false,
                },
                discord: {
                  name: "discord",
                  showOnModal: false,
                },
                twitch: {
                  name: "twitch",
                  showOnModal: false,
                },
                apple: {
                  name: "apple",
                  showOnModal: false,
                },
                line: {
                  name: "line",
                  showOnModal: false,
                },
                github: {
                  name: "github",
                  showOnModal: false,
                },
                kakao: {
                  name: "kakao",
                  showOnModal: false,
                },
                linkedin: {
                  name: "linkedin",
                  showOnModal: false,
                },
                twitter: {
                  name: "twitter",
                  showOnModal: false,
                },
                weibo: {
                  name: "weibo",
                  showOnModal: false,
                },
                wechat: {
                  name: "wechat",
                  showOnModal: false,
                },
                sms_passwordless: {
                  name: "sms_passwordless",
                  showOnModal: false,
                },
              },
            }, //Disable Torus Plugin
            [WALLET_ADAPTERS.TORUS_EVM]: {
              label: "TORUS_EVM",
              showOnModal: false,
            },
            [WALLET_ADAPTERS.WALLET_CONNECT_V2]: {
              label: "WALLET_CONNECT_V2",
              showOnModal: false,
            },
          },
        });

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.log("wallet--init--catch", error);
      }
    };

    init();
  }, []);

  const web3Login = async () => {
    if (!web3auth) {
      alert("web3auth not initialized yet");
      return;
    }
    await web3auth.connect();
    setLoggedIn(true);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      alert("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log("user-data", user);
    setUser(user);
  };

  const web3logout = async () => {
    if (!web3auth) {
      alert("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setLoggedIn(false);
  };

  const getChainId = async () => {
    if (!web3auth?.provider || web3auth.status !== "connected") {
      alert("Please connect your wallet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const chainId = await rpc.getChainId();
    return chainId;
  };

  const addChain = async () => {
    if (!web3auth?.provider || web3auth.status !== "connected") {
      alert("Please connect your wallet");
      return;
    }
    const newChain = {
      chainId: "0x5",
      displayName: "Goerli",
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      tickerName: "Goerli",
      ticker: "ETH",
      decimals: 18,
      rpcTarget: "https://rpc.ankr.com/eth_goerli",
      blockExplorer: "https://goerli.etherscan.io",
    };
    await web3auth?.addChain(newChain);
    alert("New Chain Added");
  };

  const switchChain = async () => {
    if (!web3auth?.provider || web3auth.status !== "connected") {
      alert("Please connect your wallet");
      return;
    }
    await web3auth?.switchChain({ chainId: "0x10" });
    alert("Chain Switched");
  };

  const getAccounts = async () => {
    if (!web3auth?.provider || web3auth.status !== "connected") {
      alert("Please connect your wallet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const address = await rpc.getAccounts();
    return address[0];
  };

  const getBalance = async () => {
    if (!web3auth?.provider || web3auth.status !== "connected") {
      alert("Please connect your wallet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const balance = await rpc.getBalance();

    console.log("balance-->", balance);
    // uiConsole(balance)
    return balance;
  };

  const sendTransaction = async () => {
    if (!web3auth?.provider || web3auth.status !== "connected") {
      alert("Please connect your wallet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const receipt = await rpc.sendTransaction();
    // uiConsole(receipt)
  };

  const signMessage = async () => {
    if (!web3auth?.provider || web3auth.status !== "connected") {
      alert("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const signedMessage = await rpc.signMessage();
    // uiConsole(signedMessage)
  };

  const readContract = async () => {
    if (!web3auth?.provider || web3auth.status !== "connected") {
      alert("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const message = await rpc.readContract();
    // uiConsole(message)
  };

  const writeContract = async () => {
    if (!web3auth?.provider || web3auth.status !== "connected") {
      alert("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const receipt = await rpc.writeContract();
    //uiConsole(receipt)
    if (receipt) {
      setTimeout(async () => {
        await readContract();
      }, 2000);
    }
  };

  const getPrivateKey = async () => {
    if (!web3auth?.provider || web3auth.status !== "connected") {
      alert("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const pKey = await rpc.getPrivateKey();

    setPrivateKey(pKey);
  };

  const createPreSale = async (contractAddress, Payload) => {
    console.log("createPreSale--");
    if (!web3auth?.provider || web3auth.status !== "connected") {
      alert("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const receipt = await rpc.createPreSale(contractAddress, Payload);
    //uiConsole(receipt)
    if (receipt) {
      setTimeout(async () => {
        await readContract();
      }, 2000);
    }
  };

  const isSaleAvailable = async (contractAddress) => {
    console.log("--isSaleAvailable--");
    if (!web3auth?.provider || web3auth.status !== "connected") {
      alert("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    return rpc.isPreSaleAvailable(contractAddress);
  };

  const getPreSalePrice = async (contractAddress) => {
    if (!web3auth?.provider || web3auth.status !== "connected") {
      alert("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    return rpc.getPreSalePrice(contractAddress);
  };

  const mintPreSaleNFT = async (contractAddress) => {
    console.log("mintPreSaleNFT--");
    if (!web3auth?.provider || web3auth.status !== "connected") {
      alert("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const receipt = await rpc.mintPreSaleNFT(contractAddress);
    return receipt;
  };

  const mintNFT = async (contractAddress) => {
    console.log("mintNFT--");
    if (!web3auth?.provider || web3auth.status !== "connected") {
      alert("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const receipt = await rpc.mintNFT(contractAddress);
    return receipt;
  };

  const getUserMintLimit = async (contractAddress) => {
    if (!web3auth?.provider || web3auth.status !== "connected") {
      alert("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const userAccount = await getAccounts();
    return rpc.getUserMintLimit(contractAddress, userAccount);
  };

  const getUserNFTBalance = async (contractAddress) => {
    if (!web3auth?.provider || web3auth.status !== "connected") {
      alert("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const userAccount = await getAccounts();
    return rpc.getUserNFTBalance(contractAddress, userAccount);
  };

  const getAccessPass = async (contractAddress) => {
    if (!web3auth?.provider || web3auth.status !== "connected") {
      alert("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const userAccount = await getAccounts();
    return rpc.getAccessPass(contractAddress, userAccount, 0);
  };

  const getPresaleMaxSupply = async (contractAddress) => {
    if (!web3auth?.provider || web3auth.status !== "connected") {
      alert("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    return rpc.getPresaleMaxSupply(contractAddress);
  };

  return (
    <Web3AuthContext.Provider
      value={{
        web3auth,
        web3Login,
        getUserInfo,
        web3logout,
        getChainId,
        addChain,
        switchChain,
        getAccounts,
        getBalance,
        sendTransaction,
        signMessage,
        readContract,
        writeContract,
        getPrivateKey,
        loggedIn,
        privateKey,
        idToken,
        user,
        createPreSale,
        isSaleAvailable,
        getPreSalePrice,
        mintNFT,
        getUserMintLimit,
        getUserNFTBalance,
        mintPreSaleNFT,
        getAccessPass,
        getPresaleMaxSupply,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

export default Web3AuthContext;
