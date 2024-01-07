import type { IProvider } from "@web3auth/base";
import Web3 from "web3";

const abiData = import("../constants/abi");

export default class RPC {
  private provider: IProvider;

  constructor(provider: IProvider) {
    this.provider = provider;
  }

  async getChainId(): Promise<string> {
    try {
      const web3 = new Web3(this.provider as any);

      // Get the connected Chain's ID
      const chainId = await web3.eth.getChainId();

      return chainId.toString();
    } catch (error) {
      return error as string;
    }
  }

  async getAccounts(): Promise<any> {
    try {
      const web3 = new Web3(this.provider as any);

      // Get user's Ethereum public address
      const address = await web3.eth.getAccounts();

      return address;
    } catch (error) {
      return error;
    }
  }

  async getBalance(): Promise<string> {
    try {
      const web3 = new Web3(this.provider as any);

      // Get user's Ethereum public address
      const address = (await web3.eth.getAccounts())[0];

      // Get user's balance in ether
      const balance = web3.utils.fromWei(
        await web3.eth.getBalance(address), // Balance is in wei
        "ether"
      );

      return balance;
    } catch (error) {
      return error as string;
    }
  }

  async sendTransaction(): Promise<any> {
    try {
      const web3 = new Web3(this.provider as any);

      // Get user's Ethereum public address

      const fromAddress = (await web3.eth.getAccounts())[0];

      const destination = "0x424CCA55CEd07daE2d7f8807e27A7De08074065a";
      const amount = web3.utils.toWei("1", "ether"); // Convert 1 ether to wei

      // Submit transaction to the blockchain and wait for it to be mined
      const receipt = await web3.eth.sendTransaction({
        from: fromAddress,
        to: destination,
        value: amount,
      });

      console.log("receipt--", receipt);

      return receipt;
    } catch (error) {
      return error as string;
    }
  }

  async signMessage() {
    try {
      const web3 = new Web3(this.provider as any);

      // Get user's Ethereum public address
      const fromAddress = (await web3.eth.getAccounts())[0];

      const originalMessage = "YOUR_MESSAGE";

      // Sign the message
      const signedMessage = await web3.eth.personal.sign(
        originalMessage,
        fromAddress,
        "test password!" // configure your own password here.
      );

      return signedMessage;
    } catch (error) {
      return error as string;
    }
  }

  async readContract() {
    try {
      const web3 = new Web3(this.provider as any);

      const { contractABI } = await abiData;
      const contractAddress = "0x7203d7AaF7DA705ee284BA10aCFcEa04FDd0B04A";
      const contract = new web3.eth.Contract(
        JSON.parse(JSON.stringify(contractABI)),
        contractAddress
      );

      // Read message from smart contract
      const message = await contract.methods.getCreator().call();
      console.log("message--", message);
      return message;
    } catch (error) {
      return error as string;
    }
  }

  async writeContract(contractAddress: any, dataObj: any) {
    try {
      console.log("writeContract--");
      const web3 = new Web3(this.provider as any);

      const { contractABI } = await abiData;

      const myContract = new web3.eth.Contract(
        JSON.parse(JSON.stringify(contractABI)),
        contractAddress
      );

      const { supply, price, startDate, endDate } = dataObj;
      console.log(myContract);

      const _startDt = new Date(startDate).getTime();
      const _endDt = new Date(endDate).getTime();

      const receipt = await myContract.methods
        .createPresale(supply, price, _startDt, _endDt)
        .send({ from: `${(await web3.eth.getAccounts())[0]}` });

      console.log(receipt);
      return receipt;
    } catch (error) {
      console.log("writeContract--catch--", error);
      return error as string;
    }
  }

  async getPrivateKey(): Promise<any> {
    try {
      const privateKey = await this.provider.request({
        method: "eth_private_key",
      });

      return privateKey;
    } catch (error) {
      return error as string;
    }
  }

  async createPreSale(contractAddress: any, dataObj: any) {
    try {
      console.log("writeContract--");
      const web3 = new Web3(this.provider as any);

      const { contractABI } = await abiData;

      const myContract = new web3.eth.Contract(
        JSON.parse(JSON.stringify(contractABI)),
        contractAddress
      );

      const { supply, price, startDate, endDate } = dataObj;
      console.log(myContract);

      const _startDt = new Date(startDate).getTime();
      const _endDt = new Date(endDate).getTime();

      const receipt = await myContract.methods
        .createPresale(supply, price, _startDt, _endDt)
        .send({ from: `${(await web3.eth.getAccounts())[0]}` });

      console.log(receipt);
      return receipt;
    } catch (error) {
      console.log("writeContract--catch--", error);
      return error as string;
    }
  }

  async isPreSaleAvailable(contractAddress: string | undefined) {
    try {
      console.log("===isPreSaleAvailable==", contractAddress);
      const web3 = new Web3(this.provider as any);
      const { contractABI } = await abiData;
      const contract = new web3.eth.Contract(
        JSON.parse(JSON.stringify(contractABI)),
        contractAddress
      );

      // Read message from smart contract
      const message = await contract.methods.isPresaleActive().call();
      console.log("isPreSaleAvailable-----", message);
      return message;
    } catch (error) {
      return error as string;
    }
  }

