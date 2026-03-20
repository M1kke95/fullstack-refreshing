export type User = {
    id: number;
    name: string;
    email: string;
};

export type CreateUserFormProps = {
    onUsersCreated: () => void;
}

export type UserListProps = {
  users: User[]
  onDelete?: (id: number) => void;
  onUpdate?: (id: number, name: string, email: string) => void;
}

export type UserItemProps = {
  user: User
  onDelete?: (id: number) => void
}