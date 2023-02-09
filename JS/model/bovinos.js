function load(newBovino) {
  localStorage.setItem("bovinos-app:bovinos", JSON.stringify(newBovino));
}

function create(bovino) {
  bovino = { id: Date.now(), ...bovino };

  const bovinos = readAll();
  const newBovinos = [...bovinos, bovino];

  load(newBovinos);

  return bovino;
}

function readAll() {
  return JSON.parse(localStorage.getItem("bovinos-app:bovinos"));
}

function read(id) {
  const bovinos = readAll();

  const bovino = bovinos.find((bovino) => bovino.id === id);

  return bovino;
}

function update(id, bovino) {
  const bovinos = readAll();
  const index = bovinos.findIndex((bovino) => bovino.id === id);
  if (index >= 0) {
    bovinos[index] = { id, ...bovino };
  }

  load(bovinos);
  return bovino;
}

function destroy(id) {
  const bovinos = readAll();
  const index = bovinos.findIndex((bovino) => bovino.id === id);

  if (index >= 0) {
    bovinos.splice(index, 1);
  }

  load(bovinos);
}

export default { load, create, readAll, read, update, destroy };
