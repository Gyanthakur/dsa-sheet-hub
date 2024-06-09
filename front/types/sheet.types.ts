export type userProps = {
  name: string;
  username: string;
  _id?: string;
  email?: string;
};
export type sheetProps = {
  _id: string;
  addedBy: userProps | string;
  description: string;
  isPublic: boolean;
  name: string;
  questions: string[];
  title: string;
  starCount: number;
  createdAt?: string;
  updatedAt?: string;
};
