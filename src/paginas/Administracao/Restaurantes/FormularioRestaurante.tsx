import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

const FormularioRestaurante = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post('http://localhost:8000/api/v2/restaurantes/', {
        nome: nomeRestaurante,
      })
      .then(() => {
        alert(`Restaurante: ${nomeRestaurante} foi cadastrado com sucesso!`);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="standard-basic"
        label="Nome"
        variant="standard"
        onChange={(event) => setNomeRestaurante(event.target.value)}
      />
      <Button type="submit" variant="outlined">
        Salvar
      </Button>
    </form>
  );
};

export default FormularioRestaurante;
