export default function handler(req, res) {
  if (req.method === 'POST') {
    const { messages } = req.body;
    const lastMessage = messages[messages.length - 1];

    const response = {
      id: 'chatcmpl-' + Math.random().toString(36).substr(2, 9),
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model: 'gpt-3.5-turbo-0301',
      usage: {
        prompt_tokens: lastMessage.content.length,
        completion_tokens: lastMessage.content.length,
        total_tokens: lastMessage.content.length * 2
      },
      choices: [
        {
          message: {
            role: 'assistant',
            content: `Echo: ${lastMessage.content}`
          },
          finish_reason: 'stop',
          index: 0
        }
      ]
    };

    res.status(200).json(response);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
