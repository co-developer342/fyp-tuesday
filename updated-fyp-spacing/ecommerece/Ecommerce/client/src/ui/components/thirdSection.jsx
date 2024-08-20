import { Flex, Img, Text, IconButton } from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import ShopBtn from './ShopBtn/ShopBtnBg';

function ThirdSection() {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [response1, response2] = await Promise.all([
          axios.get('/api/v1/product/product-list/1'),
          axios.get('/api/v1/product/product-list/2')
        ]);

        const allProducts = [...response1.data.products, ...response2.data.products];
        setProducts(allProducts.slice(0, 6));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Flex flexDirection={'column'} my={2} mx={{ base: '30px', md: '40px' }} justify={'center'} position="relative">
      <Text as={'h3'} fontSize={'30px'} fontWeight={'700'} textAlign={'center'}>
        Top Rated Products
      </Text>
      <Flex position="relative" alignItems="center" justifyContent="center">
        <IconButton
          icon={<ChevronLeftIcon boxSize={12} />} // Increase size of icon
          position="absolute"
          left="-40px" // Position just before the screen border
          zIndex="1"
          onClick={() => handleScroll('left')}
          size="lg"
          bg="transparent" // Transparent background
          _hover={{ bg: 'gray.200' }}
          aria-label="Scroll Left"
        />
        <Flex
          ref={scrollRef}
          overflow="hidden" // Hide the scrollbar
          p={4}
          gap={4}
          flexWrap={'nowrap'}
          mx="auto"
          css={{
            '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for WebKit browsers
            '-ms-overflow-style': 'none', // Hide scrollbar for IE and Edge
            'scrollbar-width': 'none' // Hide scrollbar for Firefox
          }}
        >
          {products.map((product) => (
            <Flex
              key={product._id}
              flexDirection={'column'}
              minWidth={{ base: '250px', md: '300px' }}
              p={4}
              rounded={20}
              
              boxShadow={'0px 4px 10px rgba(0, 0, 0, 0.1)'}
              mr={4}
              
            >
              <Img
                w='full'
                src={`/api/v1/product/product-photo/${product._id}`}
                objectFit='cover'
                alt={product.name}
                borderRadius="lg"
                h={{ base: '150px', md: '200px' }}
              />
              <Flex flexDirection={'column'} mt={2}  align={'center'}
                    justify={'center'}
                    alignItems={'center'}>
                <Text fontWeight={'600'} fontSize={'22px'}>
                  {product.name}
                </Text>
                <Text color={'gray.700'} fontWeight={'500'} fontSize={'14px'}>
                  {product.description.substring(0, 30)}...
                </Text>
                <Text fontSize={'25px'} fontWeight={'600'} color={'red'}>
                  ${product.price}
                </Text>
                <ShopBtn />
              </Flex>
            </Flex>
          ))}
        </Flex>
        <IconButton
          icon={<ChevronRightIcon boxSize={12} />} // Increase size of icon
          position="absolute"
          right="-40px" // Position just before the screen border
          zIndex="1"

          onClick={() => handleScroll('right')}
          size="lg"
          bg="transparent" // Transparent background
          _hover={{ bg: 'gray.200' }}
          aria-label="Scroll Right"
        />
      </Flex>
    </Flex>
  );
}

export default ThirdSection;
