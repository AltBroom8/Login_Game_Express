const url = 'http://localhost:3000'
const game = 'http://localhost:3000/game'
let cambio = false;
let miboton = document.getElementById("boton1");
let login = document.getElementById("login");
let registro = document.getElementById("register");
let registrocheck = [false, false,false,false];

miboton.addEventListener("click",()=>{
    if (cambio==false){
        var animation = login.animate([
            { opacity: '1' },
            { opacity: '0' }
        ], {
            duration: 1000,
            easing: 'ease-in-out'
        });
        animation.onfinish = function () {
            login.style.opacity = '0';
            login.classList.add("invisible");
        };
        registro.classList.remove("invisible");
        registro.style.opacity = '0';
        var animation2 = registro.animate([
            { opacity: '0' },
            { opacity: '1' }
        ], {
            duration: 1000,
            easing: 'ease-in-out'
        });
        animation2.onfinish = function () {
            registro.style.opacity = '1';
            
        };
        setTimeout(()=>{
            var cosa = document.getElementsByClassName("campos");
            for(var element of cosa){
            element.value = '';
            }
        },1000);
        
        
        cambio=true;
    }
});
miboton3 = document.getElementById("boton3");
miboton3.addEventListener("click", ()=>{
    console.log('holaaa');
        var animation = registro.animate([
            { opacity: '1' },
            { opacity: '0' }
        ], {
            duration: 1000,
            easing: 'ease-in-out'
        });
        animation.onfinish = function () {
            registro.style.opacity = '0';
            registro.classList.add("invisible");
        };
        login.classList.remove("invisible");
        login.style.opacity = '0';
        var animation2 = login.animate([
            { opacity: '0' },
            { opacity: '1' }
        ], {
            duration: 1000,
            easing: 'ease-in-out'
        });
        animation2.onfinish = function () {
            login.style.opacity = '1';
            
        };
        setTimeout(()=>{
            var cosa = document.getElementsByClassName("campos");
            for(var element of cosa){
            element.value = '';
            element.style.borderBottom= '0.05vw solid white';
            }
            var errores = Array.from(document.getElementsByTagName('h5'));
            errores.forEach(function (elemento) {
            elemento.remove();}
            );
            var general =  Array.from(document.getElementsByTagName('h2'));
            general.forEach((element)=>{
                element.remove();
            })
        },1000);
        cambio=false;
});
let loginMsg;
miboton2 = document.getElementById("boton2");
miboton2.addEventListener("click", async ()=>{
    if(document.contains(loginMsg)){
        loginMsg.remove();
    }
    var cosa = document.getElementsByClassName("campos");
    var user = cosa[0];
    var pswd = cosa[1];
    var entra = await validarLogin(user.value, pswd.value);
    var errores = Array.from(document.getElementsByTagName('h5'));
    errores.forEach(function (elemento) {
        elemento.remove();
    });


    
    console.log('entra es '+entra);
    if(user.value===''){
        var errorvacio = document.createElement('h5');
        errorvacio.classList.add('error1');
        errorvacio.innerText = 'You can\'t leave this field empty';
        user.parentNode.insertBefore(errorvacio, user.nextSibling);
        entra = false;
    }
    
    if(pswd.value===''){
        var errorvacio = document.createElement('h5');
        errorvacio.classList.add('error2');
        errorvacio.innerText = 'You can\'t leave this field empty';
        var padre = document.getElementById('rellenalogin');
        padre.appendChild(errorvacio);
        entra = false;
    }
    
    if(entra){
        loginMsg = document.createElement('h2');
        loginMsg.classList.add('loginMsg');
        let padre = document.getElementById('login');
        padre.appendChild(loginMsg);
        loginMsg.style.color = 'green';
        loginMsg.innerText = 'Login granted';
        setTimeout(() => {
            window.location.href = game; 
        },1000);
    }else{
        loginMsg = document.createElement('h2');
        loginMsg.classList.add('loginMsg');
        let padre = document.getElementById('login');
        padre.appendChild(loginMsg);
        loginMsg.style.color = 'red';
        loginMsg.innerText = 'Login denied'
    }
    let opacity = 0.2;
    let marginTop = 6;
    loginMsg.style.opacity = '0.2';
    loginMsg.style.marginTop = `${marginTop}vh`;
    let animationInterval = setInterval(() => {
        if (opacity<1){
            opacity += 0.1; 
        }
        marginTop -= 0.2; 

        loginMsg.style.opacity = opacity;
        loginMsg.style.marginTop = `${marginTop}vh`;

        // Verificar condiciones de fin de animación
        if (opacity >= 1 && marginTop <= 2) {
            clearInterval(animationInterval); // Detener el intervalo
        }
    }, 30);


});
let emailAviso;
let emailregistro = document.getElementById('email');
emailregistro.addEventListener('input', async () => {
    registrocheck[0] = false;
    if (!document.body.contains(emailAviso)) {
        // Si no existe, créalo y agrégalo al DOM
        emailAviso = document.createElement('h5');
        emailAviso.classList.add('emailAviso');
        emailregistro.parentNode.insertBefore(emailAviso, emailregistro.nextSibling);
        var padre = document.getElementById('rellenaregistro');
        padre.appendChild(emailAviso);
    }else{
        emailAviso.querySelector('.emailAviso');
    }

    regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const correoExiste = await checkcorreo(emailregistro.value);
    if(emailregistro.value!=''){
        emailregistro.style.borderBottom= '0.15vw solid #ced4da';
        if(!emailregistro.value.match(regex)){
            emailAviso.style.color = 'red';
            emailregistro.style.borderColor='red';
            emailAviso.innerText = 'Invalid email';
            
        }else if (correoExiste) {
            emailAviso.innerText = 'This email already exists';
            emailAviso.style.color = 'red';
            emailregistro.style.borderColor='red';
            console.log('Ya existe en la base de datos');
        }else{
            emailAviso.innerText = 'You can use this email'
            emailAviso.style.color = 'green';
            emailregistro.style.borderColor='green';
            registrocheck[0] = true;
        }
    }
    else{
        emailAviso.innerText='Don\'t leave this field empty';
        emailAviso.style.color = 'white';
        emailregistro.style.borderBottom= '0.05vw solid white';
        emailregistro.style.borderColor='white';
    }
});

