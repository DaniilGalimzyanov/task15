export function formInit(formSelector) {
    let message = {
        loading: "Загрузка",
        success: "Спасибо!",
        failure: "Что-то пошло не так..."
    }

    let form = document.querySelector(formSelector),
        input = form.getElementsByTagName('input'),
        validInput = input.phone,
        validInputValue = '',
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    validInput.addEventListener('keyup', function(event){       
        if (/[()+]/.test(event.key) || /[0-9]/.test(event.key)){
            validInputValue = this.value;
        } else if(/[\D]/.test(event.key) && (event.key.toLowerCase() != 'backspace' && event.key.toLowerCase() != 'delete' && event.key != 'Del')){
            this.value = validInputValue;
        } else {
            validInputValue = this.value;
        }
        validInputValue = this.value;
    });

    form.addEventListener('submit', function(event){
        event.preventDefault();
        form.appendChild(statusMessage);
        
        sendData()
            .then(waitng => statusMessage.innerHTML = waitng)
            .catch(error => statusMessage.innerHTML = error)
            .then(clearInputs);
    });

    function clearInputs() {
        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    }
    
    function sendData() {
        return new Promise(function(resolve, reject){
            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            let formData = new FormData(form),
                obj = {};

            // console.log(formData.phone);
            // for(let key of formData) {
            //     obj[key] = formData[key];
            // }
            formData.forEach(function(value, key) {
                obj[key] = value;
            });

            if (obj.phone.indexOf('+') != 0) {
                reject('Вводить можно только цифры, начиная с \'+\'');
            }

            let json = JSON.stringify(obj);
            request.send(json);

            request.addEventListener('readystatechange', function(){
                if (request.readyState <= 4 && request.status == 200) {
                    resolve(message.success);
                } else {
                    reject(message.failure);
                }
                
                
            });
        });
    }
}