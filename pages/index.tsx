import Head from 'next/head'
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { Inter } from '@next/font/google'
import HomeComponent from '../components/HomeComponet'
import { useDispatch, useSelector } from 'react-redux'
import { selectKey, selectProvider, selectWeb3Auth, setProvider, setWeb3Auth } from '../slice/userSlice'
import { useEffect } from 'react'
import { CHAIN_NAMESPACES } from '@web3auth/base';
import SignUpComponent from '../components/SignUpComponent';
import { SolanaPrivateKeyProvider } from '@web3auth/solana-provider';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { selectIsUserLogin, setIsUserLogin } from '../slice/AppSlices';
import PageChecker from '../components/page/pageChecker';


const inter = Inter({ subsets: ['latin'] })
const clientId = process.env.NEXT_PUBLIC_SWEB3AUTH_CLIENT_ID

export default function Home() {
  const provider = useSelector(selectProvider)
  const web3auth = useSelector(selectWeb3Auth)
  const isUserLogin = useSelector(selectIsUserLogin)
  const dispatch = useDispatch()

  useEffect(() => {
    const init = async () => {
      try {
        const chainConfig = {
          chainNamespace: CHAIN_NAMESPACES.SOLANA,
          chainId: "0x1", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
          rpcTarget: `https://rpc.helius.xyz/?api-key=${process.env.NEXT_PUBLIC_RPS_ID}`,
          displayName: "Solana Mainnet",
          blockExplorer: "https://explorer.solana.com",
          ticker: "SOL",
          tickerName: "Solana Token",
        };
        // eslint-disable-next-line @typescript-eslint/no-shadow
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
        if (web3auth.connected){
          dispatch(setIsUserLogin(true))
        }
        else{
          dispatch(setIsUserLogin(false))
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <div className={inter.className}>
        <div className='h-screen max-w-[500px] mx-auto'>
          {isUserLogin ?
              <div>
                <PageChecker />
              </div>
              :
              <SignUpComponent />
            }
        </div>
     </div>
    </>
  )
}
