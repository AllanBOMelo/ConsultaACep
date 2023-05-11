function Form () {

    async function dataLoad (e) {
        e.preventDefault();

        try {
            let cepInput = document.getElementById('cep')
            let cepValue = cepInput.value
            const url = `https://viacep.com.br/ws/${cepValue}/json/`;
            const inputSpan = document.getElementById('inputSpan')

            let response = await fetch(url)
            let data = await response.json()
    
            if (inputSpan.classList.contains('warningSpan')) {
                inputSpan.classList.remove('warningSpan')
                inputSpan.style.removeProperty('animation')
            }
            
            if (data.erro) {
                alertPage()
                console.log('Erro na validação do CPF')
                clearInput()
                return
            }
    
            console.log(data)
            localValues(data)

        } catch (erro) {
            console.log('Erro na validação do CPF')
            alertPage()
            clearInput()
        }
        
    
    }

    function alertPage () {
        const inputSpan = document.getElementById('inputSpan')
        inputSpan.classList.add('warningSpan')
        inputSpan.innerHTML = 'Cep Invalido. Tente novamente'

        inputSpan.style.animation = ""
        setTimeout(() => {inputSpan.style.animation = 'shake 200ms linear'})
    }

    function localValues (data) {
        let logradouro = document.getElementById('rua')
        let complemento = document.getElementById('complemento')
        let bairro = document.getElementById('bairro')
        let localidade = document.getElementById('cidade')
        let uf = document.getElementById('estado')
        let ddd = document.getElementById('ddd')

        logradouro.value = data.logradouro
        complemento.value = data.complemento
        bairro.value = data.bairro
        localidade.value = data.localidade
        uf.value = data.uf
        ddd.value = data.ddd
    }

    function clearInput () {
        let inputs = document.querySelectorAll('.input');

        inputs.forEach((input) => {
            input.value = "";
        });
    }

    return (
        <div>

            <div>
                <h1>Cep Searcher</h1>
                <span id="inputSpan">waiting</span>
            </div>
            

            <form className="FormularioEndereco" onSubmit={dataLoad}>
                    
                    <div>
                        <label>Cep:</label>
                        <input type="text" minLength="8" maxLength="8" name="" id="cep" className="input" placeholder="Digite seu Cep..." />
                    </div>

                    <div>
                        <label>Rua:</label>
                        <input type="text" name="" disabled className="input" id="rua" placeholder="..." />
                    </div>

                    <div>
                        <label>Complemento:</label>
                        <input type="text" name="" disabled className="input" id="complemento" placeholder="..." />
                    </div>

                    <div>
                        <label>Bairro:</label>
                        <input type="text" name="" disabled className="input" id="bairro" placeholder="..." />
                    </div>

                    <div>
                        <label>Cidade:</label>
                        <input type="text" name="" disabled className="input" id="cidade" placeholder="..." />
                    </div>

                    <div>
                        <label>Estado:</label>
                        <input type="text" name="" disabled className="input" id="estado" placeholder="..." />
                    </div>


                    <div>
                        <label>DDD:</label>
                        <input type="text" name="" disabled className="input" id="ddd" placeholder="..." />
                    </div>

                    <div className="buttons">
                        <button onClick={clearInput} id="btnLimpar" className="Red">Limpar</button>
                        <button type="submit" id="btnPesquisar" className="Blue">Pesquisar</button>
                    </div>
                    
            </form>
        </div>
    );
};

export default Form;