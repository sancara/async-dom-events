const getDataFromGit = async () => {
  const response = await fetch("https://api.github.com/repositories");
  const responseJson = await response.json();
  return responseJson[0];
};
