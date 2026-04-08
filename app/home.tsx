import { Container } from '@/components/general/container';
import { CompleteProfile } from '@/components/Home/completeProfile/completeProfile';
import { Header } from '@/components/Home/header/header';
import { RouteGrid } from '@/components/Home/routeGrid/main';

export default function Home() {
  return (
    <Container>
      <Header />
      <CompleteProfile/>
      <RouteGrid />
    </Container>
  );
}
