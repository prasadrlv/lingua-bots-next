import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import CardHeader from '@mui/material/CardHeader'


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
    hotel.chatGpt.pois = await getNearByPointOfInterests(hotel.cityAddress,userType)
    hotel.chatGpt.marketingMessage = await getMarketingMessage(
        hotel.longDesc,
        userType || 'business',
        locale
    )

    if (locale && locale !== 'en-US') {
        hotel.longDesc = await translateText(hotel.longDesc, locale)
    }

    return {
        props: { hotel, locale },
    }
}

const HotelView = (props) => {
    const { hotel } = props

    return (
        <Stack justifyContent="center" alignItems="center">
            <div>
                <Typography variant="h2" component="h2">
                    {hotel.legalName}
                </Typography>
            </div>
            <div>
                <Typography sx={{ fontSize: 13 }} >{hotel.address}</Typography>
            </div>

            <div>
            <Card sx={{ mt: 5 }}>
                    <CardHeader title="Marketing short description" />
                    <CardContent>
                    <Typography variant="h6">
                        {hotel.chatGpt.marketingMessage}
                    </Typography>
                    </CardContent>
                </Card>
                
          
            </div>
            <div>
                <Card sx={{ mt: 5 }}>
                    <CardHeader title="Overview" />
                    <CardContent>
                        <Typography>{hotel.longDesc}</Typography>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card sx={{ mt: 5 }}>
                    <CardHeader title="Point of Interests" />
                    <CardContent>
                        <Typography>{hotel.chatGpt.pois}</Typography>
                    </CardContent>
                </Card>
            </div>
        </Stack>
    )
}

export default HotelView
