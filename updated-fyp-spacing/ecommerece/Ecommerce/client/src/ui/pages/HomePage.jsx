import { Box } from '@chakra-ui/react';
import Nav from '../components/navBar';
import HeroSec from '../components/heroSection';
import SecSection from '../components/secSection';
import ThirdSection from '../components/thirdSection';
import ProductTabs from '../components/ProductTabs';
import Footer from '../components/Footer';
function HomePage() {
  return (
    <Box>
      <Nav />
      <HeroSec />
      <SecSection />
      <ThirdSection />
      <ProductTabs />
      <Footer />
    </Box>
  );
}

export default HomePage;
