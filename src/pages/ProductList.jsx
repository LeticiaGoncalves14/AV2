import React, { useEffect, useState } from 'react';
import {
  listarProdutos,
  deletarProduto,
  atualizarProduto,
} from '../api/produtoService';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Stack,
  TextField,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

export default function ProductList() {
  const [produtos, setProdutos] = useState([]);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [nomeEditado, setNomeEditado] = useState('');
  const [precoEditado, setPrecoEditado] = useState('');

  useEffect(() => {
    listarProdutos()
      .then(setProdutos)
      .catch((err) => {
        console.error(err);
        alert('Erro ao carregar produtos');
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletarProduto(id);
      setProdutos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      alert('Erro ao excluir produto');
    }
  };

  const iniciarEdicao = (produto) => {
    setProdutoEditando(produto);
    setNomeEditado(produto.nome);
    setPrecoEditado(produto.preco.toString());
  };

  const salvarEdicao = async () => {
    try {
      await atualizarProduto(produtoEditando.id, {
        nome: nomeEditado,
        preco: parseFloat(precoEditado),
      });
      setProdutos((prev) =>
        prev.map((p) =>
          p.id === produtoEditando.id
            ? { ...p, nome: nomeEditado, preco: parseFloat(precoEditado) }
            : p
        )
      );
      setProdutoEditando(null);
    } catch (error) {
      alert('Erro ao salvar edição');
    }
  };

  const cancelarEdicao = () => setProdutoEditando(null);

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <TableContainer component={Paper} elevation={6} sx={{ borderRadius: 3, bgcolor: '#f3f6f9' }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            Listagem de Produtos
          </Typography>
        </Box>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nome</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Preço (R$)</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((produto, index) => (
              <TableRow
                key={produto.id}
                sx={{
                 backgroundColor: index % 2 === 0 ? '#e3f2fd' : '#bbdefb', // azul claro alternado

                }}
              >
                <TableCell>{produto.id}</TableCell>
                <TableCell>
                  {produtoEditando?.id === produto.id ? (
                    <TextField
                      value={nomeEditado}
                      onChange={(e) => setNomeEditado(e.target.value)}
                      variant="standard"
                    />
                  ) : (
                    produto.nome
                  )}
                </TableCell>
                <TableCell>
                  {produtoEditando?.id === produto.id ? (
                    <TextField
                      type="number"
                      value={precoEditado}
                      onChange={(e) => setPrecoEditado(e.target.value)}
                      variant="standard"
                    />
                  ) : (
                    `R$ ${parseFloat(produto.preco).toFixed(2)}`
                  )}
                </TableCell>
                <TableCell>
                  {produtoEditando?.id === produto.id ? (
                    <Stack direction="row" spacing={1}>
                      <IconButton color="success" onClick={salvarEdicao}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton color="error" onClick={cancelarEdicao}>
                        <CancelIcon />
                      </IconButton>
                    </Stack>
                  ) : (
                    <Stack direction="row" spacing={1}>
                      <IconButton color="primary" onClick={() => iniciarEdicao(produto)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(produto.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
