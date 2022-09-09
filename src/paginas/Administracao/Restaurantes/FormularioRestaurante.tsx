import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';

const FormularioRestaurante = () => {
  const params = useParams();
  const [nomeRestaurante, setNomeRestaurante] = useState('');

  useEffect(() => {
    if (params.id) {
      axios
        .get<IRestaurante>(
          `http://localhost:8000/api/v2/restaurantes/${params.id}/`
        )
        .then((result) => {
          setNomeRestaurante(result.data.nome);
        });
    }
  }, [params]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (params.id) {
      axios
        .put<IRestaurante>(
          `http://localhost:8000/api/v2/restaurantes/${params.id}/`,
          {
            nome: nomeRestaurante,
          }
        )
        .then(() => {
          alert(`Restaurante: ${nomeRestaurante} foi atualizado com sucesso!`);
        });
    } else {
      axios
        .post('http://localhost:8000/api/v2/restaurantes/', {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert(`Restaurante: ${nomeRestaurante} foi cadastrado com sucesso!`);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="standard-basic"
        label="Nome"
        variant="standard"
        value={nomeRestaurante}
        onChange={(event) => setNomeRestaurante(event.target.value)}
      />
      <Button type="submit" variant="outlined">
        Salvar
      </Button>
    </form>
  );
};

export default FormularioRestaurante;
