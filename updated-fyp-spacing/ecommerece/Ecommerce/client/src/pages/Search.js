import { Flex, HStack, Img, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useSearch } from '../../context/Search';
import { useCart } from '../../context/cart';
import { useToast } from '@chakra-ui/react';
import NavBar from '../components/navBar';
import Footer from '../components/Footer';
import ProductImg from '../assets/images/0a48d49733d61d3fa6a2ad469bc69ff3-removebg-preview-transformed.png';

function SearchResults() {
  const [values] = useSearch(); // Get search results from context
  const [cart, setCart] = useCart();
  const toast = useToast();

  const onAddToCart = (product) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast({
        title: 'Product Added to Cart',
        description: "You've successfully added the product to your cart",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      return updatedCart;
    });
  };

  return (
    <>
      <NavBar />
      <Flex
        flexDir="column"
        align="center"
        p={4}
        minHeight="100vh"
      >
        <Text fontSize="2xl" mb={4}>Search Results</Text>
        <Text mb={4}>
          {values?.results.length < 1 
            ? 'No Products Found' 
            : `Found ${values?.results.length} ${values?.results.length === 1 ? 'Product' : 'Products'}`}
        </Text>
        <Flex
          wrap="wrap"
          gap={4}
          justify="center"
        >
          {values.results?.map((product) => (
            <Flex
              key={product._id}
              direction="column"
              align="center"
              borderWidth="1px"
              borderRadius="md"
              p={4}
              boxShadow="md"
              maxWidth="250px"
            >
              <Img
                src={`/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
                mb={2}
                boxSize="150px"
                objectFit="cover"
              />
              <Text fontWeight="bold" mb={2} textAlign="center">
                {product.name}
              </Text>
              <Text mb={2} textAlign="center">
                {product.description.substring(0, 30)}...
              </Text>
              <Text mb={2} fontWeight="bold" color="green.500">
                {product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </Text>
              <HStack spacing={2}>
                <Link to={`/product/${product._id}`}>
                  <Button colorScheme="blue">Show Details</Button>
                </Link>
                <Button 
                  colorScheme="teal"
                  onClick={() => onAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </HStack>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}

export default SearchResults;
