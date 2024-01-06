
import { useState } from 'react';
import './style.css';
import api from './api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setcep] = useState({});
  
  async function handleSearch(){
    
    if(input === ''){
      alert('prenchar o cep!')
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setcep(response.data)
      setInput("");
    }catch{
      alert('Erro, ao onsultar ');
      setInput("");
    }  
  }
  const buscarBotaoEnter = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    };
  };
  const handleCepChange = (event) =>{
    const newCep = event.target.value.replace(/\D/g,'');
    setInput(newCep.replace(/^(\d{5})(\d{3})$/, '$1-$2'));
  };
  return (
    <div className="App">
    <div>
      <div className="parte_1">

        <h1 className="titulo">Busca CEP</h1>

        <div className="containerInput">
          <input
            type="text"
            id="userInput"
            value={input}
            placeholder="Digite o seu cep."
            onChange={handleCepChange}
            maxLength={9}
            onKeyDown={buscarBotaoEnter}
          />

          <button className="buttonSeach" onClick={handleSearch}> 
            Buscar 
          </button>
          <div className='nomeRua'>
            <h1>{cep.cep}</h1>
            <span>{cep.logradouro} </span>
            <span>{cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade}-{cep.uf}</span>

          </div>
        
        </div>
      
      </div>
    </div>


    </div>
  );
}
export default App;
