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

interface FormErrors {
  lastName?: string;
  dateOfBirth?: string;
}

export default function UserFormDialog({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
  user,
}: UserFormDialogProps) {
  const [form, setForm] = useState<CreateUserRequest>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!isOpen) return;

    setForm({
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      dateOfBirth: user?.dateOfBirth ?? '',
    });

    setErrors({});
  }, [isOpen, user]);

  const handleChange =
    (field: keyof CreateUserRequest) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));

      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!form.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!form.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else if (form.dateOfBirth > today) {
      newErrors.dateOfBirth = 'Date of birth cannot be in the future';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validate()) return;

    onSubmit({
      firstName: form.firstName?.trim() || undefined,
      lastName: form.lastName.trim(),
      dateOfBirth: form.dateOfBirth || undefined,
    });
  };

  const handleDialogClose = (
    _: unknown,
    reason?: 'backdropClick' | 'escapeKeyDown',
  ) => {
    if (isSubmitting) return;

    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;

    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleDialogClose}
      disableEscapeKeyDown={isSubmitting}
      fullWidth
    >
      <form onSubmit={handleFormSubmit}>
        <DialogTitle>{user ? 'Edit User' : 'Create User'}</DialogTitle>

        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField
            label="First Name"
            value={form.firstName}
            onChange={handleChange('firstName')}
            disabled={isSubmitting}
          />

          <TextField
            label="Last Name"
            required
            value={form.lastName}
            onChange={handleChange('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName}
            disabled={isSubmitting}
          />

          <TextField
            label="Date of Birth"
            type="date"
            required
            value={form.dateOfBirth}
            onChange={handleChange('dateOfBirth')}
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth}
            InputLabelProps={{ shrink: true }}
            slotProps={{ htmlInput: { max: today } }}
            disabled={isSubmitting}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>

          <Button type="submit" variant="contained" loading={isSubmitting}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
