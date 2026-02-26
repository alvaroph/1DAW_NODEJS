const express = require('express');
const app = express();
const fs = require('fs');
const port = 23000;

// Middleware per gestionar sol·licituds amb cos en format JSON
app.use(express.json());

function llegirDades() {
  const dadesJSON = fs.readFileSync('./data/motocicletes.json', 'utf8');
  return JSON.parse(dadesJSON);
}

function escriureDades(dades) {
  const dadesJSON = JSON.stringify(dades, null, 2);
  fs.writeFileSync('./data/motocicletes.json', dadesJSON);
}


app.post('/motocicletes', (req, res) => {
  const dades = llegirDades();
  const novaMoto = {
    id: dades.length + 1,
    marca: req.body.marca,
    model: req.body.model,
    any: req.body.any
  };
  dades.push(novaMoto);
  escriureDades(dades);
  res.status(201).json(novaMoto);
});

app.get('/motocicletes', (req, res) => {
  const dades = llegirDades();
  res.json(dades);
});

app.get('/motocicletes/:id', (req, res) => {
  const dades = llegirDades();
  const id = parseInt(req.params.id);
  let moto = null;

  for (let i = 0; i < dades.length; i++) {
    if (dades[i].id === id) {
      moto = dades[i];
      break;
    }
  }

  if (moto) {
    res.json(moto);
  } else {
    res.status(404).send('Motocicleta no trobada');
  }
});

app.put('/motocicletes/:id', (req, res) => {
  const dades = llegirDades();
  const id = parseInt(req.params.id);
  let motoActualitzada = null;

  for (let i = 0; i < dades.length; i++) {
    if (dades[i].id === id) {
      dades[i].marca = req.body.marca || dades[i].marca;
      dades[i].model = req.body.model || dades[i].model;
      dades[i].any = req.body.any || dades[i].any;
      motoActualitzada = dades[i];
      break;
    }
  }

  if (motoActualitzada) {
    escriureDades(dades);
    res.json(motoActualitzada);
  } else {
    res.status(404).send('Motocicleta no trobada');
  }
});

app.delete('/motocicletes/:id', (req, res) => {
  const dades = llegirDades();
  const id = parseInt(req.params.id);
  let index = -1;

  for (let i = 0; i < dades.length; i++) {
    if (dades[i].id === id) {
      index = i;
      break;
    }
  }

  if (index !== -1) {
    dades.splice(index, 1);
    escriureDades(dades);
    res.send('Motocicleta eliminada');
  } else {
    res.status(404).send('Motocicleta no trobada');
  }
});

app.listen(port, () => {
  console.log(`Servidor escoltant a http://localhost:${port}`);
});