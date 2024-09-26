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



    fetch("https://fake-api-vq1l.onrender.com/category", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJlbWFpbCI6ImouZHVyYW4yQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY4ODQzMTYsImV4cCI6MTc0NDE2NDMxNn0.4PE0SgarbzuJubXxqsVnP4ECYvyr9r4BMet9SwjsiQo",
      },
    })
      //Pasarlo a json
      .then((response) => response.json())
      .then((data) => {
        const container =  document.getElementById("container");
        const navegacion = document.getElementById("navegacion");
        data.forEach((category) => {
          const ircategories = `
          <ul>
              <li><a href="#${category.name}">${category.name}</a></li>
          </ul>`
          const seccion = `
        <section id = "${category.name}">
          <div>
            <h2>${category.name}</h2>
            <button type="button" onclick="editPostCategory(${category.category_id})" class="btn btn-outline-primary">EDITAR</button>
            <button type="button" onclick="deletePostCategory(${category.category_id})" class="btn btn-outline-success">ELIMINAR</button>
          </div>
          <ul style = 
          "
          list-style-type: none; 
          display: flex; flex-wrap: wrap;
          justify-content: space-between; 
          padding: 0px; 
          margin: 40px 20px 0 40px;"  
          id = "Lista-${category.category_id}">
          </ul>
        </section>
          `

          container.innerHTML += seccion;
          navegacion.innerHTML += ircategories;
        });
          addlist();     
            
      });



    function addlist(){
      fetch("https://fake-api-vq1l.onrender.com/posts", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJlbWFpbCI6ImouZHVyYW4yQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY4ODQzMTYsImV4cCI6MTc0NDE2NDMxNn0.4PE0SgarbzuJubXxqsVnP4ECYvyr9r4BMet9SwjsiQo",
        },
      })
        //Pasarlo a json
        .then((response) => response.json())
        .then((data) => {      
          data.forEach((product) => {
            const List = document.getElementById(`Lista-${product.category_id}`);
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
                <button type="button" onclick="editPost(${product.id})" class="btn btn-outline-primary">EDITAR</button>
                <button type="button" onclick="deletePost(${product.id})" class="btn btn-outline-success">ELIMINAR</button>
                </div>
              </div>`;
            il.innerHTML = myhtml;
            List.appendChild(il);
          });
        });
    }



    function sendFormCategory() {
      const id = document.getElementById("saveButtonCategory").dataset.id || null;
      const name = document.getElementById("name").value;
      const description = document.getElementById("descriptioncategory").value;
      const image = document.getElementById("imanumbergecategory").value;
    
      const bodyCategory = {
        name,
        description,
        image: image,
      };
    
      // Si hay un id, se está editando un producto; si no, se está creando uno nuevo
      const method = id ? "PATCH" : "POST";
      const url = id
        ? `https://fake-api-vq1l.onrender.com/category/${id}`
        : "https://fake-api-vq1l.onrender.com/category";
      console.log(bodyCategory);

      fetch(url, {
        method,
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJlbWFpbCI6ImouZHVyYW4yQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY4ODQzMTYsImV4cCI6MTc0NDE2NDMxNn0.4PE0SgarbzuJubXxqsVnP4ECYvyr9r4BMet9SwjsiQo",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyCategory),
      })
        .then((response) => response.json())
        .then((updatedCategroy) => {
          console.log("Category actualizada/creado:", updatedCategroy);
          location.reload(); // Recargar la página para ver los cambios
        });
      }



      function editPostCategory(id) {
        fetch(`https://fake-api-vq1l.onrender.com/category/${id}`, {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJlbWFpbCI6ImouZHVyYW4yQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY4ODQzMTYsImV4cCI6MTc0NDE2NDMxNn0.4PE0SgarbzuJubXxqsVnP4ECYvyr9r4BMet9SwjsiQo",
          },
        })
          .then((response) => response.json())
          .then((category) => {
            // Rellenar los campos del formulario con la info del producto
            document.getElementById("name").value = category.name;
            document.getElementById("descriptioncategory").value = category.description;
            document.getElementById("imanumbergecategory").value = category.image;
            // Guardar el id del producto que se está editando
            document.getElementById("saveButtonCategory").dataset.id = id;
          });
      }

      function deletePostCategory(id){
        fetch(`https://fake-api-vq1l.onrender.com/category/${id}`, {
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