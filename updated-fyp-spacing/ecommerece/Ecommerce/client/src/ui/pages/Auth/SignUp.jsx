import React, { useState } from "react";
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import BGImg from '../../assets/images/Screenshot 2024-08-05 122640.png';
import NavBar from '../../components/navBar';
import Footer from '../../components/Footer';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';  // Import useToast

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [question, setQuestion] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const toast = useToast();  // Initialize useToast

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {  
      errors.phone = "Phone number is invalid";
    }
    if (!address.trim()) errors.address = "Address is required";
    if (!question.trim()) errors.question = "Security question answer is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        question
      });
      if (res && res.data.success) {
        toast({
          title: 'Registration Successful',
          description: res.data.message,
          status: 'success',
          duration: 7000,
          isClosable: true,
          position: 'top-right',
        });
        navigate("/login");
      } else {
        toast({
          title: 'Registration Failed',
          description: res.data.message,
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
      <NavBar/>
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
          bg={"whiteAlpha.200"}
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
                Sign Up
              </Text>
            </Box>
            <FormControl my={5} w={'100%'} isInvalid={errors.name}>
              <Box mb={8}>
                <FormLabel fontSize={'15px'} color={'white'}>
                  Enter Your Name
                </FormLabel>
                <Input
                  placeholder="Your Name*"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </Box>
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
                <FormErrorMessage>{errors.email}</FormErrorMessage>
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
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </Box>
              <Box mb={8}>
                <FormLabel fontSize={'15px'} color={'white'}>
                  Enter Your Phone
                </FormLabel>
                <Input
                  placeholder="Your Phone*"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <FormErrorMessage>{errors.phone}</FormErrorMessage>
              </Box>
              <Box mb={8}>
                <FormLabel fontSize={'15px'} color={'white'}>
                  Enter Your Address
                </FormLabel>
                <Input
                  placeholder="Your Address*"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <FormErrorMessage>{errors.address}</FormErrorMessage>
              </Box>
              <Box mb={8}>
                <FormLabel fontSize={'15px'} color={'white'}>
                  Best Friend's Name?
                </FormLabel>
                <Input
                  placeholder="Security Question Answer*"
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                />
                <FormErrorMessage>{errors.question}</FormErrorMessage>
              </Box>
              <Button type="submit" w={"100%"}>
                Register
              </Button>
              <Text mt={5}>
                Have An Account? <Link className='text-red-500' to={"/Login"}> Login</Link>
              </Text>
            </FormControl>
          </Flex>
        </Flex>
      </Box>
      <Footer/>
    </>
  );
}

export default SignUp;
