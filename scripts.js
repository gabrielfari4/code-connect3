const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('image-upload');

uploadBtn.addEventListener('click', () => {
    inputUpload.click()
})

const mainImage = document.querySelector('.main-imagem');
const imageName = document.querySelector('.container-imagem-nome p');

inputUpload.addEventListener('change', async (event) => {
    let file = event.target.files[0];
    if (!file.type.match('image/png') && !file.type.match('image/jpeg')) {
        alert('Por favor, selecione uma imagem PNG ou JPEG.');
        inputUpload.value = ''; // Reseta o valor do input
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 2MB.');
        inputUpload.value = ''; // Reseta o valor do input
        return;
    }

    if (file) {
        try {
            const fileContent = await readFileContent(file);
            mainImage.src = fileContent.url;
            imageName.textContent = fileContent.nome;
        } catch (e) {
            console.error(e)
        }
    }
    
    console.log(file);
});

const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: file.name})
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${file.name}`)
        } 

        leitor.readAsDataURL(file)
    });
}

const inputTags = document.getElementById('categoria');
const tagsList = document.getElementById('lista-tags')

inputTags.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const tagText = inputTags.value.trim();
        if (tagText !== "") {
            const newTag = document.createElement('li');
            newTag.innerHTML = `<p>${tagText}</p> <img src="./img/close-black.svg" class="remove-tag"/>`
            tagsList.appendChild(newTag);
            inputTags.value = "";
        }
    }
})

tagsList.addEventListener('click', (e) => {
    if (e.target.classList.contains("remove-tag")) {
        const toRemoveTag = e.target.parentElement;
        tagsList.removeChild(toRemoveTag);
    }
})