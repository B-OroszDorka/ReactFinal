import React, { useCallback, useContext, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RegModal from "../modals/RegModal";
import ConfirmModal from "../modals/ConfirmModal";
import ErrorModal from "../modals/ErrorModal";
import { AddTransactionModal } from '../modals/Transaction/AddTransactionModal';
import ShareWalletModal from '../modals/Wallet/ShareWalletModal';

const ModalContext = React.createContext();
ModalContext.displayName = 'ModalContext';

export const MODALS = {
    'NONE': 'NONE',
    'CONFIRM': 'CONFIRM',
    'LOGIN': 'LOGIN',
    'REG': 'REG',
    'SHARE_WALLET': 'SHARE_WALLET',
    'ADD_TRANSACTION': 'ADD_TRANSACTION',
    'ERROR': 'ERROR'
};

export function Modals() {
    return (
        <ModalContext.Consumer>
            {(context) => {
                const onClose = () => context.showModal(MODALS.NONE);
                switch (context.currentModal) {
                    case MODALS.REG:
                        return <RegModal onClose={onClose} {...context.modalProps} />;
                    case MODALS.CONFIRM:
                        return <ConfirmModal onClose={onClose} {...context.modalProps} />;
                    case MODALS.ADD_TRANSACTION:
                        return (
                            <AddTransactionModal onClose={onClose} {...context.modalProps} />
                        );
                    case MODALS.SHARE_WALLET:
                        return (
                            <ShareWalletModal onClose={onClose} {...context.modalProps} />
                        );
                    case MODALS.ERROR:
                        return <ErrorModal onClose={onClose} {...context.modalProps} />;
                    case MODALS.NONE:
                    default:
                        return null;
                }
            }}
        </ModalContext.Consumer>
    );
}

export function ModalContextProvider({ children }) {
    const [currentModal, setCurrentModal] = useState(false);
    const [modalProps, setModalProps] = useState({});
    const showModal = useCallback(
        (newModal, newModalProps = {}) => {
            setModalProps(newModalProps);
            setCurrentModal(newModal);
        },
        [setCurrentModal, setModalProps]
    );
    return (
        <ModalContext.Provider value={{ currentModal, showModal, modalProps }}>
            {children}
            <BrowserRouter>
                <Modals />
            </BrowserRouter>
        </ModalContext.Provider>
    );
}

export function useModals() {
    return useContext(ModalContext);
}