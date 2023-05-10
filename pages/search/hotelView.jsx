import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { getHotel } from '../api/hotel'
import { nearByPointOfInterests } from '../api/openai'

export const getServerSideProps = async (context) => {
    const { propertyId, locale } = context.query

    const hotel = getHotel(propertyId)
    if(!hotel){
        return null
    }
    const pois = await nearByPointOfInterests(hotel.address)

    return {
        props: { hotel, pois }, // will be passed to the page component as props
    }
}

const HotelView = (props) => {
    const { hotel, pois } = props

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)' }}
        >
            <Typography variant="h2" component="h2">
                {hotel.legalName}
            </Typography>
            <Typography variant="h5" component="h5">
                {hotel.address1} , {hotel.city} {hotel.state} {hotel.country}
            </Typography>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Overview</Typography>
                </AccordionSummary>
                <AccordionDetails>

                <Card sx={{ width: 275 }}>
                    <CardContent>
                        <Typography>{pois}</Typography>
                    </CardContent>
                </Card>
                <Card sx={{ width: 275 }}>
                    <CardContent>
                        <Typography>{pois}</Typography>
                    </CardContent>
                </Card>
                   
                    
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default HotelView
