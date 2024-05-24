import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const UserLayout: FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default UserLayout;
