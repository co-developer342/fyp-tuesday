import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import ProductCard from './card.jsx'; // Import the ProductCard component
import { useSearch } from '../../context/Search.js'; // Import your search context
import NavBar from './navBar.jsx';

function SearchResults() {
  const [searchData] = useSearch(); // Use search context

  return (
    <Box>
    <NavBar/>
    <Flex
      direction="column"
      align="center"
      justify="center"
      p={4}
      spacing={4}
    >
      <Heading mb={4}>Search Results</Heading>
      {searchData?.results.length < 1 ? (
        <Text>No Products Found</Text>
      ) : (
        <Flex
          wrap="wrap"
          gap={4}
          justify="center"
        >
          {searchData.results.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Flex>
      )}
    </Flex>
</Box>
  );
}


export default SearchResults;
