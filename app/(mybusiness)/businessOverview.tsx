import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';
import Address from '@/components/overview/address';
import EditButton from '@/components/overview/editButton';
import Journey from '@/components/overview/journey';

export default function Overview() {
  //requisições para pegar a história e o endereço do restaurante
  const story =
    'Tudo começou na cozinha da nossa avó, onde o aroma de temperos frescos e o calor do fogão a lenha nos ensinaram sobre o amor em forma de comida. Nosso restaurante nasceu desse sonho: compartilhar os sabores da nossa infância';
  const address = 'Rua Parnaíba, 23. João Pessoa, Paraíba.';
  return (
    <Container>
      <Header title="Visão geral" showBackButton showNotificationButton />
      <Journey story={story} />
      <Address address={address} />
      <EditButton />
    </Container>
  );
}
