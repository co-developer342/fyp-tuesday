import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
function ShopBtnBg() {
  return (
    <Link to={"/Shop"}>
    <Button
      mt={0}
      className=" active:scale-75 cursor-pointer transition-all ease-in duration-150"
      color="red"
      letterSpacing={1}
      p={0}
      fontSize={'13px'}
      bg={'transparent'}
      _hover={{ bg: 'transparent' }}
      _active={{ bg: 'transparent' }}
      w={'fit-content'}
      rightIcon={<i className="mt-1 fa-solid fa-arrow-right"></i>}
      zIndex={10}
    >
      Shop Now
    </Button>
    </Link>
  );
}

export default ShopBtnBg;
