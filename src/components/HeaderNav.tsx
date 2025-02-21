
import React, { useCallback, useEffect, useState } from 'react';
import {
  ConnectWalletButton
} from '@gokiprotocol/walletkit';
import {
  useConnectedWallet, useSolana
} from '@saberhq/use-solana';
import {
  LAMPORTS_PER_SOL
} from '@solana/web3.js';
import styles_header from '../styles/Header.module.scss';
import LogoImg from './Images/psyoptions-logo-light.png';

//const drawerWidth = 240;
const Header = () => {
  const {
    walletProviderInfo,
    disconnect,
    providerMut,
    network
  } = useSolana();
  const wallet = useConnectedWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const refetchSOL = useCallback(async () => {
    if (wallet && providerMut) {
      setBalance(await providerMut.connection.getBalance(wallet.publicKey));
    }
  }, [providerMut, wallet]);
  useEffect(() => {
    void refetchSOL();
  }, [refetchSOL]);

  //const [openModal, setOpenModal] = useState(false)
  const [popupVisible, setPopupVisible] = useState<boolean>(false)


  //https://www.youtube.com/watch?v=IF6k0uZuypA
  function togglePopup() {
    setPopupVisible(!popupVisible)
  }

  return (
    <nav className={styles_header.header}>
      <div className="box"></div>
        {/*style="background: linear-gradient(90deg, rgb(221, 62, 118) -0.83%, rgb(29, 77, 201) 100%);"*/}
        
          <div className="button-container"></div>
            <button className="logo-button" onClick={() => {
                window.open("https://trade.psyoptions.io/#/");
              }}> 
              <img className = "PsyOpLogo" alt = 'PsyOptions Home' src={LogoImg} width="30" height="30"/>
              </button>
            <button className="markets-button" onClick={() => {
                //do something
              }}> Markets</button>
            <button className="portfolio-button" onClick={() => {
                //do something
              }}> Portfolio</button>
            <button className="wallet-button" onClick={() => {
                //setOpenModal(true);
              }}> Wallet</button>
            <button className="docs-button" onClick={() => {
                window.open("https://docs.psyoptions.io/");
              }}> Docs</button>
          
      <>
        {wallet?.connected ? (
          <>

          </>
        ) : (
          <ul >
            
          </ul>
        )}
      </>
    </nav>
  );
};


//<li><div className='psy-button-group'> <ConnectWalletButton /></div></li>
export default Header;
