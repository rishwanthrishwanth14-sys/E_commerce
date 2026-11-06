
const generateReviewSummary = async (reviews) => {
    const prompt = `
You are an e-commerce product review analyst.

Analyze the customer reviews and return a JSON object.

Use exactly this structure:

{
    "sentiment": "Positive",
    "reviewSummary": "Write 2-3 short sentences summarizing customer opinions.",
    "pros": [
        "Positive point 1",
        "Positive point 2"
    ],
    "cons": [
        "Genuine issue mentioned by customers"
    ]
}

Rules:
- sentiment must be Positive, Neutral, or Negative.
- Include up to 3 pros.
- Include up to 3 cons.
- If no issues are mentioned, use:
  "No specific issues were mentioned in the reviews."
- Never invent features, opinions, or complaints.
- Use simple English.
- Return valid JSON only. Do not include Markdown.

Customer Reviews:
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
                stream: false,
                format: "json",
                options: {
                    temperature: 0.3  // predicted accuracy of an ai model 
                }
            })
        }
    );

    if (!response.ok) {
        throw new Error(
            `Ollama request failed: ${response.status}`
        );
    }

    const data = await response.json();

    const summary = JSON.parse(data.message.content);

    return summary;
};

module.exports = {
    generateReviewSummary
};
