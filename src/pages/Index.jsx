import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const Index = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const { refetch, isLoading } = useQuery({
    queryKey: ['echo'],
    queryFn: async () => {
      const res = await fetch('/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: message }],
        }),
      });
      const data = await res.json();
      setResponse(data.choices[0].message.content);
      return data;
    },
    enabled: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Echo API Test</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
        {response && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Response:</h2>
            <p className="mt-2 p-2 bg-gray-100 rounded">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
