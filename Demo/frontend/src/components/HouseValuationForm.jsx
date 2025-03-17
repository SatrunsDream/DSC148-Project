import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Rating
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const HouseValuationForm = () => {
  const [formData, setFormData] = useState({
    price: '',
    square_footage: '',
    bedrooms: '',
    bathrooms: '',
    age: '',
    address: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Convert string values to numbers where needed
      const payload = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        square_footage: parseFloat(formData.square_footage),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        age: parseInt(formData.age)
      };

      const response = await fetch('http://localhost:8000/api/predict-house-value', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const data = await response.json();
      setResult(data.prediction);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Transform data for Recharts
  const getPriceTrendData = () => {
    if (!result) return [];
    return result.regression_plot.x.map((x, i) => ({
      name: `Point ${i + 1}`,
      price: result.regression_plot.y[i]
    }));
  };

  const getRocData = () => {
    if (!result) return [];
    return result.roc_data.fpr.map((fpr, i) => ({
      fpr: fpr,
      tpr: result.roc_data.tpr[i]
    }));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          House Valuation Calculator
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Current Price (optional)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Square Footage"
                name="square_footage"
                type="number"
                value={formData.square_footage}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bedrooms"
                name="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bathrooms"
                name="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Age of House"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Get Valuation'}
              </Button>
            </Grid>
          </Grid>
        </form>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            Error: {error}
          </Typography>
        )}

        {result && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Predicted Price: ${result.predicted_price.toLocaleString()}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Valuation: {result.valuation}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography component="legend">Rating: </Typography>
              <Rating value={result.star_rating} readOnly />
            </Box>
            
            <Typography variant="h6" gutterBottom>
              Price Trend
            </Typography>
            <Box sx={{ height: 300, mb: 4 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getPriceTrendData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </Box>

            <Typography variant="h6" gutterBottom>
              ROC Curve
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getRocData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="fpr" />
                  <YAxis dataKey="tpr" />
                  <Tooltip />
                  <Line type="monotone" dataKey="tpr" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default HouseValuationForm; 