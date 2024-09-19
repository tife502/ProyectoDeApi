fetch("https://fake-api-vq1l.onrender.com/posts", {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJlbWFpbCI6ImouZHVyYW4yQHV0cC5lZHUuY28iLCJpYXQiOjE3MjU2NzQwMjAsImV4cCI6MTc0Mjk1NDAyMH0.uh8nG5dyUwd-gYdQdt4dmLIIF3YaqV4ZoLKmVV5toUQ",
  },
})
  //Pasarlo a json
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const List = document.getElementById("List");

    data.forEach((product) => {
      console.log(product.title);
      const il = document.createElement("li");
      const images = JSON.parse(product.images);
      //const img = document.getElementById("img");
      //img.src = images[0];
      const myhtml = `
      <div  id="${product.id}" class="card" style="width: 18rem;  margin: 20px;" >
        <img src="${images[0]} " class="card-img-top" alt = "...">
        <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
        <p class="card-text">${product.value}</p>
          <button type="button" class="btn btn-outline-warning">EDITAR</button>
          <button type="button" onclick = ""class="btn btn-outline-danger">ELIMINAR</button>
        </div>
      </div>`;
      
      il.innerHTML = myhtml;
      List.appendChild(il);
    });
  });
// //<p class="card-text">${product.description}</p>


  function sendForm(){
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const value = document.getElementById("value");
    const image = document.getElementById("image");
    const category = document.getElementById("category");
    console.log(category.value);
    const body ={
      title: title.value,
      description: description.value,
      value: value.value,
      images: [image.value]
      
    }
    fetch("https://fake-api-vq1l.onrender.com/posts", {
      method: "POST", 
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI4LCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE3MjU0MjEwOTQsImV4cCI6MTc0MjcwMTA5NH0.aHg7Hq1tGOI8QCnYo1PgUym229x7_SbrCQpk_tAYITs",
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then( res => res.json())
    .then( res => {
      console.log(
        "respuesta de la api", res
      )
      title.value = "";
      description.value = "";
      value.value = "";
      image.value = "";
      location.reload();
    })
  
  }

  function deletePost(id){
    fetch(`https://fake-api-vq1l.onrender.com/posts/${id}`, {
      method: "DELETE", 
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI4LCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE3MjU0MjEwOTQsImV4cCI6MTc0MjcwMTA5NH0.aHg7Hq1tGOI8QCnYo1PgUym229x7_SbrCQpk_tAYITs",
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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJlbWFpbCI6ImouZHVyYW4yQHV0cC5lZHUuY28iLCJpYXQiOjE3MjU2NzQwMjAsImV4cCI6MTc0Mjk1NDAyMH0.uh8nG5dyUwd-gYdQdt4dmLIIF3YaqV4ZoLKmVV5toUQ",
    },
  })
    //Pasarlo a json
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const categories = document.getElementById("category");
  
      data.forEach((category) => {
        console.log(category.name);
        const options = document.createElement("option");
        options.innerHTML = category.name;
        options.value = category.category_id;  
        options.id = category.category_id;  
        if(category.category_id == 5) options.selected = true;
        console.log(options)
        categories.appendChild(options);
      });
    });
