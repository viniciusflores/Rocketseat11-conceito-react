import React, {useEffect,useState,setState} from "react";

import api from './services/api';

import "./styles.css";

function App(){
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response=> {
      setRepositories(response.data)
    })
  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: 'video-maker',
      url:'https://github.com/viniciusflores/video-maker',
      techs: ['JS','googleApis', 'watsonIBM']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if(response.status===204){
      let abc =[]
      repositories.map(r => {
        if((r.id !== id)){
          abc.push(r)
        }
      })
      setRepositories(abc)
    }
  }
  
    return (
      <div>
        <ul data-testid="repository-list">
          {repositories.map(repository =>(
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
          }
        </ul>

        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    )
  
}
export default App