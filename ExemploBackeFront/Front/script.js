const lista = document.getElementById('lista');
const botaoListar = document.getElementById('botaoListar');

botaoListar.addEventListener('click', listarCursos);

async function listarCursos() {

    const resposta = await fetch('http://localhost:3023/cursos');

    const cursos = await resposta.json();

    lista.innerHTML = '';

    cursos.forEach(curso => {

        lista.innerHTML += `
            <li>
                ${curso.id} - ${curso.nome}
            </li>
        `;

    });

}