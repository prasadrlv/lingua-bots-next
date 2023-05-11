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

export const getMarketingMessage = (message, type, locale) =>
    getOpenAiChatCompletion(
        `'''${message}''', Get the inspirational short description for the text in triple quotes for a ${type} traveler in ${locale} locale`
    )

export const getNearByPointOfInterests = (city, type) =>
    getOpenAiChatCompletion(
        `Get the point of interests in the city ${city} for ${type} traveler`
    )

export const translateText = (text, locale) =>
    getOpenAiChatCompletion(
        `'''${text}''', translate the text in triple quotes in ${locale} locale`
    )
