// Main Variables
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.addEventListener("click", () => {
  getRepos();
});

// Get Repos Function
async function getRepos() {
  if (theInput.value === "") {
    reposData.innerHTML = `<span>Please Write Github Username.</span>`;
  } else {
    try {
      let myData = await fetch(
        `https://api.github.com/users/${theInput.value}/repos`
      );
      let repositories = await myData.json();

      // Empty The Container
      reposData.innerHTML = "";

      // Loop On Repositories
      repositories.forEach((repo) => {
        // Create The Main Div Element
        let mainDiv = document.createElement("div");

        // Create Repo Name Text
        let repoName = document.createTextNode(repo.name);

        // Create Repo URL Anchor Tag
        let theUrl = document.createElement("a");

        // Create Repo Url Text
        let theUrlText = document.createTextNode("Visit");

        // Append The Repo Url Text To Anchor Tag
        theUrl.append(theUrlText);

        // Add The href Attribute
        theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

        // Set The Target Attribute
        theUrl.setAttribute("target", "_blank");

        // Create Stars Count Span
        let starsSpan = document.createElement("span");

        // Create The Stars Count Text
        let starsText = document.createTextNode(
          `Stars ${repo.stargazers_count}`
        );

        // Add Stars Count Text To Stars Span
        starsSpan.append(starsText);

        //  Append The Text, The Url Anchor and Stars Span To Main Div
        mainDiv.append(repoName, starsSpan, theUrl);

        // Add Class To Main Div
        mainDiv.className = "repo-box";
        // Append the Main Div To Container
        reposData.appendChild(mainDiv);
      });
    } catch (reason) {
      console.log(reason);
      reposData.innerHTML = `<span>Please Write a Valid Github Username.</span>`;
    }
  }
}
