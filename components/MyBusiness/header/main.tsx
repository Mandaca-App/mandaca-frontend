import { Header } from '@/components/general/header';

type Props = {
  title?: string;
};

export const MyBusinessHeader = ({ title = 'Minha Empresa' }: Props) => {
  return <Header title={title} showBackButton showNotificationButton />;
};
