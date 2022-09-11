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
import { useParams } from 'react-router-dom';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';
import ITag from '../../../interfaces/ITag';
import IPrato from '../../../interfaces/IPrato';

const FormularioPrato = () => {
  const [nomePrato, setNomePrato] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tag, setTag] = useState('');
  const [restaurante, setRestaurante] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);

  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  const params = useParams();

  useEffect(() => {
    http
      .get<{ tags: ITag[] }>('tags/')
      .then((resposta) => setTags(resposta.data.tags));
    http
      .get<IRestaurante[]>('restaurantes/')
      .then((resposta) => setRestaurantes(resposta.data));
    if (params.id) {
      http.get<IPrato>(`pratos/${params.id}/`).then((resposta) => {
        const {
          nome: _nome,
          tag: tagResposta,
          descricao: descricaoResposta,
          restaurante: _restaurante,
        } = resposta.data;
        setNomePrato(_nome);
        setDescricao(descricaoResposta);
        setTag(tagResposta);
        setRestaurante(_restaurante + '');

        console.log('resposta prato', resposta);
      });
    }
  }, []);

  const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.length ? event.target.files[0] : null;
    setImagem(file);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (params.id) {
      http
        .put(`pratos/${params.id}/`, {
          nome: nomePrato,
          descricao,
          tag,
          restaurante,
        })
        .then(() => {
          alert(`O prato ${nomePrato} foi alterado com sucesso!`);
          return;
        })
        .catch((error) => console.log(error));
    } else {
      const formData = new FormData();
      formData.append('nome', nomePrato);
      formData.append('descricao', descricao);
      formData.append('tag', tag);
      formData.append('restaurante', restaurante);
      !!imagem && formData.append('imagem', imagem);

      http
        .request({
          url: 'pratos/',
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
        })
        .then(() => alert(`O prato ${nomePrato} foi cadastrado com sucesso!`))
        .catch((error) => console.log(error));
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
              <MenuItem value={tag.value} key={tag.id}>
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
          {params.id ? 'Atualizar' : 'Salvar'}
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioPrato;
