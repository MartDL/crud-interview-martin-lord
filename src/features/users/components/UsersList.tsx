import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useDeleteUser, useUsers } from '../hooks/useUsers';

export default function UsersList() {
  const { data: users, isPending, isError } = useUsers();
  const deleteUserMutation = useDeleteUser();

  if (isPending) return <CircularProgress />;
  if (isError) return <div>Error loading users</div>;

  const usersList = users ?? [];

  return (
    <Box
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TableContainer
        component={Paper}
        sx={{ flex: 1, border: '1px solid #676767' }}
      >
        <Table sx={{ height: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {usersList.length ? (
              usersList.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.firstName ?? ''}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.dateOfBirth ?? ''}</TableCell>
                  <TableCell>
                    <Button size="small">Edit</Button>

                    <Button
                      size="small"
                      color="error"
                      disabled={deleteUserMutation.isPending}
                      onClick={() => deleteUserMutation.mutate(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow sx={{ height: '100%' }}>
                <TableCell
                  colSpan={4}
                  sx={{ textAlign: 'center', verticalAlign: 'middle' }}
                >
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
