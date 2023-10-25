const getUsers = async() => {
    try {
        const response = await fetch('http://localhost:5000/users/', {
            method: 'GET'
        });

        if(!response.ok){
            throw Error 
        };

        const result = await response.json();

        console.log('getUsres', result);
        return result;
    }
        catch(error) {
            console.log(error);
    }
}

function populateTable(users) {
    const front = document.querySelector('#front');
    console.log('Dentro: ', users);
    
    users.forEach(usuario => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.name}</td>
            <td>${usuario.age}</td>
        `;
        front.appendChild(fila);
    });
}

const openModal = () => {
    ('#modal').modal('show');
}


async function app() {
    const users = await getUsers();
    populateTable(users);
}

app()