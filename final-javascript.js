const getDataFromGit = async () => {
  const response = await fetch("https://api.github.com/repositories");
  const responseJson = await response.json();
  return responseJson[0];
};

const getProfileData = async () => {
  const profileData = await getDataFromGit();
  const name = await profileData.owner.login;
  const avatarUrl = await profileData.owner.avatar_url;
  
  const nameNode = document.querySelector('h1');
  nameNode.textContent = name;
  const avatarNode = document.querySelector('#avatar');
  avatarNode.src = avatarUrl;
}

getProfileData();