const checkcorreo = async(datos) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: datos,
                                    comprueba: 'email'}),
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud al backend');
        }

        const result = await response.json(); // Parsea la respuesta como JSON

        // Si la respuesta es un booleano, retórnalo directamente
        if (typeof result.success === 'boolean') {
            console.log(result.success);
            return result.success;
        } else {
            console.error('La respuesta del servidor no es un booleano:', result);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
};

/*REGISTRO DE UN USUARIO*/
let userAviso;
let usernameRegistro = document.getElementById('username');
usernameRegistro.addEventListener('input', async () => {
    registrocheck[1] = false;
    const userExiste = await checkusername(usernameRegistro.value);
    if (userExiste){
        console.log('resultado: '+userExiste);
        if (!document.body.contains(userAviso)) {
            
            userAviso = document.createElement('h5');
            userAviso.classList.add('userAviso');
            usernameRegistro.parentNode.insertBefore(userAviso, usernameRegistro.nextSibling);
            var padre = document.getElementById('rellenaregistro');
            padre.appendChild(userAviso);
        }else{
            userAviso.querySelector('.userAviso');
        }
        usernameRegistro.style.borderBottom= '0.15vw solid red';
        userAviso.innerText = 'The current user already exists';
    }else if(usernameRegistro.value.length<5 && usernameRegistro.value.length>0){
        if (!document.body.contains(userAviso)) {
            userAviso = document.createElement('h5');
            userAviso.classList.add('userAviso');
            usernameRegistro.parentNode.insertBefore(userAviso, usernameRegistro.nextSibling);
            var padre = document.getElementById('rellenaregistro');
            padre.appendChild(userAviso);
        }else{
            userAviso.querySelector('.userAviso');
        }
        usernameRegistro.style.borderBottom= '0.15vw solid red';
        userAviso.innerText = 'The user must have at least 5 characters';
    }else{
        if (document.body.contains(userAviso)) {
            userAviso.parentNode.removeChild(userAviso);
        }
        usernameRegistro.style.borderBottom= '0.05vw solid green';
        if (usernameRegistro.value.length==0){
            usernameRegistro.style.borderBottom= '0.05vw solid white';
        }else{
            registrocheck[1] = true;
        }
    }

});

