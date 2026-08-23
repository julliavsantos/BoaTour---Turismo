document.querySelectorAll(".mostrar-senha").forEach(botao => {

    botao.addEventListener("click", () => {

        const id = botao.dataset.target;
        const campo = document.getElementById(id);

        if (campo.type === "password") {
            campo.type = "text";
            botao.textContent = "🙈";
        } else {
            campo.type = "password";
            botao.textContent = "👁";
        }

    });

});