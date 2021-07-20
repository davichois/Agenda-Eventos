export const generatorId = (longitud) => {
  let id = "";
  const CHARACTERS = "abcdefghijklmnopqrstuvwxyz123456789";

  for (let i = 0; i < longitud; i++) {
    id += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
  }

  return id;
};
