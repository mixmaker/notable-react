export default async function handler(req, res) {
  const { pathname } = new URL(req.url, 'http://localhost');
  const functionName = pathname.substring(1); // Remove leading slash

  if (functionName === 'keepActive') {
    return await require('./keepActive')(req, res);
  }

  res.status(404).json({ message: 'Not Found' });
}
