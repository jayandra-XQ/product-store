import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue } from "@chakra-ui/react"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import PropTypes from 'prop-types'
import { useProductStore } from "../store/product";
import { toast } from'react-toastify';

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800")

  const {deleteProduct}  = useProductStore()

  const handleDeleteProduct = async (pid) => {
    const {success}  = await deleteProduct(pid)
    if(success) {
      toast.success("product deleted successfully")
    } else {
      toast.error(`failed to delete product ${product.name}`)
    }
  }
  
  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    
    >
      <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
            ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<FaEdit /> } colorScheme='blue' />
          <IconButton icon={<MdDelete />} onClick={() => handleDeleteProduct(product._id)} colorScheme="red"/>
        </HStack>
      </Box>

    </Box>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
}

export default ProductCard