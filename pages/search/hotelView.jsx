import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import CardHeader from '@mui/material/CardHeader'
import Paper from '@mui/material/Paper'

import { getHotel } from '../api/hotel'
import {
    getNearByPointOfInterests,
    translateText,
    getMarketingMessage,
} from '../api/openai'

export const getServerSideProps = async (context) => {
    const { propertyId, locale, userType } = context.query

    const hotel = getHotel(propertyId)
    if (!hotel) {
        return {
            notFound: true,
        }
    }

    hotel.shortDesc = hotel.descriptions.find(
        (desc) => desc.type === 'DESCRIPTION'
    ).text
    hotel.longDesc = hotel.descriptions.find(
        (desc) => desc.type === 'LONG_DESCRIPTION'
    ).text

    hotel.chatGpt = {}
    hotel.chatGpt.pois = await getNearByPointOfInterests(hotel.address)
    hotel.chatGpt.marketingMessage = await getMarketingMessage(
        hotel.longDesc,
        userType || 'business'
    )

    if (locale && locale !== 'en-US') {
        hotel.longDesc = await translateText(hotel.longDesc, locale)
    }


    return {
        props: { hotel, locale },
    }
}

const HotelView = (props) => {
    const { hotel, locale } = props

    return (
        <Stack justifyContent="center" alignItems="center">
            <div>
                <Typography variant="h2" component="h2">
                    {hotel.legalName}
                </Typography>
            </div>
            <div>
                <Typography variant="h6">{hotel.address}</Typography>
            </div>
            <div>
                <Typography variant="h6">{hotel.shortDesc}</Typography>
            </div>

            <div>
                <Paper elevation={3} >
                    <Typography variant="h6">
                        {hotel.chatGpt.marketingMessage}
                    </Typography>
                </Paper>
            </div>

            <div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Overview</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box display="flex">
                            <Card sx={{ width: 275 }}>
                                <CardHeader title="Long Description" />
                                <CardContent>
                                    <Typography>{hotel.longDesc}</Typography>
                                </CardContent>
                            </Card>
                            <Card sx={{ width: 275 }}>
                                <CardHeader title="Point of Interests" />
                                <CardContent>
                                    <Typography>
                                        {hotel.chatGpt.pois}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Stack>
    )
}

export default HotelView
