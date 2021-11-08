import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
     
      <p>Install Metamask Extention (if not already installed)</p>
      <p>Go to Settings, Click Networks, Add Network </p>
      <p>Enter Following:</p>
      <pre>
      Network Name: Local EVMOS
      <br/>
      New RPC URL: http://localhost:8545/
      <br/>
      Chain ID: 9000
      <br/>
      Curency Symbol: PHOTON
      </pre>
      <br/>
      <p>
        Click Save
      </p>
      
      <p>Expoprt your private key</p>
      <pre>evmosd keys unsafe-export-eth-key mykey --keyring-backend test</pre>
      <p>Example:</p>
      <pre>70B1063BF2F270866F49477E7E73978F9B3DF050C11114235B9428097633E462</pre>
      <p>Click Import Account. Paste your exported private key string in to the input box and click Import</p>
      <p>Your new account should have 100,000,000 PHOTONS</p>
      <p>To add your ERC20 token minted in Remix, click Import tokens and paste the Contract Address found in Remix IDE after deployment</p>
      <p>Example:</p>
      <pre>
      0x9d626f94b572a9Af414E9fd0f43a1Dd7b375FfB6
      </pre>
      <p>To create transactions, create a new wallet then send PHOTONS and ERC20 Tokens to the new address.</p>
    </div>
  );
};

export default ExploreContainer;
