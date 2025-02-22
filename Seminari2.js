// Función para obtener un usuario de una API
function getUser(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => {
        if (!response.ok) throw new Error("Error al obtener el usuario");
        return response.json();
      });
  }
  
  // Función para obtener los posts de un usuario
  function getPosts(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => {
        if (!response.ok) throw new Error("Error al obtener los posts");
        return response.json();
      });
  }
  
  // Función para obtener los comentarios de un post
  function getComments(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then(response => {
        if (!response.ok) throw new Error("Error al obtener los comentarios del post");
        return response.json();
      });
  }
  
  // Encadenando Promesas
  console.log("Inicio");
  
  getUser(1)
    .then(user => {
      console.log("Usuario obtenido:", user);
      return getPosts(user.id);
    })
    .then(posts => {
      console.log("Posts obtenidos:", posts);
      // Obtenim els comentaris
      return getComments(posts[0].id);
    })
    .then(comments => {
      console.log("Comentarios del primer post:", comments);
  
      // Filtrar comentarios que contienen la palabra "la"
      const filteredComments = comments.filter(comment => comment.body.includes("la"));
      console.log("Comentarios filtrados que contienen 'la':", filteredComments);
  
      // Mapear los comentarios para obtener solo los nombres de los autores
      const commentAuthors = comments.map(comment => comment.name);
      console.log("Nombres de los autores de los comentarios:", commentAuthors);
  
      // Reducir los comentarios para contar cuantos comentarios ha hecho cada autor
      const commentCountByAuthor = comments.reduce((acc, comment) => {
        acc[comment.email] = (acc[comment.email] || 0) + 1;
        return acc;
      }, {});
      console.log("Contador de comentarios por autor:", commentCountByAuthor);
  
      console.log("Fin");
    })
    .catch(error => console.error("Error:", error));