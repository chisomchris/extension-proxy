# AI Page Summarizer Proxy Server

This is the NestJS proxy server for the AI Page Summarizer extension. It handles text processing and secure communication with the Gemini AI API to provide structured summaries.

### Prerequisites

- Node.js: v18.x or higher

- npm: v9.x or higher

- Gemini API Key: Required for AI generation. Obtain one from the [Google AI Studio](https://aistudio.google.com/).

### Local Setup

1. Clone the repository and navigate to the directory:

```bash
git clone https://github.com/chisomchris/extension-proxy.git

cd extension-proxy
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   Create a .env file in the root directory and add your API key:

Code snippet

```js
GEMINI_API_KEY = your_actual_api_key_here;
```

### Running the Server

- Development Mode (with hot-reload):

```bash
npm run start:dev
```

- Production Mode:

```bash
npm run build

npm run start:prod
```

The server will be available at http://localhost:4000.

### API Endpoint

`POST /api/summarize`

Request Body:

```json
{
  "textToSummarize": "Large string of text...",
  "bulletPoints": 5 || null
}
```

**Response**:
Returns a structured Markdown response including Estimated Reading Time, Key Insights, and a Bullet-point Summary.

### Troubleshooting

- **API Key Error**: Ensure your GEMINI_API_KEY is correctly set in the .env file and that you have sufficient quota.

- **CORS Issues**: If the extension cannot connect, verify that your NestJS main.ts has app.enableCors() configured to allow the extension's origin.
