import { useRouter } from 'next/router'
import { Box } from '@mui/material'
import { Typography } from '@mui/material'
import { getHotel } from '../api/hotel'
import { nearByPointOfInterests } from '../api/openai'

export const getServerSideProps = async (context) => {
    const { propertyId, locale } = context.query
    const hotel = getHotel(propertyId)
    const pois = await nearByPointOfInterests(
        [hotel.address1, hotel.city, hotel.state, hotel.country].join(',')
    )

    return {
        props: { hotel, pois }, // will be passed to the page component as props
    }
}

const HotelView = (props) => {
    const { hotel, pois } = props

    return (
        <Box>
            <Typography variant="h2" component="h2">
                {hotel.legalName}
            </Typography>
            <Typography variant="h5" component="h5">
                {hotel.address1} , {hotel.city} {hotel.state} {hotel.country}
            </Typography>
            {pois}
        </Box>
    )
}

export default HotelView
