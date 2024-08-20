import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
function ShopBtn() {
  return (
    <Link to={"/Shop"} className='inline-flex w-fit'>
    <Button
    mt={3}
    className=" active:scale-75 cursor-pointer transition-all ease-in duration-150"
    colorScheme="red"
    display={"inline-flex"}
    letterSpacing={1}
    fontSize={'13px'}
    w={'fit-content'}
    rightIcon={<i className="mt-1 fa-solid fa-arrow-right"></i>}
    zIndex={10}
  >
    Shop Now
  </Button>
  </Link>
  )
}

export default ShopBtn;
