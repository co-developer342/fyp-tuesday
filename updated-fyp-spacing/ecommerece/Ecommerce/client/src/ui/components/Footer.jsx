import { Box, Flex, Img, Text, Input, Button} from '@chakra-ui/react';
import Footerimg from '../assets/images/logo_top_bar.png';
function Footer() {
  return (
    <Box bg={'#000000'}>
      <Flex flexWrap={"wrap"} gap={{base:'3rem', md:"5rem"}} py={10} px={{base:"0.5rem"}} justify={'center'}>
        <Flex gap={2} flexDir={'column'}>
          <Img w="10rem" src={Footerimg} />
          <Text color={'gray.200'}>
            Lorem ipsum dolor sit amet consectetur adipisicing <br /> elit. Quos
            quasi error et magnam, corporis rem <br /> porro qui atque
            architecto
          </Text>
          <Text color={'gray.500'}>
            Copyright Free ❤️ Loved by Everyone ^_^
          </Text>
        </Flex>
        <Flex gap={2} flexDir={"column"} as={"ul"}>
            <Text _hover={{color:"red"}} color={"whitesmoke"} as={"li"}>
                Home
            </Text>
            <Text _hover={{color:"red", cursor:"pointer"}} color={"whitesmoke"} as={"li"}>
                Shop
            </Text>
            <Text _hover={{color:"red", cursor:"pointer"}} color={"whitesmoke"} as={"li"}>
                Products
            </Text>
            <Text _hover={{color:"red", cursor:"pointer"}} color={"whitesmoke"} as={"li"}>
                Cart
            </Text>
            <Text _hover={{color:"red", cursor:"pointer"}} color={"whitesmoke"} as={"li"}>
            Checkout
            </Text>
        </Flex>
        <Flex gap={2} flexDir={"column"} as={"ul"}>
            <Text _hover={{color:"red"}} color={"whitesmoke"} as={"li"}>
                Home
            </Text>
            <Text _hover={{color:"red", cursor:"pointer"}} color={"whitesmoke"} as={"li"}>
                Shop
            </Text>
            <Text _hover={{color:"red", cursor:"pointer"}} color={"whitesmoke"} as={"li"}>
                Products
            </Text>
            <Text _hover={{color:"red", cursor:"pointer"}} color={"whitesmoke"} as={"li"}>
                Cart
            </Text>
            <Text _hover={{color:"red", cursor:"pointer"}} color={"whitesmoke"} as={"li"}>
            Checkout
            </Text>
        </Flex>
        <Flex gap={2} flexDir={"column"} as={"ul"}>
            <Text _hover={{color:"red"}} color={"whitesmoke"} as={"li"}>
                Home
            </Text>
            <Text _hover={{color:"red", cursor:"pointer"}} color={"whitesmoke"} as={"li"}>
                Shop
            </Text>
            <Text _hover={{color:"red", cursor:"pointer"}} color={"whitesmoke"} as={"li"}>
                Products
            </Text>
            <Text _hover={{color:"red", cursor:"pointer"}} color={"whitesmoke"} as={"li"}>
                Cart
            </Text>
            <Text _hover={{color:"red", cursor:"pointer"}} color={"whitesmoke"} as={"li"}>
            Checkout
            </Text>
        </Flex>
        <Flex gap={2}>
        <Input _placeholder={{color:"gray.200"}} placeholder='Subscribe to our Newsletter' type="text" w={"90%"} />
        <Button colorScheme='red'>Subscribe</Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Footer;
