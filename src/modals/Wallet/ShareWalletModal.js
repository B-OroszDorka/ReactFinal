import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, List, ListItem, ListItemText, Button, CircularProgress } from '@mui/material';
import { doApiCall, AXIOS_METHOD } from '../../hooks/useApi';
import UserFriendlyAlert from "../../components/UserFriendlyAlert";

const ShareWalletModal = ({ walletId, onClose }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [grantingAccess, setGrantingAccess] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const fetchUsers = (isLoadMore = false) => {
    setLoading(true);
    try {
      doApiCall(
        AXIOS_METHOD.POST,
        "/user/list",
        (data) => {
          if (isLoadMore) {
            setUsers((prevUsers) => [...prevUsers, ...data.users]);
            setFilteredUsers((prevUsers) => [...prevUsers, ...data.users]);
          } else {
            setUsers(data.users);
            setFilteredUsers(data.users);
          }
          setHasMore(data.has_more);
          if (data.cursor) {
            setCursor(data.cursor);
          } else {
            console.warn('No cursor returned from API. Pagination might not work correctly.');
          }
          setLoading(false);
        },
        (err) => {
          console.error("Error:", err);
          setLoading(false);
        },
        {
          cursor: isLoadMore ? cursor : undefined,
          limit: 5,
        }
      );
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    setFilteredUsers(
      users.filter((user) => user.name.toLowerCase().includes(value))
    );
  };

  const handleGrantAccess = async (userId) => {
    try {
      setGrantingAccess(true);
      doApiCall(
        AXIOS_METHOD.POST,
        `/wallet/${walletId}/grant_access`,
        (data) => {
          setGrantingAccess(false);
          setOpenSnackbar(true);
          setTimeout(() => {
            onClose();
          }, 2000);
        },
        (err) => {
          if (err === "Error: Access is already granted to that user!") {
            alert('A választott felhasználó már eléri a tárcát!');
          }
          console.error("Error:", err);
        },
        {
          user_id: userId
        }
      );
    } catch (error) {
      console.error('Error granting access:', error);
      alert('Failed to grant access. Please try again.');
    } finally {
      setGrantingAccess(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Modal open onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Tárca megosztása
          </Typography>
          <TextField
            fullWidth
            placeholder="Felhasználó keresése..."
            value={search}
            onChange={handleSearchChange}
            sx={{ mb: 2 }}
          />
          {!users.length ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {filteredUsers.map((user) => (
                <ListItem
                  key={user.id}
                  secondaryAction={
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleGrantAccess(user.id)}
                      disabled={grantingAccess}
                    >
                      Megosztás
                    </Button>
                  }
                >
                  <ListItemText primary={user.name} />
                </ListItem>
              ))}
              {hasMore && (
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Button variant="outlined" onClick={() => fetchUsers(true)} disabled={loading}>
                    Továbbiak betöltése
                  </Button>
                </Box>
              )}
            </List>
          )}
          <Box sx={{ textAlign: 'right', mt: 2 }}>
            <Button onClick={onClose} color="secondary">
              Bezárás
            </Button>
          </Box>
        </Box>
      </Modal>
      <UserFriendlyAlert openSnackbar={openSnackbar} message="Sikeres megosztás!" setOpenSnackbar={setOpenSnackbar} />
    </div>
  );
};

export default ShareWalletModal;

