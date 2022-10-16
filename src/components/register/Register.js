import { useState } from "react"
import styled from "styled-components"
import Header from "../home/Header"
import Logo from "../../img/Logo.svg"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Register(){

    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")

    let navigate = useNavigate()

    async function SendRegister(event){
        event.preventDefault()

        if(password === confirmPassword) {

            try{
                await axios.post("http://localhost:4000/signup", {
                    name: name,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword   
            });
            
            navigate("/signin")
            
            }catch {
              console.log("deu ruim na requisição")
            }
    
        }else {
            console.log("As senhas não coencidem")
        } 
            
    }

    return (
        <>
            <Header/>
            <StyledRegister>
                <img src={Logo}/>
                <form onSubmit={SendRegister}>
                
                <input required type="text" id="campoName" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} /><br/>
                
                <input required type="email" id="campoEmail" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
                
                <input required type="password" id="campoPassword" placeholder="senha" value={password} onChange={e => setPassword(e.target.value)} /><br/>

                <input required type="password" id="campoConfirmPassword" placeholder="Confime a senha" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} /><br/>
                
                <button>Cadastra</button>
            </form>
            </StyledRegister>
        </>      
    )
}


const StyledRegister = styled.div`
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