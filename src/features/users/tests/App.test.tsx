import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../../App';

const mockDelete = jest.fn();

jest.mock('../hooks/useUsers', () => ({
  useUsers: () => ({
    data: [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
      },
    ],
    isPending: false,
    isFetching: false,
    isError: false,
  }),

  useCreateUser: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),

  useUpdateUser: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),

  useDeleteUser: () => ({
    mutate: mockDelete,
    isPending: false,
  }),
}));

test('renders users from API', async () => {
  render(<App />);
  expect(await screen.findByText('Doe')).toBeInTheDocument();
});

test('shows validation error when last name is missing', async () => {
  render(<App />);

  await userEvent.click(screen.getByRole('button', { name: /add user/i }));
  await userEvent.click(screen.getByRole('button', { name: /save/i }));

  expect(await screen.findByText(/last name is required/i)).toBeInTheDocument();
});

test('shows error when date of birth is in the future', async () => {
  render(<App />);

  await userEvent.click(screen.getByRole('button', { name: /add user/i }));

  await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');

  await userEvent.type(screen.getByLabelText(/date of birth/i), '2100-01-01');

  await userEvent.click(screen.getByRole('button', { name: /save/i }));

  expect(
    await screen.findByText(/date of birth cannot be in the future/i),
  ).toBeInTheDocument();
});

test('opens edit dialog when clicking edit', async () => {
  render(<App />);

  const editButton = await screen.findByRole('button', { name: /edit/i });

  await userEvent.click(editButton);

  expect(await screen.findByText(/edit user/i)).toBeInTheDocument();
});

test('calls delete mutation when delete button clicked', async () => {
  render(<App />);

  const deleteButton = await screen.findByRole('button', { name: /delete/i });

  await userEvent.click(deleteButton);

  expect(mockDelete).toHaveBeenCalledWith('1', expect.any(Object));
});
