import React, { useState, useEffect, useRef } from 'react';
import { Flex, Text, IconButton, Img, Button } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Img1 from '../assets/images/Screenshot 2024-08-03 160225.png';

function SecSection() {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get('/api/v1/category/all-category');
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllCategory();
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleShopNow = (categoryId) => {
    navigate(`/shop?category=${categoryId}`);
  };

  return (
    <Flex flexDirection={'column'} mt={6} mx={{ base: '30px', md: '40px' }} justify={'center'} position="relative">
      <Text as={'h3'} fontSize={'30px'} fontWeight={'700'} textAlign={'center'}>
        Featured Categories
      </Text>
      <Flex position="relative" alignItems="center" justifyContent="center" mt={6}>
        <IconButton
          icon={<ChevronLeftIcon boxSize={10} />}
          position="absolute"
          left="10px" // Adjusted to ensure proper spacing
          zIndex="1"
          onClick={() => handleScroll('left')}
          size="md"
          bg="transparent"
          _hover={{ bg: 'gray.200' }}
          aria-label="Scroll Left"
        />
        <Flex
          ref={scrollRef}
          overflow="hidden"
          p={4}
          gap={4}
          mx="auto"
          flexWrap={'nowrap'}
          css={{
            '&::-webkit-scrollbar': { display: 'none' },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none'
          }}
          style={{
            width: 'calc(100% - 100px)', // Adjusted to fit within the viewable area
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {categories.map((category) => (
            <Flex
              key={category._id}
              rounded={8}
              flexDirection={'column'}
              gap={4}
              fontWeight={'500'}
              fontSize={'16px'}
              py={4}
              px={6}
              bg={'#080609'}
              position="relative"
              minWidth={{ base: '150px', md: '200px' }}
              mr={4}
              flexShrink={0}
              justifyContent={'center'}
              alignItems={'center'}
              textAlign={'center'}
            >
              <Text color={'gray.200'} zIndex={10}>
                {category.name}
              </Text>
              <Button
                onClick={() => handleShopNow(category._id)}
                bg="red.500"
                color="white"
                // _hover={{ bg: 'transparent' }}
                _hover={{ bg: 'red.600' }}
                fontWeight="bold"
                mt={2} // Margin-top to ensure it is not hidden
                px={4} // Padding to the button
                py={2} // Padding to the button
                borderRadius="md"
                zIndex={10} // Ensure button is above other elements
              >
                Shop Now
              </Button>
              <Img
                position={'absolute'}
                w={{ base: "20vw", md: "8vw" }}
                src={Img1}
                bottom={0}
                right={0}
                zIndex={0} // Ensure image does not cover button
              />
            </Flex>
          ))}
        </Flex>
        <IconButton
          icon={<ChevronRightIcon boxSize={10} />}
          position="absolute"
          right="10px" // Adjusted to ensure proper spacing
          zIndex="1"
          onClick={() => handleScroll('right')}
          size="md"
          bg="transparent"
          _hover={{ bg: 'gray.200' }}
          aria-label="Scroll Right"
        />
      </Flex>
    </Flex>
  );
}

export default SecSection;
