document.getElementById('leadForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue

    const form = e.target;
    const formData = new FormData(form);
    const messageDiv = document.getElementById('formMessage');
    const submitButton = form.querySelector('button[type="submit"]');

    // Mostrar mensaje de carga y deshabilitar botón
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    messageDiv.textContent = 'Estamos procesando tu solicitud, un momento...';
    messageDiv.classList.remove('hidden', 'text-green-600', 'text-red-600');
    messageDiv.classList.add('text-blue-600');

    // La URL de tu webhook de n8n. ¡Aún no la tienes, pero la pondremos aquí!
    const n8nWebhookUrl = 'https://n8n.novaproflow.com/webhook-test/lead-propietario'; 

    fetch(n8nWebhookUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('La respuesta de la red no fue ok');
        }
        return response.json(); // O response.text() si n8n no devuelve JSON
    })
    .then(data => {
        console.log('Success:', data);
        messageDiv.textContent = '¡Gracias! Hemos recibido tu solicitud. Nos pondremos en contacto contigo en menos de 24h.';
        messageDiv.classList.remove('text-blue-600');
        messageDiv.classList.add('text-green-600');
        form.reset(); // Limpia el formulario
    })
    .catch((error) => {
        console.error('Error:', error);
        messageDiv.textContent = 'Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.';
        messageDiv.classList.remove('text-blue-600');
        messageDiv.classList.add('text-red-600');
    })
    .finally(() => {
        // Rehabilitar el botón
        submitButton.disabled = false;
        submitButton.textContent = 'QUIERO UNA VALORACIÓN GRATUITA';
    });
});
