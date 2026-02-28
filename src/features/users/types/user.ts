export type EntityId = string | number;

export type UserFields = {
  firstName?: string;
  lastName: string;
  dateOfBirth: string;
};

export type User = UserFields & { id: EntityId };
export type CreateUserRequest = UserFields;
export type UpdateUserRequest = UserFields;
