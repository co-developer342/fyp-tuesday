import React, { useState } from 'react';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import BGImg from '../../assets/images/Screenshot 2024-08-05 122640.png';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../../components/navBar';
import Footer from '../../components/Footer';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useAuth } from '../../../context/auth.js';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/login', { email, password });
      if (res && res.data.success) {
        toast({
          title: 'Login Successful',
          description: res.data.message,
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || '/');
      } else {
        toast({
          title: 'Invalid Credentials',
          description: 'Please check your email or password and try again.',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <>
      <NavBar />
      <Box
        h={'100vh'}
        zIndex={-10}
        bgImg={BGImg}
        bgPosition={'center'}
        bgRepeat={'repeat'}
        bgSize={'cover'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Flex
          rounded={20}
          p={8}
          color={'white'}
          backdropFilter={'blur(20px) brightness(200%)'}
          bg={'whiteAlpha.200'}
          justify={'center'}
          w={{ base: '90%', md: '30%' }}
        >
          <Flex
            w={'100%'}
            justify={'center'}
            align={'center'}
            flexDir={'column'}
            as="form"
            onSubmit={handleSubmit}
          >
            <Box my={5} textAlign={'center'}>
              <Text as={'h1'} fontSize={'5xl'} fontWeight={'500'}>
                Login
              </Text>
            </Box>
            <FormControl my={5} w={'100%'}>
              <Box mb={8}>
                <FormLabel fontSize={'15px'} color={'white'}>
                  Enter Your Email
                </FormLabel>
                <Input
                  placeholder="Your Email*"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Box>
              <Box mb={8}>
                <FormLabel fontSize={'15px'} color={'white'}>
                  Enter Your Password
                </FormLabel>
                <Input
                  placeholder="Your Password*"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Box>
              <Button type="submit" w={'100%'}>
                Login
              </Button>
              <Text mt={5}>
                Don't have an Account?
                <Link className="text-red-500" to="/Signup">
                  {' '}
                  Sign Up
                </Link>
              </Text>
            </FormControl>
          </Flex>
        </Flex>
      </Box>
      <Footer />
    </>
  );
}

export default Login;
