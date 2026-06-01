export type Task = {
  id: number;
  taskname: string;
  description: string;
  userId: number;
};

export type User = {
    id: number;
    name: string;
    email: string;
    tasks: Task[];
};

export type CreateUserFormProps = {
    onUsersCreated: () => void;
}

export type UserListProps = {
  users: User[]
  onDelete?: (id: number) => void;
  onUpdate?: (id: number, name: string, email: string) => void;
  onRefresh: () => Promise<void>;
}

export type UserItemProps = {
  user: User;
  onDelete?: (id: number) => void;
  onUpdate?: (
    id: number,
    name: string,
    email: string
  ) => void;
  onRefresh: () => Promise<void>;
}

