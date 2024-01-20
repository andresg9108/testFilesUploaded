const sPredefinedImage = './src/img/load.svg';

const send = (form) => {
    let oFormData = new FormData(form);

    fetch('./php/test1.php', {
      headers: {
        'Accept': 'application/json'
      },
      method: 'POST',
      body: oFormData
    })
    .then((oResponse) => oResponse.json())
    .then((oResponse) => {
        console.log('Ok');
        console.log(oResponse);

        form.reset();

        let oImage = form.querySelector('.image');
        while(oImage !== null){
            oImage.style.backgroundImage = `url('${sPredefinedImage}')`
            oImage = oImage.nextElementSibling;
        }
    })
    .catch((oError) => {
        console.log('Error');
        console.log(oError);
    });

    return false;
}

const changeFile = (oFile) => {
    if(!oFile.files[0]){
        oFile.parentNode.style.backgroundImage = `url('${sPredefinedImage}')`;
        oFile.value = '';
    }else{
        if(!validateFile(oFile)){
            alert('Error en el formato o tamaño del archivo.');
        }else{
            let reader = new FileReader();

            reader.onload = (e) => {
                oFile.parentNode.style.backgroundImage = `url('${e.target.result}')`;
            }

            reader.onerror = (e) => {
                oFile.parentNode.style.backgroundImage = `url('${sPredefinedImage}')`;
                oFile.value = '';
            }

            reader.readAsDataURL(oFile.files[0]);
        }
    }
}

const validateFile = (oFile) => {
    let sName = oFile.files[0].name.toString();
    let iSize = oFile.files[0].size;

    if(!(/.(gif|jpeg|jpg|png|GIF|JPEG|JPG|PNG)$/i.test(sName))){
        return false;
    }

    return true;
}