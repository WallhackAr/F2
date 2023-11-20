let contactos = [];

        function mostrarContactos() {
            const listaContactos = document.getElementById('lista-contactos');
            listaContactos.innerHTML = '';

            contactos.forEach(contacto => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${contacto.nombre}</strong> - ${contacto.telefono}
                                      <button onclick="mostrarFormulario('editar', ${contacto.id})">Editar</button>
                                      <button onclick="eliminarContacto(${contacto.id})">Eliminar</button>`;
                listaContactos.appendChild(listItem);
            });
        }

        function mostrarFormulario(accion, id = null) {
            const formulario = document.getElementById('formulario');
            const tituloFormulario = document.getElementById('formulario-titulo');
            const nombreInput = document.getElementById('nombre');
            const telefonoInput = document.getElementById('telefono');
            const submitButton = document.querySelector('#contacto-form button[type="submit"]');

            if (accion === 'crear') {
                tituloFormulario.textContent = 'Crear Contacto';
                submitButton.textContent = 'Crear';
                nombreInput.value = '';
                telefonoInput.value = '';
            } else if (accion === 'editar') {
                const contacto = contactos.find(c => c.id === id);

                if (contacto) {
                    tituloFormulario.textContent = 'Editar Contacto';
                    submitButton.textContent = 'Guardar';
                    nombreInput.value = contacto.nombre;
                    telefonoInput.value = contacto.telefono;
                }
            }

            formulario.style.display = 'block';
            submitButton.onclick = function(event) {
                event.preventDefault();

                if (accion === 'crear') {
                    crearContacto(nombreInput.value, telefonoInput.value);
                } else if (accion === 'editar') {
                    editarContacto(id, nombreInput.value, telefonoInput.value);
                }

                ocultarFormulario();
            };
        }

        function ocultarFormulario() {
            const formulario = document.getElementById('formulario');
            formulario.style.display = 'none';
        }

        function crearContacto(nombre, telefono) {
            const nuevoContacto = {
                id: Date.now(),
                nombre: nombre,
                telefono: telefono
            };

            contactos.push(nuevoContacto);
            mostrarContactos();
            guardarContactos();
        }

        function editarContacto(id, nuevoNombre, nuevoTelefono) {
            const contacto = contactos.find(c => c.id === id);

            if (contacto) {
                contacto.nombre = nuevoNombre;
                contacto.telefono = nuevoTelefono;
                mostrarContactos();
                guardarContactos();
            }
        }

        function eliminarContacto(id) {
            const indice = contactos.findIndex(c => c.id === id);

            if (indice !== -1) {
                contactos.splice(indice, 1);
                mostrarContactos();
                guardarContactos();
            }
        }

        function guardarContactos() {
            localStorage.setItem('contactos', JSON.stringify(contactos));
        }

        function recuperarContactos() {
            const contactosGuardados = localStorage.getItem('contactos');

            if (contactosGuardados) {
                contactos = JSON.parse(contactosGuardados);
                mostrarContactos();
            }
        }
        recuperarContactos();