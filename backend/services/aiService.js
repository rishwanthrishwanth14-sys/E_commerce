
const generateReviewSummary = async (reviews) => { //aiModel.js-lendhu reviews-ai receive pannum.
    const prompt = // AI enna seiyanum nu instructions kudukkum: sentiment, summary, pros and cons.
`
You are an e-commerce product review analyst.

Analyze the customer reviews below.

Return:
1. Overall sentiment: Positive, Neutral, or Negative
2. A short summary
3. Three main pros
4. Three main cons

Use only information supported by the reviews.
If there is not enough information for a point, say "Not enough information".

Customer reviews:
${JSON.stringify(reviews)}
`;

    const response = await fetch(
        "http://localhost:11434/api/chat",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "qwen2.5:3b",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                stream: false
            })
        }
    );

    if (!response.ok) {
        throw new Error(
            `Ollama request failed: ${response.status}`
        );
    }

    const data = await response.json();

    return data.message.content;
};

module.exports = {
    generateReviewSummary
};
