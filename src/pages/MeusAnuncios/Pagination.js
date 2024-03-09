import { Box, Button, HStack, Wrap } from '@chakra-ui/react';
import { FaCaretSquareLeft, FaCaretSquareRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const generatePageButtons = () => {
    const buttons = [];

    for (let page = 1; page <= totalPages; page++) {
      buttons.push(
        <Button
          key={page}
          colorScheme={currentPage === page ? 'teal' : 'gray'}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <Box>
      {totalPages > 1 && (
        <Wrap spacing={2}>
          <Button colorScheme="teal" onClick={() => onPageChange(currentPage - 1)} isDisabled={currentPage == 1}>
            <FaCaretSquareLeft/>
          </Button>
          {generatePageButtons()}
          <Button colorScheme="teal" onClick={() => onPageChange(currentPage + 1)} isDisabled={currentPage == totalPages}>
            <FaCaretSquareRight/>
          </Button>
        </Wrap>
      )}

    </Box>
  );
};

export default Pagination;