const checkusername = async(user)=>{
    try{
        const response = await fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: user,
                                    comprueba:'user'}),
        })
        if (!response.ok) {
            throw new Error('Error en la solicitud al backend');
        }
        const result = await response.json(); // Parsea la respuesta como JSON

        // Si la respuesta es un booleano, retórnalo directamente
        if (typeof result.success === 'boolean') {
            console.log(result.success);
            return result.success;
        } else {
            console.error('La respuesta del servidor no es un booleano:', result);
            return null;
        }
    }catch(error){
        console.error('Error:', error);
        throw error;
    }
}
/*primera constraseña*/
let ps1Aviso;
let password1 = document.getElementById('password1');
let ps2Aviso;
let password2 = document.getElementById('password2');
password1.addEventListener('input',() => {
    registrocheck[2] = false;
    const isLengthValid = password1.value.length >= 8;
    const hasUppercase = /[A-Z]/.test(password1.value); 
    const hasLowercase = /[a-z]/.test(password1.value);
    const hasDigit = /\d/.test(password1.value);
    const hasSpecialCharacter = /[!@#$%^&*()\-_+=]/.test(password1.value);
    let dispara = false;
    let texto = '';
    console.log('el valor es '+password1.value+' y la condicion de caracteres especiales es '+hasSpecialCharacter);
    if(password1.value===''){
        dispara = false;
    }else if(!isLengthValid){
        dispara = true;
        texto = 'The password must be at least 8 characters long'
    }else if(isLengthValid && !hasUppercase){
        dispara = true;
        texto = 'The password must have at least one uppercase character'
    }else if(isLengthValid && hasUppercase && !hasLowercase){
        dispara = true;
        texto = 'The password must have at least one lowercase character'
    }else if(isLengthValid && hasUppercase && hasLowercase && !hasDigit){
        dispara = true;
        texto = 'The password must have at least one digit'
    }else if(isLengthValid && hasUppercase && hasLowercase && hasDigit && !hasSpecialCharacter){
        dispara = true;
        texto = 'The password must have at least one special character'
    }else{
        dispara = false;
    }

    if(dispara){
        if (!document.body.contains(ps1Aviso)) {
            // Si no existe, créalo y agrégalo al DOM
            ps1Aviso = document.createElement('h5');
            ps1Aviso.classList.add('ps1Aviso');
            password1.parentNode.insertBefore(ps1Aviso, password1.nextSibling);
            var padre = document.getElementById('rellenaregistro');
            padre.appendChild(ps1Aviso);
            
        }else{
            ps1Aviso.querySelector('.ps1Aviso');
        }
        password1.style.borderBottom= '0.15vw solid red';
        ps1Aviso.innerText = texto;
    }else{
        password1.style.borderBottom= '0.05vw solid green';
        if(password1.value===''){
            password1.style.borderBottom= '0.05vw solid white';
        }else{
            registrocheck[2] = true;
        }
        if (document.body.contains(ps1Aviso)) {
            ps1Aviso.parentNode.removeChild(ps1Aviso);
        }
    }
});

password2.addEventListener('input',()=>{
    compruebaP2();

})

const compruebaP2 = () => {
    registrocheck[3] = false;
    let texto = 'The second password field must be the same as the first one'
    if(password2.value!=password1.value && password2.value!=""){
        if (!document.body.contains(ps2Aviso)) {
            // Si no existe, créalo y agrégalo al DOM
            ps2Aviso = document.createElement('h5');
            ps2Aviso.classList.add('ps2Aviso');
            password2.parentNode.insertBefore(ps2Aviso, password2.nextSibling);
            var padre = document.getElementById('rellenaregistro');
            padre.appendChild(ps2Aviso);
            
        }else{
            ps2Aviso.querySelector('.ps2Aviso');
        }
        password2.style.borderBottom= '0.15vw solid red';
        ps2Aviso.innerText = texto;
    }else{
        password2.style.borderBottom= '0.05vw solid green';
        if(password2.value.length===0){
            password2.style.borderBottom= '0.05vw solid white';
        }else{
            registrocheck[3] = true;
        }
        if (document.body.contains(ps2Aviso)) {
            ps2Aviso.parentNode.removeChild(ps2Aviso);
        }
    }
}
//Botones de mostrar contraseña
let muestra1 = document.getElementById('muestra');
let imgmuestra1 = document.getElementById('miImagen');
muestra1.addEventListener("click",async () => {
    if(password1.type==="password"){
        password1.type="text";
        imgmuestra1.src='img/cerrado.png'
    }else{
        password1.type="password";
        imgmuestra1.src='img/abierto.png';
    }
})

let muestra2 = document.getElementById('muestra2');
let imgmuestra2 = document.getElementById('miImagen2');
muestra2.addEventListener("click",() => {
    if(password2.type==="password"){
        password2.type="text";
        imgmuestra2.src='img/cerrado.png'
    }else{
        password2.type="password";
        imgmuestra2.src='img/abierto.png';
    }
})
let avisoRegistro;
let miboton4 = document.getElementById('boton4');
miboton4.addEventListener("click",async () =>{
    let todocorrecto = true;
    let ingresa = false;
    for(element of registrocheck){
        console.log(element+' is '+element.value)
        if (element === false){
            todocorrecto = false;
        }
    }
    if(!document.body.contains(avisoRegistro)){
        avisoRegistro = document.createElement("h2");
        avisoRegistro.classList.add('avisoRegistro');
        var padre = document.getElementById('register');
        padre.appendChild(avisoRegistro);
    }

    if(todocorrecto && password1.value===password2.value){
        console.log('user valido')
        console.log(todocorrecto);
        ingresa=true;
        
        
    }
    let opacity = 0.2;
    let marginTop = 7;
    avisoRegistro.style.opacity = '0.2';
    avisoRegistro.style.marginTop = `${marginTop}vh`;
    let animationInterval = setInterval(() => {
        if (opacity<1){
            opacity += 0.1; 
        }
        marginTop -= 0.2; 

        avisoRegistro.style.opacity = opacity;
        avisoRegistro.style.marginTop = `${marginTop}vh`;

        // Verificar condiciones de fin de animación
        if (opacity >= 1 && marginTop <= 2) {
            clearInterval(animationInterval); // Detener el intervalo
        }
    }, 30);

    if(ingresa) {
        let response = await validarRegistro(emailregistro.value,usernameRegistro.value,password1.value);
        console.log(response);
        if(response===false){
            avisoRegistro.innerText='Access Denied!'
            avisoRegistro.style.color='red';
            usernameRegistro.value = '';
            emailregistro.value = '';
            password1.value='';
            password2.value='';
            registrocheck = [false, false,false,false];
            var errores = Array.from(document.getElementsByTagName('h5'));
            errores.forEach(function (elemento) {
            elemento.remove();}
            );
            emailregistro.style.borderBottom= '0.05vw solid white';
            usernameRegistro.style.borderBottom= '0.05vw solid white';
            password1.style.borderBottom= '0.05vw solid white';
            password2.style.borderBottom= '0.05vw solid white';

        }else{
            avisoRegistro.innerText='Access Granted!'
            avisoRegistro.style.color='green';
            setTimeout(() => {
                window.location.href = game; 
            },1000);
        }
    }
});

const validarRegistro = async(email,user,password)=>{
    try{
        const response = await fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: user,
                                    email: email,
                                    password: password, 
                                    comprueba:'registro'}),
        })
        if (!response.ok) {
            throw new Error('Error en la solicitud al backend');
        }
        const result = await response.json(); // Parsea la respuesta como JSON

        if (typeof result.success === 'boolean') {
            console.log(result.success);
            return result.success;
        } else {
            console.error('La respuesta del servidor no es un booleano:', result);
        }
    }catch(error){
        console.error('Error:', error);
        return false;
        throw error;
    }
}

