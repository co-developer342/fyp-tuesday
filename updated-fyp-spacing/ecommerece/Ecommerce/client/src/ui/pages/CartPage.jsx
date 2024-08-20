import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Heading, Image, Text, VStack, Stack, Divider, useToast } from "@chakra-ui/react";
import { useCart } from "../../context/cart.js";
import { useAuth } from "../../context/auth.js";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import Nav from '../components/navBar';

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        let itemPrice = item.price || 0;
        // Add the price of selected attributes
        for (const key in item.selectedAttributes) {
          itemPrice += item.selectedAttributes[key].price || 0;
        }
        total += itemPrice;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.error(error);
      return "Error calculating total";
    }
  };

  const totalItemCount = () => {
    try {
      let count = 0;
      cart?.forEach((item) => {
        count += 1; // Count each item in the cart
      });
      return count;
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast({
        title: "Item removed",
        status: "info",
        duration: 3000,
        isClosable: true,
      });

      // Trigger a re-render by updating state
      setCart((prevCart) => [...myCart]);
    } catch (error) {
      console.error(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
    getToken(); // Fetch client token on component mount
  }, []);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast({
        title: "Payment completed successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast({
        title: "Payment failed!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Nav />
      <Box p={5}>
        <Heading textAlign="center" mb={5}>
          {cart?.length ? `You have ${totalItemCount()} item(s) in your cart` : "Your Cart is Empty"}
        </Heading>
        <Stack direction={{ base: "column", md: "row" }} spacing={8}>
          <VStack w="full" spacing={5}>
            {cart?.map((p) => {
              const basePrice = p.price || 0;
              const attributesPrice = Object.values(p.selectedAttributes || {}).reduce((acc, attr) => acc + (attr.price || 0), 0);
              const totalPriceForItem = basePrice + attributesPrice;
              return (
                <Flex
                  key={p._id}
                  w="full"
                  p={5}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Image
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    boxSize="150px"
                    objectFit="cover"
                  />
                  <VStack align="start" spacing={2} w="full" className="ml-5">
                    <Text fontSize="xl" fontWeight="bold">
                      {p.name}
                    </Text>
                    <Text>{p.description ? p.description.substring(0, 60) : "No description available"}...</Text>
                    <Text fontSize="lg" color="teal.600">
                      Price: {totalPriceForItem.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </Text>

                    {/* Display selected attributes only if they exist */}
                    {p.selectedAttributes && Object.keys(p.selectedAttributes).length > 0 && (
                      <Text>
                        Selected Attributes:{" "}
                        {Object.entries(p.selectedAttributes).map(([key, value]) => (
                          <span key={key}>{`${key}: ${value.value} (${value.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })})`}</span>
                        ))}
                      </Text>
                    )}
                  </VStack>
                  <Button colorScheme="red" onClick={() => removeCartItem(p._id)}>
                    Remove
                  </Button>
                </Flex>
              );
            })}
          </VStack>
          <VStack w="full" p={5} borderWidth="1px" borderRadius="lg" spacing={5}>
            <Heading size="lg">Cart Summary</Heading>
            <Divider />
            <Text fontSize="2xl">Total: {totalPrice()}</Text>
            {auth?.user?.address ? (
              <VStack w="full" spacing={3}>
                <Text fontSize="lg">Current Address:</Text>
                <Text>{auth?.user?.address}</Text>
                <Button colorScheme="teal" variant="outline" onClick={() => navigate("/dashboard/user/profile")}>
                  Update Address
                </Button>
              </VStack>
            ) : (
              <VStack w="full" spacing={3}>
                <Text fontSize="lg">
                  {auth?.token ? "Please add an address before checkout." : "Please login to proceed to checkout."}
                </Text>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={() =>
                    navigate(auth?.token ? "/dashboard/user/profile" : "/login")
                  }
                >
                  {auth?.token ? "Add Address" : "Login"}
                </Button>
              </VStack>
            )}
            {clientToken && auth?.token && cart?.length > 0 && (
              <VStack w="full" spacing={5}>
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: { flow: "vault" },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <Button
                  colorScheme="teal"
                  w="full"
                  onClick={handlePayment}
                  isLoading={loading}
                  isDisabled={!instance || !auth?.user?.address}
                >
                  {loading ? "Processing..." : "Make Payment"}
                </Button>
              </VStack>
            )}
          </VStack>
        </Stack>
      </Box>
    </>
  );
};

export default CartPage;
