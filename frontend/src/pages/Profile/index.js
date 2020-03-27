import React, {useState, useEffect} from 'react'
import logoImg from'../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom' 
import {FiPower} from 'react-icons/fi'
import {FiTrash2} from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

/* nessa parte os dados precisam ser carrregados assim que
    o usuário entrar na pag, então usa-se o useEfect - serve
    pra disparar alguma funcão em algum determinado momento do componente
*/

export default function Profile(){
    
    const [incidents, setIncidents] = useState([]) /* inicents é um array */
    
    const history = useHistory()

    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')
    
    useEffect(()=>{
        api.get('profile',{
            headers: {
                Authorization: ongId,
            }
        }).then(response =>{
            setIncidents(response.data)
        })  
    },[ongId])/* (qual funçao que será executada, quando ) */
    async function handDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch(err){
            alert('Erro ao deletar')
        }
    }

    function handleLogout(){
        localStorage.clear()
        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
    <span>Bem vinda, {ongName}</span>

                <Link to="/incidents/new" className= "button">Cadastrar novo caso</Link>
                <button onClick= {handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
                <ul>
                    {incidents.map(incident=>( /* to retornando diretamente com o pereteses */
                        <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÂO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(incident.value)}</p> {/* classe global, serve pra formataçao */}
                        <button onClick={()=> handDeleteIncident(incident.id)} type="button"> {/* No onclick eu preciso deuma função e se eu uso o () de uma função eu executo ela :( ) */}
                            <FiTrash2 size={20} color= "#a8a8b3"/>
                        </button>
                    </li>
                    ))}
                </ul>
        </div>
    )
}