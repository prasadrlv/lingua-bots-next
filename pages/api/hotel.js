// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import path from 'path'
import { readFileSync } from 'fs-extra'

const HOTEL_DATA = JSON.parse(
    readFileSync(path.join(process.cwd(), 'data', 'hotel.json'), 'utf-8')
)

export const getHotel = (propertyId) => {
    const hotel = HOTEL_DATA.find((hotel) => hotel.propertyId === propertyId)

    if (hotel) {
        return {
            ...hotel,
            address: [
                hotel.address1,
                hotel.city,
                hotel.state,
                hotel.country,
            ].join(', '),
            cityAddress: [hotel.city, hotel.state, hotel.country].join(', '),
        }
    }
    return null
}

export default function handler(req, res) {
    const { query } = req
    const propertyId = query.propertyId
    const hotel = getHotel(propertyId)

    if (hotel) {
        res.status(200).json({ ...hotel })
    } else {
        res.status(404).json({ error: 'No Data found' })
    }
}
