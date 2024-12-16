import { Button } from "@mui/material";
import { MODALS, useModals } from "../../../hooks/useModal";

export const AddTransaction = ({ walletId, onAddNewTransaction }) => {
  const { showModal } = useModals();

  return (
    <Button
      variant={"contained"}
      color="success"
      onClick={() => {
        showModal(MODALS.ADD_TRANSACTION, walletId, onAddNewTransaction);
        onAddNewTransaction();
      }}
    >
      Tranzakció hozzáadása
    </Button>
  );
};