document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Funcionalidad de Pestañas (Tabs) ---
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.getAttribute('data-tab');

            tabLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            link.classList.add('active');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });


    // --- 2. Modo Oscuro (Dark Mode) ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Cargar preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Guardar preferencia
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- 3. Copiar CV Corto ---
    window.copyCV = function() {
        const cvContent = document.getElementById('tab-cv').innerText;
        
        // Crear un textarea temporal para copiar el texto
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = cvContent;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        
        try {
            document.execCommand('copy');
            alert('¡CV resumido copiado al portapapeles!');
        } catch (err) {
            console.error('Error al copiar CV:', err);
        }
        
        document.body.removeChild(tempTextArea);
    };


    // --- 4. Chatbot Simulado ---
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeBtn = document.querySelector('.close-btn');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const messagesContainer = document.getElementById('chatbot-messages');

    // Mostrar/Ocultar Chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('hidden');
    });

    closeBtn.addEventListener('click', () => {
        chatbotWindow.classList.add('hidden');
    });

    // Enviar mensaje del usuario
    const sendMessage = () => {
        const userText = userInput.value.trim();
        if (userText === '') return;

        // Añadir mensaje del usuario
        addMessage(userText, 'user');
        userInput.value = '';

        // Simular respuesta del bot
        setTimeout(() => {
            const botResponse = getBotResponse(userText);
            addMessage(botResponse, 'bot');
        }, 1000);
    };

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Función para añadir mensajes al contenedor
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        
        // Hacer scroll automático hacia el último mensaje
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Lógica de respuesta simple del Bot
    function getBotResponse(input) {
        const text = input.toLowerCase();

        if (text.includes('habilidades') || text.includes('skills')) {
            return "Las habilidades clave son Python, Java, JavaScript y el manejo de software de oficina (Word, Excel).";
        }
        if (text.includes('ciclo') || text.includes('estudio')) {
            return "Actualmente estoy cursando el 4to ciclo de Computación Informática.";
        }
        if (text.includes('funciones') || text.includes('experiencia')) {
            return "Mis funciones incluyen verificar reglas de juego, reportar errores y validar formatos de prueba.";
        }
        if (text.includes('contacto')) {
            return "Puedes encontrar la información de contacto en la pestaña 'Contacto'. ¡Te espero!";
        }
        if (text.includes('proactivo') || text.includes('disponibilidad')) {
            return "Sí, me defino como joven proactivo y tengo disponibilidad para el horario de oficina.";
        }
        if (text.includes('gracias') || text.includes('adios')) {
            return "¡Un placer ayudarte! No dudes en revisar las pestañas para más detalles.";
        }
        return "Disculpa, solo puedo responder preguntas básicas sobre el perfil (habilidades, ciclo, funciones, contacto).";
    }
    
    // --- 5. Funcionalidad de saludo (Mantiene la función anterior) ---
    const showMessageBtn = document.getElementById('show-message-btn');
    const messageArea = document.getElementById('message-area');

    if (showMessageBtn) {
        showMessageBtn.addEventListener('click', () => {
            if (messageArea.style.display === 'none' || messageArea.style.display === '') {
                messageArea.style.display = 'block';
                showMessageBtn.textContent = 'Ocultar Mensaje';
            } else {
                messageArea.style.display = 'none';
                showMessageBtn.textContent = '¡Clic para saludar!';
            }
        });
    }

    // --- 6. Efecto de "Highlight" en Habilidades (Mantiene la función anterior) ---
    const skillsList = document.getElementById('skills-list');
    
    if (skillsList) {
        skillsList.addEventListener('click', (event) => {
            const skillItem = event.target;
            if (skillItem.tagName === 'LI' && skillItem.parentElement.id === 'skills-list') {
                skillItem.style.backgroundColor = '#ffc107'; 
                skillItem.style.color = '#333';

                setTimeout(() => {
                    skillItem.style.backgroundColor = ''; 
                    skillItem.style.color = '';
                }, 300);
            }
        });
    }

});
