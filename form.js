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

  const formData = new FormData();
  formData.append("nombre", nombre);
  formData.append("descripcion", descripcion);
  formData.append("deseo", deseo);
  formData.append("contacto", contacto);
  formData.append("imagen", imagenInput.files[0]);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbywKWD0Z8E-vYrU6rEeb3bd485j4jrt0I6s3LRe4439523G9cqYHHrv8VZ1kWbT6BtC/exec", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      mensaje.innerHTML = `<p style="color:green;">✅ ¡Intercambio publicado exitosamente!</p>`;
      document.getElementById("formulario-intercambio").reset();
    } else {
      mensaje.innerHTML = `<p style="color:red;">❌ Error al enviar. Intenta nuevamente.</p>`;
    }
  } catch (error) {
    console.error("Error:", error);
    mensaje.innerHTML = `<p style="color:red;">❌ Error de red. Revisa tu conexión o vuelve a intentar.</p>`;
  }
});