const validarLogin = async (username,password) => {
    try{
        const response = await fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: username,
                                    password: password, 
                                    comprueba:'login'}),
        })
        if (!response.ok) {
            throw new Error('Error en la solicitud al backend');
        }
        const result = await response.json(); // Parsea la respuesta como JSON

        if (typeof result.success === 'boolean') {
            console.log(result.success);
            return result.success;
        } else {
            console.error('La respuesta del servidor no es un booleano:', result);
        }
    }catch(error){
        console.error('Error:', error);
        return false;
    }
}
/***********************************************************
 * ***********************************************************
 * ***********************************************************
 * HASTA AQUI LA PARTE DE LOGIN Y REGISTRO. AHORA TOCA LA PARTE DE LA TABLA
 * ************************************************************
 * **********************************************************
 */

const getUsers = async () => {
    try{
        const response = await fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comprueba:'tabla'}),
        })
        if (!response.ok) {
            throw new Error('Error en la solicitud al backend');
        }
        const result = await response.json(); // Parsea la respuesta como JSON

        console.log(result.success);
        return result.success;
    }catch(error){
        console.error('Error:', error);
        return null;
    }
}

const rellenaTabla = async ()=>{
    let users = await getUsers();
    console.log(users);
    // Obtener el elemento div con id "resultados"

    // Obtener una colección de todos los div con la clase "unidad" dentro de "resultados"
    const resultadosDiv = document.getElementById("resultados");

    // Obtener una colección de todos los div con la clase "unidad" dentro de "resultados"
    const unidadesDiv = resultadosDiv.getElementsByClassName("unidad");
    for(let i=0;i<users.length;i++){
        const unidad = unidadesDiv[i];
        const jugadorDiv = unidad.querySelector(".jugador");
        const puntosDiv = unidad.querySelector(".puntos");

        // Hacer algo con cada div interno, por ejemplo, cambiar el contenido
        console.log(typeof users[i].username);
        const jugadorSpan = jugadorDiv.querySelector("span");
        const puntosSpan = puntosDiv.querySelector("span");
        jugadorSpan.innerHTML  = users[i].username;
        puntosSpan.innerHTML  = users[i].puntos;
    }
}
rellenaTabla();



