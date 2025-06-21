import { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { cadastrarProduto } from '../api/produtoService';

function CadastroProduto() {
  const [produto, setProduto] = useState({
    nome: '',
    descricao: '',
    preco: ''
  });

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await cadastrarProduto(produto);
    alert('Produto cadastrado!');
    setProduto({ nome: '', descricao: '', preco: '' });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Cadastrar Produto</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Nome" name="nome" value={produto.nome} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Descrição" name="descricao" value={produto.descricao} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Preço" name="preco" value={produto.preco} onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary">Salvar</Button>
      </form>
    </Container>
  );
}

export default CadastroProduto;
