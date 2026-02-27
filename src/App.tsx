import { useState } from 'react';
import './App.css';
import UsersList from './features/users/components/UsersList';
import { Box, Button } from '@mui/material';
import UserFormDialog from './features/users/components/UserFormDialog';
import type { CreateUserRequest, User } from './features/users/types/user';
import { useCreateUser, useUpdateUser } from './features/users/hooks/useUsers';

function App() {
  const [openUserFormDialog, setOpenUserFormDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setOpenUserFormDialog(true);
  };

  const handleSubmitUser = (payload: CreateUserRequest) => {
    if (selectedUser) {
      updateUserMutation.mutate(
        { id: selectedUser.id, payload },
        {
          onSuccess: () => {
            setOpenUserFormDialog(false);
            setSelectedUser(null);
          },
        },
      );
    } else {
      createUserMutation.mutate(payload, {
        onSuccess: () => {
          setOpenUserFormDialog(false);
          setSelectedUser(null);
        },
      });
    }
  };

  return (
    <>
      <UserFormDialog
        isOpen={openUserFormDialog}
        onClose={() => {
          setOpenUserFormDialog(false);
          setSelectedUser(null);
        }}
        onSubmit={handleSubmitUser}
        user={selectedUser}
        isSubmitting={
          createUserMutation.isPending || updateUserMutation.isPending
        }
      />

      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={() => setOpenUserFormDialog(true)}
          >
            Add User
          </Button>
        </Box>

        <Box sx={{ flex: 1 }}>
          <UsersList onEdit={handleEditUser} />
        </Box>
      </Box>
    </>
  );
}

export default App;