  async getPreSalePrice(contractAddress: string | undefined) {
    try {
      if (contractAddress) {
        const web3 = new Web3(this.provider as any);
        const { contractABI } = await abiData;
        const contract = new web3.eth.Contract(
          JSON.parse(JSON.stringify(contractABI)),
          contractAddress
        );

        // Read message from smart contract
        const message = await contract.methods.getMintPrice().call();
        console.log("-getPreSalePrice-", message);

        return message;
      } else {
        throw new Error("Contract Address is missing");
      }
    } catch (error) {
      console.log("--getPreSalePrice--", error);
      return error as string;
    }
  }

  async mintPreSaleNFT(contractAddress: any) {
    try {
      console.log("mintPreSaleNFT--");
      const web3 = new Web3(this.provider as any);

      const { contractABI } = await abiData;

      const myContract = new web3.eth.Contract(
        JSON.parse(JSON.stringify(contractABI)),
        contractAddress
      );

      const amount = web3.utils.toHex(web3.utils.toWei("4", "ether"));

      const data = myContract.methods.presaleMint(1).encodeABI(); // change amountwei  to tokens
      const txObject = {
        from: `${(await web3.eth.getAccounts())[0]}`,
        to: contractAddress,
        data,
        value: amount,
      };

      const receipt = await web3.eth.sendTransaction(txObject);

      console.log(receipt);
      return { status: "success", receipt: receipt };
    } catch (error) {
      console.log("mintPreSaleNFT--catch--", error);
      return { status: "failed", receipt: null };
    }
  }

  async mintNFT(contractAddress: any) {
    try {
      console.log("mintNFT--");
      const web3 = new Web3(this.provider as any);

      const { contractABI } = await abiData;

      const myContract = new web3.eth.Contract(
        JSON.parse(JSON.stringify(contractABI)),
        contractAddress
      );

      const amount = web3.utils.toHex(web3.utils.toWei("4", "ether"));

      const data = myContract.methods.mint(1).encodeABI(); // change amountwei  to tokens
      const txObject = {
        from: `${(await web3.eth.getAccounts())[0]}`,
        to: contractAddress,
        data,
        value: amount,
      };

      const receipt = await web3.eth.sendTransaction(txObject);

      console.log(receipt);
      return { status: "success", receipt: receipt };
    } catch (error) {
      console.log("mintNFT--catch--", error);
      return { status: "failed", receipt: null };
    }
  }

  async getUserMintLimit(
    contractAddress: string | undefined,
    userAccount: string | undefined
  ) {
    try {
      if (contractAddress && userAccount) {
        const web3 = new Web3(this.provider as any);
        const { contractABI } = await abiData;
        const contract = new web3.eth.Contract(
          JSON.parse(JSON.stringify(contractABI)),
          contractAddress
        );

        // Read message from smart contract
        const message = await contract.methods
          .getUserMintLimit(userAccount, 0)
          .call();
        console.log("getUserMintLimit--", message);

        return message;
      } else {
        throw new Error("Contract Address or User Account is missing");
      }
    } catch (error) {
      console.log("--getUserMintLimit--", error);
      return error as string;
    }
  }
  async getUserNFTBalance(
    contractAddress: string | undefined,
    userAccount: string | undefined
  ) {
    try {
      if (contractAddress && userAccount) {
        const web3 = new Web3(this.provider as any);
        const { contractABI } = await abiData;
        const contract = new web3.eth.Contract(
          JSON.parse(JSON.stringify(contractABI)),
          contractAddress
        );

        // Read message from smart contract
        const message = await contract.methods.balanceOf(userAccount, 0).call();
        console.log("getUserNFTBalance--", message);

        return message;
      } else {
        throw new Error("Contract Address or User Account is missing");
      }
    } catch (error) {
      console.log("--getUserNFTBalance--", error);
      return error as string;
    }
  }

  async getAccessPass(
    contractAddress: string | undefined,
    account: string,
    tokenId: number
  ) {
    try {
      const web3 = new Web3(this.provider as any);
      const { contractABI } = await abiData;
      const contract = new web3.eth.Contract(
        JSON.parse(JSON.stringify(contractABI)),
        contractAddress
      );

      // Read message from smart contract
      const message = await contract.methods.balanceOf(account, tokenId).call();
      return message;
    } catch (error) {
      return "";
    }
  }

  async getPresaleMaxSupply(contractAddress: string | undefined) {
    try {
      const web3 = new Web3(this.provider as any);
      const { contractABI } = await abiData;
      const contract = new web3.eth.Contract(
        JSON.parse(JSON.stringify(contractABI)),
        contractAddress
      );

      // Read message from smart contract
      const message = await contract.methods.getPresaleTotalSupply().call();
      return message;
    } catch (error) {
      return "";
    }
  }
}
