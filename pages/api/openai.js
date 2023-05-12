const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
    apiKey: process.env.openAIApiKey,
})
const openai = new OpenAIApi(configuration)

const getOpenAiChatCompletion = async (userContent) => {
    try {
        const messages = [{ role: 'user', content: userContent }]

        const response = await openai.createChatCompletion({
            messages,
            model: 'gpt-3.5-turbo',
        })

        return response.data.choices[0].message.content
    } catch (error) {
        console.error(`Unable to get chatgpt choice for ${userContent}`, error)
    }
    return null
}

export const getMarketingMessage = async (message, type, locale) => {
    console.time('marketing message chatgpt call')
    const response = await getOpenAiChatCompletion(
        `'''${message}''', Get the inspirational short description for the text in triple quotes for a ${type} traveler in ${locale} locale`
    )
    console.timeEnd('marketing message chatgpt call')
    return response
}

export const getNearByPointOfInterests = async (city, type, locale) => {
    console.time('poi chatgpt call')
    const response = await getOpenAiChatCompletion(
        `Get the point of interests in the city ${city} for ${type} traveler in ${locale} locale`
    )
    console.timeEnd('poi chatgpt call')
    return response
}

export const translateText = async (text, locale) => {
    console.time('long desc chatgpt call')
    const response = await getOpenAiChatCompletion(
        `'''${text}''', translate the text in triple quotes in ${locale} locale`
    )
    console.timeEnd('long desc chatgpt call')
    return response
}
