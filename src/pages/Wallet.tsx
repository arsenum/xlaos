import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonModal,
  IonIcon,
} from "@ionic/react";
import "./Wallet.css";
import Web3 from "web3";
import { eyeOutline} from 'ionicons/icons';
import { Bech32, fromHex } from "@cosmjs/encoding";
import abi from "../contracts/erc20.json";

const web3 = new Web3("ws://localhost:8546");

const Tab1: React.FC = () => {
  const [transactions, setTransactions] = useState<any>([]);
  const [nativeBalance, setNativeBalance] = useState<any>(0);
  const [erc20Balance, setERC20Balance] = useState<any>(0);
  const [bench32text, setBech32Text] = useState<string>();
  const [hexText, setHexText] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    //connect to ERC20 Token Contract
    //parameters: abi.json file, contract address
    const contract = new web3.eth.Contract(
      abi as any,
      "0x9d626f94b572a9Af414E9fd0f43a1Dd7b375FfB6"
    );
    //Get account from Metmask
    web3.eth.getAccounts().then((r) => {
      setHexText(r[0]);
      setBech32Text(Bech32.encode("evmos", fromHex(r[0].substr(2))));
      contract.methods.balanceOf(r[0]).call((e: any, r: any) => {
        setERC20Balance(r);
      });
      web3.eth.getBalance(r[0]).then(setNativeBalance);
    });
    //Check logs for transactions. This is impolemented for testing purposes.
    //Production version should get transactions from an indexer service via API
    web3.eth
      .getPastLogs({
        fromBlock: "earliest",
        toBlock: "latest",
      })
      .then((r) => {
        r.map(async (o: any) => {
          //Get transaction details
          let t = await web3.eth.getTransaction(o.transactionHash);
          o.transaction = t;
        });
        setTransactions(r);
      });
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>EVMos Wallet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <p>
          <IonList>
            <IonItem>
              <IonLabel>Bech32 Address:</IonLabel>
            </IonItem>
            <IonItem className="roundedInput">
              <IonInput
                value={bench32text}
                placeholder="Enter Input"
                onIonChange={(e) => setBech32Text(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Hex Address:</IonLabel>
            </IonItem>
            <IonItem slot="end" className="roundedInput">
              <IonInput
                value={hexText}
                placeholder="Enter Input"
                onIonChange={(e) => setHexText(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonButton expand="full" shape="round" size="default">
                Reload Wallet Address
              </IonButton>
            </IonItem>
          </IonList>
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Native</IonCardSubtitle>
              <IonCardTitle>{nativeBalance}</IonCardTitle>
            </IonCardHeader>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>ERC20</IonCardSubtitle>
              <IonCardTitle>{erc20Balance}</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </p>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Transactions</IonCardSubtitle>
            <IonCardTitle>
              {transactions.map((o: any) => {
                return (
                  <div key={o.key}>
                    <IonModal isOpen={showModal} >
                    <div><h1>Transaction Details</h1></div>
                      <IonContent>
                    <IonCard>
                      <IonCardHeader>
                        <IonCardSubtitle>Block Hash:<br/>{o.transaction?o.transaction.blockHash:null}</IonCardSubtitle>
                      </IonCardHeader>
                    </IonCard>
                    <IonCard>
                      <IonCardHeader>
                        <IonCardSubtitle>Block Number:<br/>{o.transaction?o.transaction.blockNumber:null}</IonCardSubtitle>
                      </IonCardHeader>
                    </IonCard>
                    <IonCard>
                      <IonCardHeader>
                        <IonCardSubtitle>from:<br/>{o.transaction?o.transaction.from:null}</IonCardSubtitle>
                      </IonCardHeader>
                    </IonCard>
                    <IonCard>
                      <IonCardHeader>
                        <IonCardSubtitle>gas:<br/>{o.transaction?o.transaction.gas:null}</IonCardSubtitle>
                      </IonCardHeader>
                    </IonCard>
                    <IonCard>
                      <IonCardHeader>
                        <IonCardSubtitle>gasPrice:<br/>{o.transaction?o.transaction.gasPrice:null}</IonCardSubtitle>
                      </IonCardHeader>
                    </IonCard>
                    
                    <IonCard>
                      <IonCardHeader>
                        <IonCardSubtitle>hash:<br/>{o.transaction?o.transaction.hash:null}</IonCardSubtitle>
                      </IonCardHeader>
                    </IonCard>
                    <IonCard>
                      <IonCardHeader>
                        <IonCardSubtitle>input:<br/>{o.transaction?o.transaction.input:null}</IonCardSubtitle>
                      </IonCardHeader>
                    </IonCard>
                    <IonCard>
                      <IonCardHeader>
                        <IonCardSubtitle>nonce:<br/>{o.transaction?o.transaction.nonce:null}</IonCardSubtitle>
                      </IonCardHeader>
                    </IonCard>
                    <IonCard>
                      <IonCardHeader>
                        <IonCardSubtitle>r:<br/>{o.transaction?o.transaction.r:null}</IonCardSubtitle>
                        <IonCardTitle></IonCardTitle>
                      </IonCardHeader>
                    </IonCard>
                    <IonCard>
                      <IonCardHeader>
                        <IonCardSubtitle>s:<br/>{o.transaction?o.transaction.s:null}</IonCardSubtitle>
                        <IonCardTitle></IonCardTitle>
                      </IonCardHeader>
                    </IonCard>
                    <IonCard>
                      <IonCardHeader>
                        <IonCardSubtitle>to:<br/>{o.transaction?o.transaction.to:null}</IonCardSubtitle>
                        <IonCardTitle></IonCardTitle>
                      </IonCardHeader>
                    </IonCard>
                    <IonCard>
                      <IonCardHeader>
                        <IonCardSubtitle>transactionIndex:<br/>{o.transaction?o.transaction.transactionIndex:null}</IonCardSubtitle>
                        <IonCardTitle></IonCardTitle>
                      </IonCardHeader>
                    </IonCard>
                    <IonCard>
                      <IonCardHeader>
                        <IonCardSubtitle>type:<br/>{o.transaction?o.transaction.type:null}</IonCardSubtitle>
                        <IonCardTitle></IonCardTitle>
                      </IonCardHeader>
                    </IonCard>
                    <IonCard>
                      <IonCardHeader>
                        <IonCardSubtitle>v:<br/>{o.transaction?o.transaction.v:null}</IonCardSubtitle>
                        <IonCardTitle></IonCardTitle>
                      </IonCardHeader>
                    </IonCard>
                    <IonCard>
                      <IonCardHeader>
                        <IonCardSubtitle>value:<br/>{o.transaction?o.transaction.value:null}</IonCardSubtitle>
                        <IonCardTitle></IonCardTitle>
                      </IonCardHeader>
                    </IonCard>
                    </IonContent>
                      <IonButton onClick={() => setShowModal(false)}>
                        Close Modal
                      </IonButton>
                    </IonModal>
                    <IonButton onClick={() => setShowModal(true)}>
                    <IonIcon icon={eyeOutline} />
                    </IonButton>
                    {o.transactionHash}
                    <br />
                  </div>
                );
              })
            }
            </IonCardTitle>
          </IonCardHeader>
        </IonCard>
        <div className="container"> </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
