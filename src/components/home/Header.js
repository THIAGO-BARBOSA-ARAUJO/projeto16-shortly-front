import styled from "styled-components"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"

export default function Header(){

    let navigate = useNavigate()
    const location = useLocation()
    const pathName = location.pathname
    const name = localStorage.getItem("name")
    const login = localStorage.getItem("token")

    async function logOut(){
        try {
            await axios.delete("http://localhost:4000/logout", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        localStorage.clear()
        navigate("/")
        window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <StyledHeader login={login} pathName={pathName}>
            {name ? (
                <div className="texts2">
                    <div className="left">
                        <p>Seja bem-vindo(a), {name}!</p>
                    </div>
                    <div className="rigth">
                        <p onClick={() => navigate("/")}>home</p>
                        <p onClick={() => navigate("/ranking")}>Ranking</p>
                        <p onClick={() => logOut()}>Sair</p>
                    </div>
                </div>
            
            ) : (
                <div className="texts">
                    <p onClick={() => navigate("/signin")}>Entrar</p>
                    <p onClick={() => navigate("/signup")}>Cadastre-se</p>
                </div>
            )}
        </StyledHeader>
    )
}

const StyledHeader = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: ${(props) => props.login ? "center" : "flex-end"};
    align-items: flex-end;
    background-color: white;

    .texts2 {
        display: flex;
        justify-content: space-between;
        min-width: 73%;
        padding-bottom: 10px;
        //background-color: red;
    }

    .texts2 .rigth{
        display: flex;
        gap: 20px;
    }

    .texts2 .left p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #5D9040; 
    }

    .texts2 .rigth p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #9C9C9C;
        cursor: pointer;
    }

    .texts2 .rigth p:last-of-type {
        text-decoration: underline;
    }

    .texts {
        display: flex;
        gap: 30px;
        margin-right: 150px;
        margin-bottom: 20px;
    }

    .texts p:first-of-type {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: ${(props) => props.pathName == "/signup" ? "#9C9C9C" : "#5D9040"};
        cursor: pointer;
    }

    .texts p:last-of-type {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: ${(props) => props.pathName == "/signup" ? "#5D9040" : "#9C9C9C"};;
        cursor: pointer;
    }

    
`