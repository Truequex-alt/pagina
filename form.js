document.getElementById("formulario-intercambio").addEventListener("submit", async function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const deseo = document.getElementById("deseo").value.trim();
  const contacto = document.getElementById("contacto").value.trim();
  const imagenInput = document.getElementById("imagen");
  const mensaje = document.getElementById("mensaje");

  if (!imagenInput.files[0]) {
    mensaje.innerHTML = `<p style="color:red;">⚠️ Por favor, sube una imagen.</p>`;
    return;
  }

  const reader = new FileReader();
  reader.onload = function() {
    const base64Image = reader.result;

    const nuevoIntercambio = {
      nombre,
      descripcion,
      deseo,
      contacto,
      imagen: base64Image,
      fecha: new Date().toISOString()
    };

    const intercambios = JSON.parse(localStorage.getItem("intercambios") || "[]");
    intercambios.push(nuevoIntercambio);
    localStorage.setItem("intercambios", JSON.stringify(intercambios));

    mensaje.innerHTML = `<p style="color:green;">✅ ¡Intercambio publicado exitosamente!</p>`;
    document.getElementById("formulario-intercambio").reset();
  };

  reader.readAsDataURL(imagenInput.files[0]);
});
