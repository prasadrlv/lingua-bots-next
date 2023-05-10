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

export const nearByPointOfInterests = (address) =>
    getOpenAiChatCompletion(
        `Get point of interest near "${address}" , each suggestion in a new line`
    )
