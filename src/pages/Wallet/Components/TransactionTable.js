import { Delete } from "@mui/icons-material";
import {
    Button,
    IconButton,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { MODALS, useModals } from "../../../hooks/useModal";

const formatterToDateString = new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
});

const formatterToTimeString = new Intl.DateTimeFormat("hu-HU", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
});

export const TransactionTable = ({
    transactions,
    hasMore,
    onLoadMore,
    loading,
    onDeleteTransaction,
}) => {
    const { showModal } = useModals();

    const sortedTransactions = Array.isArray(transactions)
        ? transactions.filter((transaction) => transaction && transaction.title)
        : [];

    return (
        <Table stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Typography variant="h6">Megnevezés</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h6">Tulajdonos</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h6">Dátum</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h6">Idő</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                        <Typography variant="h6">Összeg</Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {sortedTransactions.length > 0 ? (
                    sortedTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell>{transaction.title}</TableCell>
                            <TableCell>{transaction.created_by.name}</TableCell>
                            <TableCell>
                                {formatterToDateString.format(new Date(transaction.created_at))}
                            </TableCell>
                            <TableCell>
                                {formatterToTimeString.format(new Date(transaction.created_at))}
                            </TableCell>
                            <TableCell>{transaction.amount}</TableCell>
                            <TableCell align="right">
                                <IconButton
                                    size="small"
                                    onClick={() => {
                                        showModal(MODALS.CONFIRM, {
                                            onConfirmed: () => {
                                                onDeleteTransaction(transaction.id);
                                            },
                                            message:
                                                "Biztosan törölni szeretnéd a tranzakciót?",
                                        });
                                    }}
                                >
                                    <Delete color={"error"} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                            <Typography variant="body1">Nincsenek tranzakciók.</Typography>
                        </TableCell>
                    </TableRow>
                )}
                {loading && (
                    <TableRow>
                        <TableCell sx={{ borderWidth: 0 }} colSpan={5}>
                            <LinearProgress />
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell sx={{ borderWidth: 0 }} colSpan={6}>
                        {hasMore && !loading && (
                            <Button variant="contained" onClick={onLoadMore} fullWidth>
                                Továbbiak betöltése
                            </Button>
                        )}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};
