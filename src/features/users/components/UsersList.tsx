import {
  Box,
  Button,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useState } from 'react';
import { useDeleteUser, useUsers } from '../hooks/useUsers';
import type { User } from '../types/user';

interface UsersListProps {
  onEdit: (user: User) => void;
  isSubmittingUser?: boolean;
}

export default function UsersList({
  onEdit,
  isSubmittingUser = false,
}: UsersListProps) {
  const { data: users, isPending, isFetching, isError } = useUsers();
  const deleteUserMutation = useDeleteUser();

  const [deletingId, setDeletingId] = useState<User['id'] | null>(null);

  const usersList = users ?? [];
  const showLoadingSkeletons =
    usersList.length === 0 && (isPending || isFetching);

  const handleDelete = (id: User['id']) => {
    setDeletingId(id);

    deleteUserMutation.mutate(id, {
      onSettled: () => setDeletingId(null),
    });
  };

  if (isError) return <div>Error loading users</div>;

  const textSkeleton = <Skeleton variant="text" height={24} />;
  const actionSkeleton = (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Skeleton variant="text" height={24} width={60} />
      <Skeleton variant="text" height={24} width={60} />
    </Box>
  );

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
            {showLoadingSkeletons ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>{textSkeleton}</TableCell>
                  <TableCell>{textSkeleton}</TableCell>
                  <TableCell>{textSkeleton}</TableCell>
                  <TableCell>{actionSkeleton}</TableCell>
                </TableRow>
              ))
            ) : usersList.length ? (
              usersList.map((user) => {
                const isDeletingRow =
                  deleteUserMutation.isPending && deletingId === user.id;

                const disableActions =
                  isSubmittingUser ||
                  isDeletingRow ||
                  deleteUserMutation.isPending;

                const showRowSkeletons = isFetching;

                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      {showRowSkeletons
                        ? textSkeleton
                        : (user.firstName ?? '-')}
                    </TableCell>

                    <TableCell>
                      {showRowSkeletons ? textSkeleton : user.lastName}
                    </TableCell>

                    <TableCell>
                      {showRowSkeletons
                        ? textSkeleton
                        : (user.dateOfBirth ?? '-')}
                    </TableCell>

                    <TableCell>
                      {showRowSkeletons || isDeletingRow ? (
                        actionSkeleton
                      ) : (
                        <>
                          <Button
                            size="small"
                            onClick={() => onEdit(user)}
                            disabled={disableActions}
                          >
                            Edit
                          </Button>

                          <Button
                            size="small"
                            color="error"
                            disabled={disableActions}
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
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
