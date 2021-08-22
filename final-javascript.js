const getDataFromGit = async () => {
  const response = await fetch("https://api.github.com/repositories");
  const responseJson = await response.json();
  return responseJson[0];
};

const getProfileData = async () => {
  const profileData = await getDataFromGit();
  const name = await profileData.owner.login;
  const avatarUrl = await profileData.owner.avatar_url;
  const repositories = await getReposFromOwner()
  
  
  const nameNode = document.querySelector("h1");
  nameNode.textContent = name;
  const avatarNode = document.querySelector("#avatar");
  avatarNode.src = avatarUrl;
  const reposList = await repositories;
  reposList.forEach((repo) => {
    const repoUrl = document.createElement("a");
    const reposNodeParent = document.querySelector(".repos-list");
    repoUrl.textContent = repo.html_url;
    repoUrl.href = repo.html_url;

    reposNodeParent.appendChild(repoUrl);
  });

  console.log(reposList);

  return profileData;
}

getProfileData();

const getReposFromOwner = async () => {
  const reposFromOwner = await getDataFromGit();
  const repos = await reposFromOwner.owner.repos_url;
  const reposResponse = await fetch(repos);
  const reposResponseJson = reposResponse.json();
  return reposResponseJson.slice(0, 5);
}
