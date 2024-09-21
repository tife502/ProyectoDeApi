fetch("https://fake-api-vq1l.onrender.com/posts", {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJlbWFpbCI6ImouZHVyYW4yQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY4ODQzMTYsImV4cCI6MTc0NDE2NDMxNn0.4PE0SgarbzuJubXxqsVnP4ECYvyr9r4BMet9SwjsiQo",
  },
})
  //Pasarlo a json
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const List = document.getElementById("List");

    data.forEach((product) => {
      const il = document.createElement("li");
      const images = JSON.parse(product.images);
      //const img = document.getElementById("img");
      //img.src = images[0];
      const myhtml = `
      <div  id="${product.id}" class="card" style="width: 15rem;  margin: 15px;" >
        <img src="${images[0]} " class="card-img-top" alt = "...">
        <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
        <p class="card-text">${product.id}</p>
          <button type="button" onclick="editPost(${product.id})" class="btn btn-outline-warning">EDITAR</button>
          <button type="button" onclick="deletePost(${product.id})" class="btn btn-outline-danger">ELIMINAR</button>
        </div>
      </div>`;
      
      il.innerHTML = myhtml;
      List.appendChild(il);
    });
  });
// //<p class="card-text">${product.description}</p>


function sendForm() {
  const id = document.getElementById("saveButton").dataset.id || null;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const value = document.getElementById("value").value;
  const image = document.getElementById("image").value;
  const category = document.getElementById("category").value;

  const body = {
    title,
    description,
    value,
    images: [image],
    category_id: category,
  };

  // Si hay un id, se está editando un producto; si no, se está creando uno nuevo
  const method = id ? "PATCH" : "POST";
  const url = id
    ? `https://fake-api-vq1l.onrender.com/posts/${id}`
    : "https://fake-api-vq1l.onrender.com/posts";

  fetch(url, {
    method,
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJlbWFpbCI6ImouZHVyYW4yQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY4ODQzMTYsImV4cCI6MTc0NDE2NDMxNn0.4PE0SgarbzuJubXxqsVnP4ECYvyr9r4BMet9SwjsiQo",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((updatedProduct) => {
      console.log("Producto actualizado/creado:", updatedProduct);
      location.reload(); // Recargar la página para ver los cambios
    });
}

  function deletePost(id){
    fetch(`https://fake-api-vq1l.onrender.com/posts/${id}`, {
      method: "DELETE", 
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJlbWFpbCI6ImouZHVyYW4yQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY4ODQzMTYsImV4cCI6MTc0NDE2NDMxNn0.4PE0SgarbzuJubXxqsVnP4ECYvyr9r4BMet9SwjsiQo",
      },
    })
    .then( res => res.json())
    .then( res => {
      console.log(
        "respuesta de la api", res
      )
      location.reload();
    })
  }


  fetch("https://fake-api-vq1l.onrender.com/category", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJlbWFpbCI6ImouZHVyYW4yQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY4ODQzMTYsImV4cCI6MTc0NDE2NDMxNn0.4PE0SgarbzuJubXxqsVnP4ECYvyr9r4BMet9SwjsiQo",
    },
  })
    //Pasarlo a json
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const categories = document.getElementById("category");
  
      data.forEach((category) => {
        const options = document.createElement("option");
        options.innerHTML = category.name;
        options.value = category.category_id;  
        options.id = category.category_id;  
        if(category.category_id == 6) options.selected = true;
        categories.appendChild(options);
      });
    });


    function editPost(id) {
      fetch(`https://fake-api-vq1l.onrender.com/posts/${id}`, {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJlbWFpbCI6ImouZHVyYW4yQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY4ODQzMTYsImV4cCI6MTc0NDE2NDMxNn0.4PE0SgarbzuJubXxqsVnP4ECYvyr9r4BMet9SwjsiQo",
        },
      })
        .then((response) => response.json())
        .then((product) => {
          // Rellenar los campos del formulario con la info del producto
          document.getElementById("title").value = product.title;
          document.getElementById("description").value = product.description;
          document.getElementById("value").value = product.value;
          document.getElementById("image").value = JSON.parse(product.images)[0];
          document.getElementById("category").value = product.category_id;
          
          // Guardar el id del producto que se está editando
          document.getElementById("saveButton").dataset.id = id;
        });
    }
