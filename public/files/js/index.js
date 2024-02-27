const refs = {
  form: document.querySelector("#form"),
  list: document.querySelector("#group-list"),
  button: document.querySelector("#get-groups"),
};

const url = window.location.origin + "/api/files";

const createElement = (el) =>
  `<li data-acc="${el}"><a href="https://t.me/${el}">${el}</a><button type="button">Delete</button></li>`;

refs.button.addEventListener("click", () => {
  fetch(url)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(resp.status);
      }
      return resp.json();
    })
    .then((data) => {
      refs.list.innerHTML = data.map(createElement).join("");
    })
    .catch((err) => {
      refs.list.innerHTML = `<li>${err}</li>`;
    });
});

refs.form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = e.currentTarget.groupName.value;

  const data = inputValue
    .trim()
    .split(" ")
    .filter((el) => el.length > 0);

  fetch(url, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(resp.status);
      }
      return resp.json();
    })
    .then(({ data }) => {
      refs.list.innerHTML = data.map(createElement).join("");
    })
    .catch((err) => {
      refs.list.innerHTML = `<li>${err}</li>`;
    });
});

refs.list.addEventListener("click", (e) => {
  if (e.target.textContent === "Delete" && e.target.tagName === "BUTTON") {
    e.target.parentNode.dataset.acc;

    fetch(url + "/" + e.target.parentNode.dataset.acc, {
      method: "DELETE",
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      })
      .then(({ data }) => {
        refs.list.innerHTML = data.map(createElement).join("");
      })
      .catch((err) => {
        refs.list.innerHTML = `<li>${err}</li>`;
      });
  }
});
