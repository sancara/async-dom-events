const getDataFromGit = async () => {
  const response = await fetch("https://api.github.com/repositories");
  const responseJson = await response.json();
  return responseJson[0];
};

const getProfileData = async () => {
  const profileData = await getDataFromGit();
  const avatarUrl = await profileData.owner.avatar_url;
  const name = await profileData.owner.login;
  const repos = await getRepositoriesFromOwner();

  const nameNode = document.querySelector("h1");
  nameNode.textContent = name;
  const avatarNode = document.querySelector("#avatar");
  avatarNode.src = avatarUrl;
  const reposNodeParent = doument.querySelector(".repos-list");
  const reposList = await repos.slice(0, 5);
  const appendChild = reposNodeParent.appendChild(reposList);

  console.log(reposList);

  return profileData;
};

getProfileData();

const getRepositoriesFromOwner = async () => {
  const allData = await getDataFromGit();
  const reposFromOwner = allData.owner.repos_url;
  const reposResponse = await fetch(reposFromOwner);
  const reposResponseJson = await reposResponse.json();
  return reposResponseJson;
};
