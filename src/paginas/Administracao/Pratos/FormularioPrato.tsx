import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';
import ITag from '../../../interfaces/ITag';

const FormularioPrato = () => {
  const [nomePrato, setNomePrato] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tag, setTag] = useState('');
  const [restaurante, setRestaurante] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);

  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    http
      .get<{ tags: ITag[] }>('tags/')
      .then((resposta) => setTags(resposta.data.tags));
    http
      .get<IRestaurante[]>('restaurantes/')
      .then((resposta) => setRestaurantes(resposta.data));
  }, []);

  const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.length ? event.target.files[0] : null;
    setImagem(file);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        Formulário de Prato
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        <TextField
          label="Nome do Prato"
          variant="standard"
          value={nomePrato}
          onChange={(event) => setNomePrato(event.target.value)}
          fullWidth
          required
          margin="dense"
        />
        <TextField
          label="Descricao do Prato"
          variant="standard"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
          fullWidth
          required
          margin="dense"
        />
        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select
            labelId="select-tag"
            value={tag}
            onChange={(event) => setTag(event.target.value)}
          >
            {tags.map((tag) => (
              <MenuItem value={tag.id} key={tag.id}>
                {tag.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-restaurante">Restaurante</InputLabel>
          <Select
            labelId="select-restaurante"
            value={restaurante}
            onChange={(event) => setRestaurante(event.target.value)}
          >
            {restaurantes.map((restaurante) => (
              <MenuItem value={restaurante.id} key={restaurante.id}>
                {restaurante.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input type="file" onChange={selecionarArquivo} />

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

export default FormularioPrato;
