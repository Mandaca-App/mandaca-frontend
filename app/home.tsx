import { Container } from '@/components/general/container';
import { CompleteProfile } from '@/components/Home/completeProfile/main';
import { Header } from '@/components/Home/header/main';
import { RouteGrid } from '@/components/Home/routeGrid/main';

export default function Home() {
  return (
    <Container>
      <Header />
      <CompleteProfile prifileProgress={200} />
      <RouteGrid />
    </Container>
  );
}
