import { useState } from "react"
import styled from "styled-components"
import Header from "../home/Header"
import Logo from "../../img/Logo.svg"
import { useNavigate } from "react-router-dom"
import axios from "axios"


export default function Login(){

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    let navigate = useNavigate()

    async function SendLogin(event){
        event.preventDefault()

        try{
            const resp = await axios.post("http://localhost:4000/signin", {
                email: email,
                password: password,  
        });
        
        console.log(resp.data)
        localStorage.setItem("token", resp.data.token)
        localStorage.setItem("name", resp.data.name)
        navigate("/")
        
        }catch {
          console.log("deu ruim na requisição")
        }
    } 
   

    return (
        <>
            <Header/>
            <StyledLogin>
                <img src={Logo}/>
                <form onSubmit={SendLogin}>
                
                <input required type="email" id="campoEmail" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
                
                <input required type="password" id="campoPassword" placeholder="senha" value={password} onChange={e => setPassword(e.target.value)} /><br/>

                <button>Entrar</button>
            </form>
            </StyledLogin>
        </>      
    )
}


const StyledLogin = styled.div`
    min-height: 100vh;
    padding-top: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
    }

    form input {
        min-width: 769px;
        min-height: 60px;
        //background: #FFFFFF;
        border: 1px solid rgba(120, 177, 89, 0.25);
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 12px;
        margin: 10px 0;
        padding-left: 10px;

        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #9C9C9C;
        outline: none;
    }

    

    form button {
        width: 182px;
        height: 60px;
        background: #5D9040;
        border-radius: 12px;
        cursor: pointer;
        margin-top: 20px;

        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 18px;
        color: #FFFFFF;
    }
`