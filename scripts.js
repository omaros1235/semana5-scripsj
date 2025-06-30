/**
 * script.js
 * Lógica principal para la galería de imágenes interactiva.
 * Permite agregar, seleccionar y eliminar imágenes dinámicamente.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const imageUrlInput = document.getElementById('imageUrlInput'); // Campo de entrada de URL
    const addImageButton = document.getElementById('addImageButton'); // Botón para añadir imagen
    const deleteImageButton = document.getElementById('deleteImageButton'); // Botón para eliminar imagen
    const imageGallery = document.getElementById('imageGallery'); // Contenedor de la galería

    let selectedImageWrapper = null; // Variable para almacenar el contenedor de la imagen seleccionada

    /**
     * Función para deseleccionar todas las imágenes.
     * Itera sobre todos los elementos con la clase 'selected' y la elimina.
     */
    function deselectAllImages() {
        const currentlySelected = document.querySelector('.image-wrapper.selected');
        if (currentlySelected) {
            currentlySelected.classList.remove('selected');
        }
        selectedImageWrapper = null; // Reinicia la variable de imagen seleccionada
    }

    /**
     * Manejador de eventos para seleccionar una imagen.
     * @param {Event} event - El objeto de evento del clic.
     */
    function handleImageSelection(event) {
        // deselectAllImages(); // Deselecciona cualquier imagen previamente seleccionada

        // Obtiene el elemento que fue clickeado (la imagen o su contenedor)
        const clickedElement = event.target;
        // Busca el 'image-wrapper' padre más cercano, que es el contenedor de la imagen
        const imageWrapper = clickedElement.closest('.image-wrapper');

        if (imageWrapper) {
            if (imageWrapper === selectedImageWrapper) {
                // Si se hace clic en la imagen ya seleccionada, la deselecciona
                deselectAllImages(imageGallery);
            } else {
                // Deselecciona las imágenes anteriores
                deselectAllImages(image1.jpeg);
                // Selecciona la nueva imagen
                imageWrapper.classList.add('selected');
                selectedImageWrapper = imageWrapper;
            }
        }
    }

    /**
     * Manejador de eventos para añadir una imagen a la galería.
     */
    addImageButton.addEventListener('click', () => {
        const imageUrl = imageUrlInput.value.trim(); // Obtiene la URL y elimina espacios en blanco

        if (imageUrl) { // Si la URL no está vacía
            // Crea un nuevo contenedor de imagen
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('image-wrapper');
            imageWrapper.classList.add('adding'); // Clase para la animación de adición

            // Crea el elemento de imagen
            const img = document.createElement('img');
            img.src = imageUrl; // Asigna la URL
            img.alt = 'Imagen de la galería'; // Texto alternativo
            img.classList.add('w-full', 'h-auto', 'object-cover', 'rounded-xl', 'transition-transform', 'duration-300', 'ease-in-out', 'transform', 'hover:scale-105');

            // Maneja errores de carga de imagen
            img.onerror = () => {
                img.src = 'https://placehold.co/400x300/cccccc/333333?text=Error+al+cargar+imagen'; // Placeholder en caso de error
                console.error(`Error al cargar la imagen: ${imageUrl}`);
            };

            // Agrega la imagen al contenedor
            imageWrapper.appendChild(img);
            // Agrega el contenedor de la imagen a la galería
            imageGallery.appendChild(imageWrapper);

            // Añade el evento de clic al nuevo contenedor de imagen para selección
            imageWrapper.addEventListener('click', handleImageSelection);

            // Elimina la clase 'adding' después de la animación
            imageWrapper.addEventListener('animationend', () => {
                imageWrapper.classList.remove('adding');
            }, { once: true }); // 'once: true' asegura que el listener se ejecute solo una vez

            imageUrlInput.value = ''; // Limpia el campo de entrada
            deselectAllImages(); // Deselecciona cualquier imagen previa al añadir una nueva
        } else {
            console.warn('La URL de la imagen no puede estar vacía.');
            // Aquí podrías mostrar un mensaje al usuario en la interfaz
        }
    });

    /**
     * Manejador de eventos para eliminar la imagen seleccionada.
     */
    deleteImageButton.addEventListener('click', () => {
        if (selectedImageWrapper) { // Si hay una imagen seleccionada
            // Añade la clase 'removing' para la animación de eliminación
            selectedImageWrapper.classList.add('removing');

            // Espera a que termine la animación antes de eliminar la imagen del DOM
            selectedImageWrapper.addEventListener('animationend', () => {
                imageGallery.removeChild(selectedImageWrapper); // Elimina la imagen del DOM
                selectedImageWrapper = null; // Reinicia la variable de imagen seleccionada
            }, { once: true }); // 'once: true' asegura que el listener se ejecute solo una vez
        } else {
            console.warn('Ninguna imagen seleccionada para eliminar.');
            // Aquí podrías mostrar un mensaje al usuario en la interfaz
        }
    });

    /**
     * Agrega el evento de clic a la galería para manejar la selección de imágenes.
     * Se usa delegación de eventos para capturar clics en imágenes ya existentes y futuras.
     */
    imageGallery.addEventListener('click', handleImageSelection);

    /**
     * Manejador de eventos para atajos de teclado.
     * Permite eliminar la imagen seleccionada con las teclas 'Delete' o 'Backspace'.
     */
    document.addEventListener('keydown', (event) => {
        // Verifica si la tecla presionada es 'Delete' o 'Backspace'
        if (event.key === 'Delete' || event.key === 'Backspace') {
            // Evita el comportamiento por defecto si estamos en un campo de entrada
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
                return; // No hacer nada si el foco está en un campo de texto
            }
            if (selectedImageWrapper) {
                // Simula un clic en el botón de eliminar imagen
                deleteImageButton.click();
                event.preventDefault(); // Evita el comportamiento por defecto del navegador (ej. navegar hacia atrás)
            }
        }
    });
});