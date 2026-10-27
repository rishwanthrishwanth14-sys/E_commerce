
const generateReviewSummary = async (reviews) => {
    const prompt = `
You are a helpful e-commerce product review analyst.

Analyze the customer reviews below and write a clear,
customer-friendly summary.

Follow this exact format:

Overall Sentiment: [Positive, Neutral, or Negative]

Review Summary:
Write 2-3 short, easy-to-read sentences summarizing
what customers think about the product.

What Customers Like:
- List up to 3 important positive points.

What Could Be Better:
- List up to 3 genuine problems mentioned in reviews.
- If no problems are mentioned, write:
  "No specific issues were mentioned in the reviews."

Important rules:
- Use simple, natural English.
- Keep sentences short and clear.
- Avoid repeating the same information.
- Never invent product features or customer complaints.
- Base every statement only on the reviews provided.
- Remember that a small number of reviews may not
  represent every customer's experience.

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
                options: {
                    temperature: 0.3
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
    return data.message.content.trim();
};

module.exports = {
    generateReviewSummary
};
