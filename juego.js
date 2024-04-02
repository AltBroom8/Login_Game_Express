let user = '';
let points = 0;
const obtieneDatos = () => {
    return new Promise((resolve, reject) => {
        fetch('/game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos:', data);
            user = data.user;
            points = data.points;
            console.log('user es ' + user + ' y points es ' + points);
            texto.innerHTML =`The user ${user} has ${points} points in the game`;
            resolve();
        })
        .catch(error => {
            console.error('Error:', error);
            reject(error);
        });
    });
};
obtieneDatos()
.then(() => {
    console.log('La función se ha ejecutado de manera sincrónica');
})
.catch(error => {
    console.error('Error:', error);
});

obtieneDatos();
let texto = document.getElementById('titulo');

