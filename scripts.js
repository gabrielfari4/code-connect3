const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('image-upload');

uploadBtn.addEventListener('click', () => {
    inputUpload.click()
})

inputUpload.addEventListener('change', function(event) {
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
    
    console.log(file);
});