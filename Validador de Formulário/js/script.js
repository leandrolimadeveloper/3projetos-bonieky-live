//Parar o evento de submit
const validator = {
    handleSubmit:(event) => {
        event.preventDefault()
        let send = true
        
        let inputs = form.querySelectorAll('input')

        validator.clearErrors()
        
        // Fazer um loop em cada um dos inputs
        for(let i=0; i < inputs.length; i++) {
            let input = inputs[i]
            console.log(input)
            let check = validator.checkInput(input)
            if(check !== true) {
                send = false
                validator.showError(input, check) 
            }
         }

        if(send) {
            form.submit()
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules')

        if(rules !== null) {
            rules = rules.split(',')
            for(let k in rules) {
                let rulesDetails = rules[k].split('=')
                switch(rulesDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return `Campo não pode ser vazio`
                        }
                    break;
                    case 'min':
                        if(input.value.length < rulesDetails[1]) {
                            return 'Campo tem que ter pelo menos ' + rulesDetails[1] + ' caracteres'
                        }
                    break;
                    case 'email':
                        if(input.value != '') {
                            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'Insira um e-mail válido'
                            }
                        }
                }
            }
        }
        
        return true
    },
    showError:(input, error) => {
        input.style.borderColor = '#FF0000'

        // Criar elemento
        let errorElement = document.createElement('div')
        errorElement.classList.add('error')
        errorElement.innerHTML = error
        input.parentElement.insertBefore(errorElement, input.ElementSibling) 
    },
    clearErrors:() => {
        let inputs = form.querySelectorAll('input')
        for(let i=0; i < inputs.length; i++) {
            inputs[i].style = ''
        }
        let errorElements = document.querySelectorAll('.error')
        for (let i=0; i < errorElements.length; i++) {
            errorElements[i].remove()
        }
    }
}

const form = document.querySelector('.validator') 
form.addEventListener('submit', validator.handleSubmit)
