const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
    apiKey: process.env.openAIApiKey,
})
const openai = new OpenAIApi(configuration)

export const nearByPointOfInterests = async (address) => {
    try {
        const messages = [
            {
                role: 'user',
                content: `Get point of interest near "${address}"`,
            },
        ]

        const response = await openai.createChatCompletion({
            messages,
            model: 'gpt-3.5-turbo',
        })

        return response.data.choices[0].message.content
    } catch (error) {
        console.log(error.message)
    }
    return null
}
