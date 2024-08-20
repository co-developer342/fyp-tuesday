import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Flex, HStack, Img, Text, Icon, Select,Box ,GridItem,Grid} from '@chakra-ui/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import NavBar from '../components/navBar';
import Footer from '../components/Footer';
import { useCart } from '../../context/cart';
import ProductCard from '../components/card';

function ProductPage() {
  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [product, setProduct] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [cart, setCart] = useCart();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  
  const [relatedProducts, setRelatedProducts] = useState([]);

  const getSimilarProduct = async (pid, cid) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
      setLoading(false);
      console.log(relatedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAttributeChange = (key, value, price) => {
    setSelectedAttributes({
      ...selectedAttributes,
      [key]: { value, price }
    });
  };

 
  const formatTitle = (title) => {
    const maxLength = 20;
    const nonBreakingSpace = '\u00A0'; // Unicode for non-breaking space
    if (title.length < maxLength) {
      return title.padEnd(maxLength, nonBreakingSpace); // Pad with non-breaking spaces if title is less than 20 characters
    }
    return title;
  };

  const calculatePrice = () => {
    if (!product) return 0;
    let totalPrice = product.price;
    Object.values(selectedAttributes).forEach(attr => {
      totalPrice += attr.price;
    });
    return totalPrice;
  };

  const onAddToCart = () => {
    if (product) {
      setCart([...cart, { ...product, selectedAttributes }]);
      localStorage.setItem('cart', JSON.stringify([...cart, { ...product, selectedAttributes }]));
      toast({
        title: 'Product Added to Cart',
        description: "You've successfully added the product to your cart",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  useEffect(() => {
    if (params?.slug) {
      getProduct();
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
  }, [params?.slug]);

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <NavBar />
      <Flex justify={'center'} h={'100%'} alignItems={'flex-center'} flexDir={'column'} my={{ base: '6rem', md: '1rem' }}>
        <Flex
          mx={{ base: '30px', md: '60px' }}
          justify={'center'}
          rounded={20}
          mb={3}
          p={10}
          gap={20}
          boxShadow={'10px 10px 20px rgba(0, 0, 0, 0.1)'}
          flexWrap={'wrap'}
        >
         <Img
            src={`/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            objectFit='contain'
            maxW={{ base: '100%', md: '400px' }}
            maxH={{ base: '300px', md: '400px' }}
          />
          <Flex flexDir={'column'} justify={'center'} gap={2}>
            <Link to="/">
              <HStack>
                <Icon as={ArrowBackIcon} />
                <Text _hover={{ color: 'green' }}>Home</Text>
              </HStack>
            </Link>
            <Text fontWeight={'700'} fontSize={'40px'} textTransform={'uppercase'}>
              {formatTitle(product.name)}
            </Text>
            <Text fontWeight={'500'} fontSize={'25px'} color={'green'}>
              {calculatePrice().toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </Text>
            <Text textAlign={'left'} textTransform={'uppercase'}>
              <strong>Category: </strong> {product.category.name}
            </Text>
            {product.attributes.map((attr, index) => (
              <HStack key={index}>
                <Text fontWeight={'bold'}>{attr.key}:</Text>
                <Select
                  w={'9rem'}
                  placeholder={`Select ${attr.key}`}
                  onChange={(e) => {
                    const selectedOption = attr.values.find(value => value.value === e.target.value);
                    if (selectedOption) {
                      handleAttributeChange(attr.key, selectedOption.value, selectedOption.price);
                    }
                  }}
                >
                  {attr.values.map((option, idx) => (
                    <option key={idx} value={option.value}>{option.value}</option>
                  ))}
                </Select>
              </HStack>
            ))}
            <HStack mt={4}>
              <Button mt={5} colorScheme="red" onClick={onAddToCart}>
                Add to Cart
              </Button>
              <Button variant="ghost" mt={5} colorScheme="red">
                Buy Now
              </Button>
            </HStack>
          </Flex>
        </Flex>
        <Flex
          mx={{ base: '30px', md: '60px' }}
          justify={'start'}
          rounded={20}
          p={10}
          mb={3}
          boxShadow={'10px 10px 20px rgba(0, 0, 0, 0.1)'}
          flexWrap={'wrap'}
        >
          <Text fontWeight={'700'} fontSize={'25px'} mb={2}>
            Description:
          </Text>
          <Text fontWeight={'400'} fontSize={'15px'}>
           {product.description}
          </Text>
        </Flex>
        {/* <Flex gap={10} flexWrap='wrap' flexDir={'column'}>
          <h4 mb={5}>Similar Products</h4>
          <Flex>
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </Flex>
        </Flex> */}
       
        <Grid>

        <GridItem p={{base:12, }} colSpan={{ base: '10', md: '5', lg: '7' }}>
            <Box>
              <Text mb={4} fontWeight='700' fontSize='3xl'>Similar Producrs</Text>
            </Box>
            <Flex gap={10} flexWrap='wrap' >
              {loading ? (
                <Text>Loading...</Text>
              ) : (
                relatedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              )}
            </Flex>
            
          </GridItem>
        </Grid>
      </Flex>
      <Footer />
    </>
  );
}

export default ProductPage;
