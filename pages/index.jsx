import React from 'react'
import {
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Button,
    Box,
    Backdrop,
    CircularProgress,
} from '@mui/material'

const Home = () => {
    const [propertyId, setPropertyId] = React.useState('ABC123NY')
    const [locale, setLocale] = React.useState('en-US')
    const [userType, setUserType] = React.useState('business')

    const [progress, setProgress] = React.useState(false)
    const stopSpinner = () => {
        setProgress(false)
    }
    const showSpinner = () => {
        setProgress(!progress)
    }

    const handlePropertyIdChange = (event) => setPropertyId(event.target.value)
    const handleLocaleChange = (event) => setLocale(event.target.value)
    const handleUserTypeChange = (event) => setUserType(event.target.value)

    return (
        <Box sx={{ paddingLeft: 5, paddingTop: 5 }}>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={progress}
                onClick={stopSpinner}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <form action="./search/hotelView">
                <FormControl sx={{ mt: 3, ml: 2 }}>
                    <InputLabel >Your Stay Name!</InputLabel>
                    <Select
                        name="propertyId"
                        id="propertyId"
                        value={propertyId}
                        onChange={handlePropertyIdChange}
                    >
                        <MenuItem value="ABC123NY">
                            New York City Hotel
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

                <FormControl sx={{ mt: 3, ml: 2 }}>
                    <InputLabel>Locale </InputLabel>
                    <Select
                        name="locale"
                        id="locale"
                        value={locale}
                        onChange={handleLocaleChange}
                    >
                        <MenuItem value="en-US">English</MenuItem>
                        <MenuItem value="de-DE">German</MenuItem>
                        <MenuItem value="fr-FR">French</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ mt: 3, ml: 2 }}>
                    <InputLabel>User Type</InputLabel>
                    <Select
                        name="userType"
                        id="userType"
                        value={userType}
                        onChange={handleUserTypeChange}
                    >
                        <MenuItem value="business">Business</MenuItem>
                        <MenuItem value="family">Family</MenuItem>
                        <MenuItem value="explorer">Explorer</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    sx={{ mt: 5, ml: 2 }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={showSpinner}
                >
                    Get Property Details
                </Button>
            </form>
        </Box>
    )
}

export default Home
