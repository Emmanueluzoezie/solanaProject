import { Web3AuthNoModal } from '@web3auth/no-modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { SolanaPrivateKeyProvider } from '@web3auth/solana-provider';
import { useDispatch } from 'react-redux';
import { setIsUserLogin } from '../../slice/AppSlices';
import { setProvider, setWeb3Auth } from '../../slice/userSlice';
import { CHAIN_NAMESPACES } from '@web3auth/base';

const clientId = process.env.NEXT_PUBLIC_SWEB3AUTH_CLIENT_ID

export default async function handler(req,res) {
    const dispatch = useDispatch();

    try {
        const chainConfig = {
            chainNamespace: CHAIN_NAMESPACES.SOLANA,
            chainId: "0x1", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
            rpcTarget: "https://solana-mainnet.g.alchemy.com/v2/demo",
            displayName: "Solana Mainnet",
            blockExplorer: "https://explorer.solana.com",
            ticker: "SOL",
            tickerName: "Solana Token",
        };

        const web3auth = new Web3AuthNoModal({
            clientId: `${clientId}`,
            chainConfig,
            web3AuthNetwork: "sapphire_mainnet",
        });

        dispatch(setWeb3Auth(web3auth));

        const privateKeyProvider = new SolanaPrivateKeyProvider({ config: { chainConfig } });

        const openloginAdapter = new OpenloginAdapter({
            chainConfig,
            privateKeyProvider,
        });

        web3auth.configureAdapter(openloginAdapter);
        await web3auth.init();
        dispatch(setProvider(web3auth.provider));

        if (web3auth.connected) {
            dispatch(setIsUserLogin(true));
        } else {
            dispatch(setIsUserLogin(false));
        }

        res.status(200).json({ message: 'Web3Auth initialization successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error initializing Web3Auth api' });
    }
}