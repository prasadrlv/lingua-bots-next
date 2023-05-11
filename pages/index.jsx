import React from 'react'
import {
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Button,
    Box,
} from '@mui/material'

const Home = () => {
    const propertyId = 'ABC123NY'
    const locale = 'en-US'
    const userType = 'business'

    return (
        <Box sx={{ width: 300, paddingLeft: 5, paddingTop: 5 }}>
            <form action="./search/hotelView">
                <FormControl sx={{ mt: 3 }}>
                    <InputLabel id="propertyId-label">Property Id</InputLabel>
                    <Select
                        name="propertyId"
                        id="propertyId"
                        value={propertyId}
                        label="Property Id"
                    >
                        <MenuItem value="ABC123NY">
                            New York Marquis Hotel
                        </MenuItem>
                        <MenuItem value="ABC124TX">
                            House Inn Dallas Addison/Quorum Drive
                        </MenuItem>
                        <MenuItem value="ABC125MD">
                            Hotel Bethesda Chevy Chase
                        </MenuItem>
                        <MenuItem value="ABC126FL">
                            Hotel Orlando International Drive
                        </MenuItem>
                        <MenuItem value="ABC127NV">
                            Hotel Suites Las Vegas Airport South
                        </MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ mt: 3, width: 300 }}>
                    <InputLabel>Locale </InputLabel>
                    <Select
                        name="locale"
                        id="locale"
                        value={locale}
                        label="Locale"
                    >
                        <MenuItem value="en-US">English</MenuItem>
                        <MenuItem value="de-DE">German</MenuItem>
                        <MenuItem value="fr-FR">French</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ mt: 3, width: 300 }}>
                    <InputLabel>User Type</InputLabel>
                    <Select
                        name="userType"
                        id="userType"
                        value={userType}
                        label="User Type"
                    >
                        <MenuItem value="business">Business</MenuItem>
                        <MenuItem value="family">Family</MenuItem>
                        <MenuItem value="explorer">Explorer</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    sx={{ mt: 3 }}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Get Property Details
                </Button>
            </form>
        </Box>
    )
}

export default Home
