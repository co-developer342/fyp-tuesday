import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../../context/cart.js';
import ProductCard from './card.jsx';
// Make sure this path is correct

function ProductTabs() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  const toast = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/v1/product/get-product'); // Adjust the endpoint as needed
        setProducts(data?.products);
        console.log(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem('cart', JSON.stringify([...cart, product]));

    toast({
      title: 'Item Added to Cart',
      description: `${product.name} has been added to your cart.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const truncateDescription = (description, maxWords) => {
    const words = description.split(' ');
    if (words.length > maxWords) {
      return `${words.slice(0, maxWords).join(' ')}...`;
    }
    return description;
  };

  return (
    <Flex justify={'center'}>
      <Tabs
        variant={'unstyled'}
        border={'none'}
        align="center"
        textAlign="center"
        w={'90%'}
        mb={10}
      >
        <TabList textAlign={'center'}>
          <Tab _selected={{ color: 'white', bg: 'red.500' }}>Featured</Tab>
          <Tab _selected={{ color: 'white', bg: 'red.500' }}>Top rated</Tab>
          <Tab _selected={{ color: 'white', bg: 'red.500' }}>Latest</Tab>
          <Tab _selected={{ color: 'white', bg: 'red.500' }}>Special</Tab>
        </TabList>

        <TabPanels>
          {['Featured', 'Top rated', 'Latest', 'Special'].map((tab, index) => (
            <TabPanel
              key={index}
              alignItems="center"
              justifyContent="center"
              mt={10}
              flexWrap={"wrap"}
              display={"flex"}
              gap={10}
            >
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default ProductTabs;
