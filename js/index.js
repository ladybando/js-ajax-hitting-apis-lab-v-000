const rootURL = 'https://api.github.com'

function getRepositories(){

  var name = document.getElementById('username').value;
  var uri = rootURL + '/users/' + name + '/repos';
  const req  = new XMLHttpRequest();

  req.addEventListener('load', displayRepositories);
  req.open('GET', uri);
  req.send();
  return false;
}

function displayRepositories(){
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = '<ul>' + repos.map(repo => {
    const dataUsername = 'data-username="' + repo.owner.login + '"';
    const dataRepoName = 'data-repository="' + repo.name + '"';

    return `
      <li> +
        <h3>${repo.name}</h3>
        <a href="${repo.html_url}">${repo.html_url}</a><br>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a>
      </li>`;
  })
  .join('') + '</ul>';
   document.getElementById('repositories').innerHTML = repoList;
}

function displayCommits(){
  const commits = JSON.parse(this.responseText);
  const commitsList =  `<ul>${commits
    .map(
      commit =>
      '<li><h3>' +
      commit.commit.author.name +
      ' (' +
      commit.author.login +
      ')</h3>' +
      commit.commit.message +
      '</li>').join('')}</ul>` ;
  document.getElementById('details').innerHTML = commitsList;
}

function displayBranches(){
  const branches = JSON.parse(this.responseText);

  const branchesList =  `<ul>${branches
    .map(
      branch =>
      '<li>' +
      branch.name +
      '</li>').join('')}</ul>` ;
  document.getElementById('details').innerHTML = branchesList;
}

function getCommits(el){
  var repoName = el.dataset.repository
  var name = document.getElementById('username').value;
  var uri = rootURL + '/repos/' + name + '/' + repoName + '/commits';
  const req  = new XMLHttpRequest();

  req.addEventListener('load', displayCommits);
  req.open('GET', uri);
  req.send();
  return false;
}

function getBranches(el){
  var repoName = el.dataset.repository;
  var name = document.getElementById('username').value;
  var uri = rootURL + '/repos/' + name + '/' + repoName + '/branches';
  const req  = new XMLHttpRequest();

  req.addEventListener('load', displayBranches);
  req.open('GET', uri);
  req.send();
  return false;
}