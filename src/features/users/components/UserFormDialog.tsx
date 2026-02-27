import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import type { CreateUserRequest, User } from '../types/user';

interface UserFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateUserRequest) => void;
  isSubmitting?: boolean;
  user?: User | null;
}

export default function UserFormDialog({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
  user,
}: UserFormDialogProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName ?? '');
      setLastName(user.lastName);
      setDateOfBirth(user.dateOfBirth ?? '');
    } else {
      setFirstName('');
      setLastName('');
      setDateOfBirth('');
    }
  }, [user]);

  const handleSubmit = () => {
    const payload: CreateUserRequest = {
      firstName: firstName.trim() || undefined,
      lastName: lastName.trim(),
      dateOfBirth: dateOfBirth || undefined,
    };

    onSubmit(payload);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>{user ? 'Edit User' : 'Create User'}</DialogTitle>

      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
      >
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={isSubmitting}
        />

        <TextField
          label="Last Name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={isSubmitting}
        />

        <TextField
          label="Date of Birth"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          InputLabelProps={{ shrink: true }}
          disabled={isSubmitting}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          loading={isSubmitting}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
