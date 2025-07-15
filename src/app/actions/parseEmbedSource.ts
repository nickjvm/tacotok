"use server";

import OpenAI from "openai";

const openai = new OpenAI();

type Response = {
  ingredients: string[] | null;
  instructions: string[] | null;
  introduction: string | null;
  title: string | null;
  oembed: OEmbed;
};

export async function parseEmbedSource(embedData: OEmbed): Promise<Response> {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4.1-nano-2025-04-14",
    messages: [
      {
        role: "system",
        content:
          "You are a recipe parser. You will be given an oEmbed API response, and you will: 1. extract the ingredients and instructions from the response, 2. generate an introduction, and 3. generate a title for the recipe.",
      },
      {
        role: "user",
        content: `Here is an oEmbed API response. Please extract the ingredients and instructions from it, 
            and generate an introduction summary. Ingredients (array of strings) and instructions (array of strings) 
            content stay exactly as they are in the oEmbed response. Do not add any additional information to them. 
            The introduction can be creative and slightly sarcastic, using any and all available 
            information from the oEmbed response. Aim for 3-4 sentences for the introduction. 
            Remove any prepended bullets from each instruction and ingredient.
            
            Here is the oEmbed response: ${JSON.stringify(embedData)}`,
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "extract_recipe",
          description:
            "Extract recipe ingredients, instructions, and introduction from a given oEmbed API response.",
          parameters: {
            type: "object",
            properties: {
              ingredients: { type: "array", items: { type: "string" } },
              instructions: { type: "array", items: { type: "string" } },
              introduction: { type: "string" },
              title: { type: "string" },
            },
            required: ["ingredients", "instructions", "introduction", "title"],
            additionalProperties: false,
          },
        },
      },
    ],
  });

  const response = chatCompletion.choices[0].message;

  response.tool_calls?.forEach((toolCall) => {
    if (toolCall.type === "function") {
      console.log("✅ Extracted Details:", toolCall.function.arguments);
    }
  });

  if (response && response.tool_calls?.length) {
    return response.tool_calls?.reduce(
      (acc: Response, toolCall) => {
        if (toolCall.type === "function") {
          const args = JSON.parse(toolCall.function.arguments);
          return {
            ...acc,
            title: acc.title || args.title,
            ingredients: (acc.ingredients || []).concat(args.ingredients),
            instructions: (acc.instructions || []).concat(args.instructions),
            introduction: acc.introduction || args.introduction,
          };
        }
        return acc;
      },
      {
        ingredients: [],
        instructions: [],
        title: "",
        introduction: "",
        oembed: embedData,
      }
    );
  }

  return {
    ingredients: [],
    instructions: [],
    introduction: "",
    oembed: embedData,
    title: "",
  };
}
