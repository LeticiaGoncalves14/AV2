import React, { useState } from 'react';
import { cadastrarProduto } from '../api/produtoService';
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

export default function ProductForm() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await cadastrarProduto({ nome, preco: parseFloat(preco) });
      alert('Produto cadastrado com sucesso!');
      setNome('');
      setPreco('');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar produto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={6} sx={{ p: 4, bgcolor: '#f3f6f9', borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom textAlign="center" color="primary">
          Cadastro de Produto
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Nome do Produto"
              variant="outlined"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              fullWidth
              sx={{ bgcolor: 'white', borderRadius: 1 }}
            />
            <TextField
              label="Preço"
              type="number"
              variant="outlined"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
              fullWidth
              inputProps={{ step: '0.01', min: 0 }}
              sx={{ bgcolor: 'white', borderRadius: 1 }}
            />
            <Button
              variant="contained"
              type="submit"
              size="large"
              disabled={loading}
              sx={{
                bgcolor: '#1976d2',
                '&:hover': { bgcolor: '#115293' },
                fontWeight: 'bold',
                borderRadius: 2,
              }}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
