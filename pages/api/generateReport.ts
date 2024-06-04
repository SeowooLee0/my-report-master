import { OpenAI } from "openai";

export default async function handler(
  req: {
    body: {
      age: number;
      topic: string;
      length: string;
      emphasis: string;
      language: string;
      openaiApiKey: string;
    };
  },
  res: any
) {
  const { age, topic, length, emphasis, language, openaiApiKey } = req.body;

  const openai = new OpenAI({
    apiKey: openaiApiKey,
  });

  try {
    const prompt = `
      I need to create a report for an audience of age ${age}. The topic is '${topic}'. The report should be A4, ${length} pages long, according to the user's request: ${emphasis}. It should be written in ${language}. Can you help me draft it? The report should include:
      - An Introduction: Brief mention of the topic, including definitions and explanations. And describe what will be discussed in the main body.
      - A Main Body: Detailed explanations based on research and data, including statistics and factual evidence. Discuss the current situation, issues, implications, and expert opinions related to the topic.  Include statistics and factual evidence. When referencing external sources, provide a brief explanation along with the source. Discuss the current situation, issues, implications, and expert opinions related to the topic.
      - A Conclusion: Summarizing the main points and implications, suggesting attitudes or actions for the reader, and presenting various opinions on the topic.
      Please avoid vague language and abstract expressions. Please create a natural context for good readability. And if age audience is more than 15, since it's for a submission, please write in a weighty tone. Conclude with a creative idea.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that specializes in drafting detailed and well-structured reports based on the user's input.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 3000,
      top_p: 1,
    });

    const report = response;
    res.status(200).json({ report });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
