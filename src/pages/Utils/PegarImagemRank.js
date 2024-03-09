import { Image } from "@chakra-ui/react";
import ipApi from "../../Services/ipApi";

export const ImagemRank = (rank, size) => {


    return (<Image
      src={`${ipApi}/images/${rank}.png`}
      boxSize={size}
    />);


  };

