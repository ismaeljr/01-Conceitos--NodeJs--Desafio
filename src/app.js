const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // escrever codigo para listar repositorios

  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  // escrever codigo para cadastrar repositorio
  const {title, url, techs} = request.body;
  
  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repositorie);

  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  // escrever codigo que altere o repositorio
  const { id } = request.params;
  const { title, url, techs } = request.body;
  
  //devemos pegar o indice
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex < 0){
    return response.status(400).json({error: "Id not Found!"});
  }

  const repositorie = {
    id: repositories[repositorieIndex].id,
    title,
    url,
    techs,
    likes :repositories[repositorieIndex].likes
  }
  
  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);

});

app.delete("/repositories/:id", (request, response) => {
  // escrever codigo para deletar
  const { id } = request.params;
  
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex < 0){
    return response.status(400).json({error: "Id not Found!"})
  }

  repositories.splice(repositorieIndex,1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // escrever codigo para aumentar o like enm +1
  const { id } = request.params;
  //onst {title, url, techs, likes} = request.body;
    

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex < 0){
    return response.status(400).json({error: "Id not Found!"})
  }
  repositories[repositorieIndex].likes++;
  
  return response.json(repositories[repositorieIndex]);

});

module.exports = app;
