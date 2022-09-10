import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import { IPaginacao } from '../../interfaces/IPaginacao';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import {
  Box,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

interface IParametrosBusca {
  ordering?: string;
  search?: string;
}

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState<string>('');
  const [anteriorPagina, setAnteriorPagina] = useState<string>('');
  const [busca, setBusca] = useState<string>('');
  const [ordenador, setOrdenador] = useState<'id' | 'nome'>('id');

  useEffect(() => {
    carregarDados('http://localhost:8000/api/v1/restaurantes/');
  }, []);

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios
      .get<IPaginacao<IRestaurante>>(url, opcoes)
      .then((response) => {
        setProximaPagina(response.data.next);
        setAnteriorPagina(response.data.previous);
        setRestaurantes(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRestaurantFiltered = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const opcoes = {
      params: {} as IParametrosBusca,
    };

    if (busca) opcoes.params.search = busca;
    if (ordenador) opcoes.params.ordering = ordenador;

    carregarDados('http://localhost:8000/api/v1/restaurantes/', opcoes);
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    novoFiltro: 'id' | 'nome'
  ) => {
    setOrdenador(novoFiltro);
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      <Box
        component="form"
        onSubmit={handleRestaurantFiltered}
        sx={{ display: 'flex', gap: 1 }}
      >
        <TextField
          id="name-filter-restaurant"
          label="Nome Restaurante"
          variant="standard"
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
          fullWidth
        />
        <ToggleButtonGroup
          value={ordenador}
          exclusive
          onChange={handleChange}
          aria-label="Filtro de restaurante"
        >
          <ToggleButton value="id" aria-label="id">
            id
          </ToggleButton>
          <ToggleButton value="nome" aria-label="nome">
            nome
          </ToggleButton>
        </ToggleButtonGroup>
        <Button type="submit" variant="outlined">
          Pesquisar
        </Button>
      </Box>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {anteriorPagina && (
        <button onClick={() => carregarDados(anteriorPagina)}>Anterior</button>
      )}
      {proximaPagina && (
        <button onClick={() => carregarDados(proximaPagina)}>Próxima</button>
      )}
    </section>
  );
};

export default ListaRestaurantes;
