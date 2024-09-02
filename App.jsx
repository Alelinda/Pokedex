import React, { useEffect, useState } from 'react';
import './App.css';

const Pokedex = () =>{
    const [entrada, setEntrada] = useState('')
    const [pokemon, setPokemon] = useState(null)
    const [contador, setContador] = useState(0)

    const buscar = () => {
        /*e o tamanho máximo da entrada for menor que um então coloque o contador, caso contrário
        coloque a entrada convertida em caracteres minusculos, essa var serve para dizer que a 
        solicitação vai ser oq o cliente digitar caso seja maior q 1 caractere.*/
        const solicitacao = entrada.length < 1 ? contador : entrada.toLocaleLowerCase()
        const url =`https://pokeapi.co/api/v2/pokemon/${solicitacao}`;

        /*FETCH:serve para puxar o conteúdo de uma API, ele entra 'online' no link 
        e trás para nos o conteudo deles, o then é oq o código faz dps*/

        fetch(url).then(resposta => resposta.json()) //converte para formato json
          .then(dados => {
            setPokemon(dados); //atualiza o pokemon
            setContador(dados.id) //atualiza o contador para valor do id do pokemon
            setEntrada('') //limpa o campo de entrada
          })
          .catch(erro =>{ //caso de erro
            setPokemon(null);
            console.log('Pokemon não encontrado', erro);
          }
        );
    };

    const proximo = () =>{
        setContador(prox => prox +1); //contador igual a ele mesmo +1
    }
    const anterior = () =>{
        setContador(antes => antes -1); //contador igual a ele mesmo -1
    }

    useEffect(() => {
        buscar()
    }, [contador])

    return(
        <div className='painel'>
             <div className='frontal'>
                <img src="https://cdn3.iconfinder.com/data/icons/pokemon-go-3/512/pokemon_go_play_game_cinema_film_movie-512.png" alt="pokebola" id='pokebola'/>
                 <h1>Pokemon</h1>
             </div>

             <div id="tela">
                {pokemon && (
                    <>
                    <h2>{pokemon.name}</h2>

                    {/*gif do pokemon frente*/}
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`} alt={pokemon.name} className='pokemon'/>

                    {/*gif do pokemon costas*/}
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${pokemon.id}.gif`} alt={pokemon.name} className='pokemon'/>

                    <p>Id: {pokemon.id} </p>

                    {/*dentro da var pokemon tem as propriedades json da API 
                    que baixamos, então "type" e "abilities" são keys da API*/}
                    <p>Tipo: {pokemon.types.map(type => type.type.name).join(',')}</p>
                    <p>Habilidades: {pokemon.abilities.map(ability => ability.ability.name).join(',')}</p>

                    </>
                )}

                 {!pokemon && <p>Pokemon não encontrado!</p>}
            </div>

            <input type='text' id='entrada' value={entrada} onChange={(e) => setEntrada(e.target.value)} placeholder='Digite o pokemon...' />
            <button onClick={buscar}>Pesquisar</button>
            <br/>
            <button onClick={anterior}>Anterior</button>
            <button onClick={proximo}>Próximo</button>
            
        </div>
    )
};



export default Pokedex;