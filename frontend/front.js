
async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function populateTable(user) {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td>
            <button class="btn btn-warning" data-bs-id="${user.id}">
                <i class="bi bi-pencil-square"></i>
                 Editar
            </button>
            <button class="btn btn-danger" data-bs-id="${user.id}">
                <i class="bi bi-trash"></i>
                Eliminar
            </button>
        </td>
    `;

    const editButton = fila.querySelector(".btn-warning");
    const deleteButton = fila.querySelector(".btn-danger");

    editButton.addEventListener("click", () => openModalEditar(user));
    deleteButton.addEventListener("click", () => HandlerEliminar(user.id));

    return fila;
}

function openModalEditar(user) {
    const nameInput = document.querySelector("#name");
    const ageInput = document.querySelector("#age");
    const modal = $("#modalUsuario");
    const guardarButton = document.querySelector("#botonGuardar");

    nameInput.value = user.name;
    ageInput.value = user.age;
    guardarButton.dataset.userId = user.id;

    modal.modal("show");
}

function openModalAgregar() {
    const nameInput = document.querySelector("#name");
    const ageInput = document.querySelector("#age");
    const modal = $("#modalUsuario");
    const guardarButton = document.querySelector("#botonGuardar");

    nameInput.value = '';
    ageInput.value = '';
    delete guardarButton.dataset.userId;

    modal.modal("show");
}

async function loadUsers() {
    const front = document.querySelector("#front");
    try {
        const users = await fetchData("http://localhost:5000/users");
        front.innerHTML = ""; // Limpiar la tabla antes de agregar los datos
        users.forEach((user) => {
            front.appendChild(populateTable(user));
        });
    } catch (error) {
        console.error("Error al cargar usuarios:", error);
    }
}

// Función para guardar un usuario (ya sea crear o editar)
async function saveUser(user) {
    try {
        const requestOptions = {
            method: user.id ? "PUT" : "POST", // Si tiene ID, es una actualizacion; de lo contrario, es una creacion
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        };

        await fetchData(`http://localhost:5000/users/${user.id || ""}`, requestOptions);

        const modal = $("#modalUsuario");
        modal.modal("hide");
        loadUsers();
    } catch (error) {
        console.error("Error al guardar usuario:", error);
    }
}

async function HandlerEliminar(userId) {
    try {
        await fetchData(`http://localhost:5000/users/${userId}`, { method: "DELETE" });
        loadUsers();
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
    }
}

//* Inicializar la aplicación
function initializeApp() {
    const guardarButton = document.querySelector("#botonGuardar");
    guardarButton.addEventListener("click", () => {
        const nameInput = document.querySelector("#name");
        const ageInput = document.querySelector("#age");
        const userId = guardarButton.dataset.userId;
        const user = { id: userId, name: nameInput.value, age: ageInput.value };
        saveUser(user);
    });

    const agregarButton = document.querySelector("#abrirModalAgregar");
    agregarButton.addEventListener("click", openModalAgregar);

    //* Cargar usuarios al iniciar la aplicación
    loadUsers();
}

//* Inicializar la aplicación cuando se carga la página
document.addEventListener("DOMContentLoaded", initializeApp);
