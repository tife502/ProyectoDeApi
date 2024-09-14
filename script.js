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
      <div class="card" style="width: 18rem;">
        <img src=" ${images[0]} " class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
          <button type="button" class="btn btn-warning">Warning</button>
          <button type="button" class="btn btn-danger">Danger</button>

        </div>
      </div>`;
      il.innerHTML = myhtml;
      List.appendChild(il);
    });
  });


  /*  ${product.title} <img src= "${images[0]}" >  */
