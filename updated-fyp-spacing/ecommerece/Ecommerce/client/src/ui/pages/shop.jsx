import { useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  HStack,
  VStack,
  Stack,
  Text,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import NavBar from '../components/navBar';
import Drawer from '../components/Drawer';
import Footer from '../components/Footer';
import ProductCard from '../components/card';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category');

  useEffect(() => {
    getAllCategories();
    getTotalProducts();
    fetchProducts();
  }, [checked, priceRange, page]);

  useEffect(() => {
    if (initialCategory) {
      setChecked([initialCategory]);
    }
  }, [initialCategory]);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/all-category');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/product-count');
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const requestBody = {
        checked,
        radio: priceRange,
        page,
      };
      const { data } = await axios.post('/api/v1/product/product-filters', requestBody);
      setProducts(data?.products || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setProducts([]);
    }
  };

  const handleCategoryFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const handlePriceChange = (value) => {
    const range = value.split(',').map(Number);
    setPriceRange(range);
  };

  const resetFilters = async () => {
    setChecked([]);
    setPriceRange([]);
    setPage(1);
    await fetchProducts();
  };

  return (
    <>
      <NavBar />
      <Box>
        <Grid templateColumns='repeat(9, 1fr)' gap={0} mt={8} mb={8}>
          <GridItem
            colSpan={{ base: '9', md: '4', lg: '2' }}
            p={5}
            border='1px solid #e8e8e8'
            rounded={10}
            bg='white'
            boxShadow='md'
            position='sticky'
            top={0}
            zIndex={10}
          >
            <Flex direction='column'>
              <Flex justify='space-between' align='center' mb={0}>
                <Text fontWeight='600' fontSize='3xl'>Filters</Text>
                <Box display={{ base: 'none', md: 'none', lg: 'block' }}>
                  <i className="fa-regular fa-sliders text-xl mt-1 cursor-pointer"></i>
                </Box>
                <Box display={{ base: 'block', md: 'block', lg: 'none' }}>
                  <Drawer />
                </Box>
              </Flex>

              <Flex flexDir='column' display={{base:"none", md:"none", lg:'flex'}} gap={0}>
                <Text mb={3} fontWeight='600' fontSize='18px'>Categories</Text>
                <VStack h={'fit-content'} mt={3} justify={"flex-start"} align={"flex-start"} spacing={'1px'} >
                  {categories.map((c) => (
                    <Checkbox
                      key={c._id}
                      spacing={2}
                      flex={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      mt={-5}
                      onChange={(e) => handleCategoryFilter(e.target.checked, c._id)}
                      colorScheme="red"
                      isChecked={checked.includes(c._id)}
                    >
                      <Text mt={"12px"} fontWeight='400'>{c.name}</Text>
                    </Checkbox>
                  ))}
                </VStack>

                <Text fontWeight='600' fontSize='3xl'>Price</Text>
                <RadioGroup mt={-4} onChange={handlePriceChange} value={priceRange.join(',')}>
                  <Stack spacing={4}>
                    <Radio value="0,20">Up to $20</Radio>
                    <Radio value="21,50">$21 - $50</Radio>
                    <Radio value="51,100">$51 - $100</Radio>
                    <Radio value="101,200">$101 - $200</Radio>
                    <Radio value="201,Infinity">Above $200</Radio>
                  </Stack>
                </RadioGroup>

                <Button mt={6} colorScheme="red" onClick={fetchProducts}>
                  Apply Filters
                </Button>
                <Button mt={2} colorScheme="gray" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </Flex>
            </Flex>
          </GridItem>

          <GridItem p={{base:12, }} colSpan={{ base: '10', md: '5', lg: '7' }}>
            <Box>
              <Text mb={4} fontWeight='700' fontSize='3xl'>Top Trending</Text>
            </Box>
            <Flex gap={10} flexWrap='wrap'>
              {loading ? (
                <Text>Loading...</Text>
              ) : (
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              )}
            </Flex>
            {page < Math.ceil(total / 10) && (
              <Button onClick={() => setPage(page + 1)} mt={5} colorScheme="red">
                Load More
              </Button>
            )}
          </GridItem>
        </Grid>
      </Box>
      <Footer />
    </>
  );
}

export default Shop;
