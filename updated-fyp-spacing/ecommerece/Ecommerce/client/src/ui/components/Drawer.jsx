import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
} from '@chakra-ui/react';
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Checkbox } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

import React from 'react';

function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button ref={btnRef} variant={'simpple'} onClick={onOpen}>
        <i className="fa-regular fa-sliders text-xl mt-1 cursor-pointer"></i>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text fontWeight={'600'} fontSize={'3xl'}>
              Filters
            </Text>
          </DrawerHeader>
          <DrawerBody gap={5} display={'flex'} flexDirection="column">
            <Stack>
              <Checkbox colorScheme="red">
                <Text fontWeight={'400'}>All</Text>
              </Checkbox>
              <Checkbox colorScheme="red">
                <Text fontWeight={'400'}>Men</Text>
              </Checkbox>
              <Checkbox colorScheme="red">
                <Text fontWeight={'400'}>Women</Text>
              </Checkbox>
              <Checkbox colorScheme="red">
                <Text fontWeight={'400'}>Kids</Text>
              </Checkbox>
            </Stack>
            <Stack>
              <Text fontWeight={'600'} fontSize={'3xl'}>
                Price
              </Text>
              <RangeSlider
                aria-label={['min', 'max']}
                colorScheme="red"
                defaultValue={[20, 70]}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <Flex justifyContent={'space-between'}>
                <Text fontSize={'20px'} fontWeight={'500'}>
                  $20
                </Text>
                <Text fontSize={'20px'} fontWeight={'500'}>
                  $70
                </Text>
              </Flex>
            </Stack>
          </DrawerBody>

          <DrawerFooter justifyContent={"center"} alignItems={"center"}>
            <Button variant="ghost"  colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red">Apply Filters</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerExample;
