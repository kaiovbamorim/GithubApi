import React, { useState, createContext, useEffect } from "react";
import "./App.css";
export const ThemeContext = createContext(null);
function App() {
  const [ball, setBall] = useState("ball");
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "dark" ? "ligth" : "dark"));
    if (ball === "ball") {
      setBall("ball move");
    } else {
      setBall("ball");
    }
  };
  useEffect(() => {
    let input = document.querySelector(".search input");

    input.addEventListener("keypress", (e) => {
      let key = e.which || e.keyCode;
      if (key === 13) {
        const btn = document.querySelector(".search button");
        btn.click();
      }
    });
  }, []);
  const [username, setUsername] = useState("");
  const [body, setBody] = useState("");

  const submitUsername = () => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((body) => {
        setBody(body);
        let d = new Date(body.created_at);
        body.date = d.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ThemeContext.Provider value={(theme, toggleTheme)}>
      <div className="App" id={theme}>
        <header>
          <span>gitfinder</span>
          <div
            className="button"
            onClick={toggleTheme}
            checked={theme === "dark"}
          >
            <div className="icons-button">
              <i className="bi bi-moon-fill"></i>
              <i className="bi bi-brightness-high-fill"></i>
            </div>
            <div className={ball}></div>
          </div>
        </header>
        <main>
          <div className="search">
            <div className="search-input">
              <label htmlFor="username">
                <i className="bi bi-search"></i>
              </label>
              <input
                type="text"
                id="username"
                placeholder="Digite seu username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button onClick={submitUsername}>Pesquisar</button>
          </div>
          {body.name === undefined ? (
            <div className="content-finder">
              <p>Pesquise seu usuário do GitHub</p>
            </div>
          ) : (
            <div className="content-finder">
              <img src={body.avatar_url} />
              <div className="container-flex">
                <div className="name">
                  <div>
                    <h1>{body.name}</h1>
                    <a href={body.html_url} target="_blank">
                      <h2>{body.login}</h2>
                    </a>
                  </div>
                  <span>Entrou {body.date}</span>
                </div>
                <div className="description">
                  <p>{body.bio}</p>
                </div>
                <div className="followers">
                  <div className="container-followers">
                    <p>Reps</p>
                    <p>{body.public_repos}</p>
                  </div>
                  <div className="container-followers">
                    <p>Seguidores</p>
                    <p>{body.followers}</p>
                  </div>
                  <div className="container-followers">
                    <p>Seguindo</p>
                    <p>{body.following}</p>
                  </div>
                </div>
                <div className="container-links">
                  <div className="content-link">
                    <i className="bi bi-geo-alt-fill"></i>
                    <p>
                      {body.location === null ? "Não definido" : body.location}
                    </p>
                  </div>
                  <div className="content-link">
                    <i className="bi bi-link-45deg"></i>
                    <a href={body.blog} target="_blank">
                      <p>{body.blog === "" ? "Não definido" : body.blog}</p>
                    </a>
                  </div>
                  <div className="content-link">
                    <i className="bi bi-twitter"></i>
                    <a href={body.twitter_username} target="_blank">
                      <p>
                        {body.twitter_username === null
                          ? "Não definido"
                          : body.twitter_username}
                      </p>
                    </a>
                  </div>
                  <div className="content-link">
                    <i className="bi bi-building"></i>
                    <p>
                      {body.company === null ? "Não definido" : body.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
