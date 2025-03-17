import config from './config';

export const fetchPrediction = async (predictionData) => {
  const response = await fetch(`${config.backendUrl}/api/predict-house-value`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(predictionData)
  });

  if (!response.ok) {
    throw new Error('Failed to get prediction');
  }

  return response.json();
};
