import axios from 'axios';

const BASE = 'http://leoproti.com.br:8004';

export const listarProdutos = async () => {
  const res = await axios.get(`${BASE}/produtos`);
  return res.data;
};

export const cadastrarProduto = async (produto) => {
  await axios.post(`${BASE}/produtos`, produto);
};

export const deletarProduto = async (id) => {
  await axios.delete(`${BASE}/produtos/${id}`);
};

export const atualizarProduto = async (id, dados) => {
  await axios.put(`${BASE}/produtos/${id}`, dados);
};
