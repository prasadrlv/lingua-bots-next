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

    const promises = [
        getNearByPointOfInterests(hotel.cityAddress, userType, locale),
        getMarketingMessage(hotel.longDesc, userType, locale),
    ]

    if (locale && locale !== 'en-US') {
        promises.push(translateText(hotel.longDesc, locale))
    }
    console.time('AllChatGptCalls')
    const response = await Promise.all(promises)
    console.timeEnd('AllChatGptCalls')
    hotel.chatGpt.pois = (response[0] || '')
        .split(/\d+\. /)
        .filter((item) =>
            Boolean(
                item &&
                    item.trim() &&
                    !item.startsWith('As an AI language model')
            )
        )
    hotel.chatGpt.marketingMessage = response[1]

    if (locale && locale !== 'en-US') {
        hotel.longDesc = response[2]
    }

    return {
        props: { hotel },
    }
}

const HotelView = (props) => {
    const { hotel } = props

    return (
        <Stack>
            <div>
                <Typography
                    sx={{ mt: 3, ml: 1, textAlign: 'center' }}
                    variant="h4"
                >
                    {hotel.legalName}
                </Typography>
            </div>
            <div>
                <Typography sx={{ ml: 1, fontSize: 13, textAlign: 'center' }}>
                    {hotel.address}
                </Typography>
            </div>

            <div>
                <Card sx={{ mt: 5 }}>
                    <CardHeader
                        sx={{ ml: 1, fontSize: 18, color: 'blue' }}
                        title="Customized Narrative"
                    />
                    <CardContent>
                        <Typography>
                            {hotel.chatGpt.marketingMessage}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card sx={{ mt: 5 }}>
                    <CardHeader
                        sx={{ ml: 1, fontSize: 18, color: 'blue' }}
                        title="Briefing about hotel"
                    />
                    <CardContent>
                        <Typography>{hotel.longDesc}</Typography>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card sx={{ mt: 5 }}>
                    <CardHeader
                        sx={{ ml: 1, fontSize: 18, color: 'blue' }}
                        title="Explore your interests! with a greater joy"
                    />
                    <CardContent>
                        <ul>
                            {(hotel.chatGpt.pois || []).map((item, key) => (
                                <li key={key}>
                                    {' '}
                                    <Typography>{item}</Typography>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </Stack>
    )
}

export default HotelView
