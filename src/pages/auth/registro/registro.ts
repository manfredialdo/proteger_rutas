// Tres saltos hacia atrás (../../../) para llegar a src/
import { getUsuarios, saveListaUsuarios } from "../../../utils/localStorage";

const form = document.getElementById("formRegistro") as HTMLFormElement;

if (form) {
    form.addEventListener("submit", (e: Event) => {
        e.preventDefault();

        const emailInput = document.getElementById("email") as HTMLInputElement;
        const passwordInput = document.getElementById("password") as HTMLInputElement;

        const nuevoUsuario = {
            email: emailInput.value.trim().toLowerCase(),
            password: passwordInput.value,
            role: 'client',
            loggedIn: false
        };

        const listaUsuarios = getUsuarios();

        // Validación de duplicados
        const existe = listaUsuarios.some((u: any) => u.email === nuevoUsuario.email);
        
        if (existe) {
            alert("Este correo ya está registrado");
            return; // Aquí corta la ejecución
        }

        // Si no existe, guardamos
        listaUsuarios.push(nuevoUsuario);
        saveListaUsuarios(listaUsuarios);

        alert("Usuario registrado con éxito");
        form.reset();
    });
}