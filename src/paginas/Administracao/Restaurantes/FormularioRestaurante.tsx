import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
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
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">Administração</Typography>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Link component={RouterLink} to="/admin/restaurantes/">
                <Button sx={{ my: 2, color: 'white' }}>Restaurante</Button>
              </Link>
              <Link component={RouterLink} to="/admin/restaurantes/novo">
                <Button sx={{ my: 2, color: 'white' }}>Novo Restaurante</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
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
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: '100%' }}
              >
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
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default FormularioRestaurante;
