import { useRouter } from 'next/router';
import {Box} from '@mui/material';
import {Typography} from '@mui/material';
import {getHotel} from '../api/hotel'

export const getServerSideProps= async(context)=> {

    const {propertyId,locale} = context.query;
    const hotel = getHotel(propertyId)
    const apiKey = process.env.openAIApiKey;

    return {
      props: {hotel}, // will be passed to the page component as props
    };
  }


const HotelView = (props) => {



const { hotel} = props


	return <Box> <Typography variant="h2" component="h2">
    {hotel.legalName} 
  </Typography> 
  <Typography variant="h5" component="h5">
    {hotel.address1} , {hotel.city}   {hotel.state}  {hotel.country} 
  </Typography>
   </Box>
}

export default HotelView



