import { useState } from 'react';
import './App.css';
import UsersList from './features/users/components/UsersList';
import { Box, Button } from '@mui/material';
import UserFormDialog from './features/users/components/UserFormDialog';
import type { CreateUserRequest } from './features/users/types/user';
import { useCreateUser } from './features/users/hooks/useUsers';

function App() {
  const [openUserFormDialog, setOpenUserFormDialog] = useState(false);

  const createUserMutation = useCreateUser();

  const handleCreateUser = (payload: CreateUserRequest) => {
    createUserMutation.mutate(payload, {
      onSuccess: () => setOpenUserFormDialog(false),
    });
  };

  return (
    <>
      <UserFormDialog
        isOpen={openUserFormDialog}
        onClose={() => setOpenUserFormDialog(false)}
        onSubmit={handleCreateUser}
        isSubmitting={createUserMutation.isPending}
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
          <UsersList />
        </Box>
      </Box>
    </>
  );
}

export default App;
