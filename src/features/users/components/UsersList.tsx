import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const mockUsers = [
  { id: 1, firstName: 'John', lastName: 'Smith', dateOfBirth: '1990-05-14' },
  { id: 2, firstName: 'Sarah', lastName: 'Johnson', dateOfBirth: '1988-11-02' },
  { id: 3, firstName: 'Michael', lastName: 'Brown', dateOfBirth: '1995-07-21' },
];

export default function UsersList() {
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
            {mockUsers.length ? (
              mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.dateOfBirth}</TableCell>
                  <TableCell>
                    <Button size="small">Edit</Button>
                    <Button size="small" color="error">
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
