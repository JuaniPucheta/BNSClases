const getUsers = async () => {
	try {
		const response = await fetch("http://localhost:5000/users/", {
			method: "GET",
		});

		if (!response.ok) {
			throw Error;
		}

		const result = await response.json();

		// console.log('getUsers', result);
		return result;
	} catch (error) {
		console.log(error);
	}
};

function populateTable(users) {
	const front = document.querySelector("#front");
	// console.log('Dentro: ', users);

	users.forEach((usuario) => {
		const fila = document.createElement("tr");
		fila.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.name}</td>
            <td>${usuario.age}</td>
            <td>
                <button class="btn btn-warning" id="botonEditar" onclick="openModalEditar()" data-bs-id=${usuario.id}>
                    <i class="bi bi-pencil-square"></i>
                     Editar
                </button>
                <button class="btn btn-danger" id="botonEliminar" onclick="">
                    <i class="bi bi-trash"></i>
                     Eliminar
                </button>
            </td>
        `;
		front.appendChild(fila);
	});
}

function openModalAgregar() {
	$("#modalUsuario").modal("show");
	const botonGuardar = document.querySelector("#botonGuardar");
	botonGuardar.addEventListener("click", async () => {
		let name = document.querySelector("#name");
		let age = document.querySelector("#age");
		const user = {
			name: name.value,
			age: age.value,
		};
		const result = await postUser(user);
		console.log(result);
		$("#modalCrearUsuario").modal("hide");
		window.location.reload();
	});
}
async function postUser(user) {
	try {
		const response = await fetch("http://localhost:5000/users/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		const result = await response.json();
		console.log("Ok: ", result);
	} catch (error) {
		console.log("Error: ", error);
	}
}

async function app() {
	const users = await getUsers();
	populateTable(users);
}

app();
