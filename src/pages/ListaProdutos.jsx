import { useEffect, useState } from 'react';
import { listarProdutos, deletarProduto } from '../api/produtoService';
import {
  Container, Typography, List, ListItem, ListItemText, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    const dados = await listarProdutos();
    setProdutos(dados);
  };

  const remover = async (id) => {
    await deletarProduto(id);
    carregarProdutos();
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Lista de Produtos</Typography>
      <List>
        {produtos.map(prod => (
          <ListItem key={prod.id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => remover(prod.id)}>
                <DeleteIcon />
              </IconButton>
            }>
            <ListItemText primary={prod.nome} secondary={`Preço: R$ ${prod.preco}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default ListaProdutos;
