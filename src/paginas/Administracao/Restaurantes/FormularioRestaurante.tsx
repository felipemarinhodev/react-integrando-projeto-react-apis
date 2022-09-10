import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';

const FormularioRestaurante = () => {
  const params = useParams();
  const [nomeRestaurante, setNomeRestaurante] = useState('');

  useEffect(() => {
    if (params.id) {
      http.get<IRestaurante>(`restaurantes/${params.id}/`).then((result) => {
        setNomeRestaurante(result.data.nome);
      });
    }
  }, [params]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (params.id) {
      http
        .put<IRestaurante>(`restaurantes/${params.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert(`Restaurante: ${nomeRestaurante} foi atualizado com sucesso!`);
        });
    } else {
      http
        .post('restaurantes/', {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert(`Restaurante: ${nomeRestaurante} foi cadastrado com sucesso!`);
        });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
      }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Restaurantes
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        <TextField
          label="Nome do Restaurante"
          variant="standard"
          value={nomeRestaurante}
          onChange={(event) => setNomeRestaurante(event.target.value)}
          fullWidth
          required
        />
        <Button
          type="submit"
          variant="outlined"
          fullWidth
          sx={{ marginTop: 1 }}
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioRestaurante;
