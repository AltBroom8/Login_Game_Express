const bcrypt = require('bcryptjs');

const encripta = async (contraseña)=>{
    try {
        let hashed = await bcrypt.hash(contraseña, 10);
        return hashed;
    } catch (error) {
        console.error('Error al generar el hash:', error);
    }
}

const comprueba = async (contraseña,codigo)=>{
    try{
        let boleano = await bcrypt.compare(contraseña,codigo);
        return boleano;
    }catch (error) {
        console.error('Error al comparar contraseña:', error);
    }
}
module.exports = {
    encripta,
    comprueba
};