import { Flex, Text, Button, Img } from '@chakra-ui/react';
import React from 'react';
import BgImg from '../assets/images/abstract-red-circle-black-background-technology_1142-9839.jpg';
import HeroImg from '../assets/images/0a48d49733d61d3fa6a2ad469bc69ff3-removebg-preview-transformed.png';
import ShopBtn from './ShopBtn/ShopBtn';
function heroSection() {
  return (
    <Flex
      //   h={'fit-content'}
      bgPos={'center'}
      position={"relative"}
      h={{ base: '100vh', md: '90vh' }}
      bgSize={'cover'}
      bgImg={BgImg}
      justify={'center'}
      flexDir={{ base: 'column', md: 'row' }}
    >
      <Flex
        w={{base:"100%", md:"50%", lg:"50%"}}
        //   h={'fit-content'}
        p={{base:"20px", md:'0px'}}
        bg={'rgba(0,0,0,0.5)'}
        display={'flex'}
        justify={'center'}
        //   flexWrap={'wrap'}
        flexDir={'column'}
      >
        <Text
          color={'white'}
          letterSpacing={2}
          fontWeight={'600'}
          textTransform={'uppercase'}
        >
          Shop SAFE
        </Text>
        <Text
          fontSize={{base:"40px", md:"70px"}}
          letterSpacing={'0.5px'}
          lineHeight={{base:"2.8rem", md:"3.5rem", lg:"5rem"}}
          fontWeight={'600'}
          color={'gray.200'}
          as={'h1'}
        >
          Unlock Exclusive Deals Be the Best, Shop the Best
        </Text>
        <Text w={"80%"} mt={2} color={'gray.200'}>
          Be the best by shopping the best with our unparalleled selection of
          premium products. Take advantage of exclusive deals that bring
          you top-quality items at  unbeatable prices.
        </Text>
        <ShopBtn/>
      </Flex>
      <Flex justify={"center"} >
        <Img mt={10} w={{base:"40%", md:"90%"}} h={'90%'} src={HeroImg} />
      </Flex>
    </Flex>
  );
}

export default heroSection;
