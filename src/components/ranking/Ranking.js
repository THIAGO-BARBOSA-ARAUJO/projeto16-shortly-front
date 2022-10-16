import Header from "../home/Header"
import styled from "styled-components"
import logo from "../../img/Logo.svg"
import trofeu from "../../img/trofeu.svg"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Ranking(){

    const [ rankings, setRankings ] = useState([])
    const name = localStorage.getItem("name")
    let c = 1

    async function buscaRanking(){
        try {
            const resp = await axios.get("http://localhost:4000/ranking")
            console.log(resp.data)
            setRankings(resp.data)              
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        buscaRanking()
    }, [])

    return (
        <>
            <Header/>
            <StyledRanking>
                <img src={logo}/>
                <div className="raking">
                    <div className="trofeu">
                        <img src={trofeu} />
                        <p>Ranking</p>
                    </div>
                        {rankings.length > 0 
                        ?  <div className="clas">{
                                rankings.map((ranking) => (
                                    <p>{c++}. {ranking.name} - {ranking.linksCount} links - {ranking.visitCount} visualizações</p>
                            ))
                        }   </div> 
                        : "Não há lista de Ranking"}
                </div>
                {name ? ("") : (<h2>Crie sua conta para usar nosso serviço!</h2>)}
            </StyledRanking>
        </>
    )
}

const StyledRanking = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: white;
    padding-top: 70px;
    > img {
        margin-top: 20px;
        margin-bottom: 70px;
    }

    .trofeu {
        display: flex;
        gap: 20px;
        justify-content: center;
        align-items: center;
    }

    .trofeu > p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 700;
        font-size: 36px;
        line-height: 45px;
        color: #000000;
    }

    .clas {
        margin-top: 30px;
        min-width: 1017px;
        min-height: 241px;
        border: 1px solid rgba(120, 177, 89, 0.25);
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 24px 24px 0px 0px;
        padding: 20px 40px;
    }

    .clas p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 500;
        font-size: 22px;
        line-height: 28px;
        color: #000000;
    }

    h2 {
        
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 700;
        font-size: 36px;
        line-height: 45px;
        color: #000000;
        margin: 50px 0;
    }

`