import Header from "./Header"
import styled from "styled-components"
import logo from "../../img/Logo.svg"
import Ranking from "../ranking/Ranking"
import lixeira from "../../img/lixeira.svg"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Homepage(){

    const [ link, setLink ] = useState("")

    const [ urls, setUrl ] = useState([])

    const token = localStorage.getItem("token")

    async function encurtador() {
        try {
            await axios.post("http://localhost:4000/urls/shorten",{
                url: link
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setUrl("")
            buscaUrls()            
        } catch (error) {
            console.log(error)
        }
    }

    async function buscaUrls(){
        try {
            const resp = await axios.get("http://localhost:4000/users/me", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(resp.data)
            setUrl(resp.data.shortenedUrls)             
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteUrl(id) {
        try {
            await axios.delete(`http://localhost:4000/urls/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            buscaUrls()          
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        buscaUrls()
    }, [])

    return (
        <>
            <Header/>
            <StyledHome>
                
                {token ? 
                (   <div className="container-Home">
                        <div className="logo"><img src={logo} /></div>
                        <div className="encurtar">
                            <input required type="text" id="campoLink" placeholder="Links que cabem no bolso" value={link} onChange={e => setLink(e.target.value)} /><br/>
                            <button onClick={() => encurtador()}>Encurtar link</button>
                        </div>
                        {urls.length > 0
                        ?  <div className="clas">{
                                urls.map((url) => (
                                    <div className="links">
                                        <div className="info">
                                            <div className="container-info">
                                                <p className="url">{url.url}</p>
                                                <p className="short">{url.shortUrl}</p>
                                                <p className="visit">Quantidade de visitantes: {url.visitCount}</p>
                                            </div>
                                        </div>
                                        <div onClick={() => deleteUrl(url.id)} className="lixeira"><img src={lixeira}/></div>
                                    </div> 
                            ))
                        }   </div> 
                        : "O usuário não possui links Cadastrdos"}
                    </div>
                ) 
                : <Ranking/>}
            </StyledHome>
        </>
    )
}

const StyledHome = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: white;
    padding-top: 70px;
    > img {
        margin-top: 20px;
        margin-bottom: 40px;
        margin-bottom: 147px;
    }

    .container-Home {
        width: 74%;
    }

    .container-Home .logo {
        display: flex;
        justify-content: center;
        margin-bottom: 70px;
        margin-top: 20px;
    }

    .container-Home .encurtar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 59px;

    }

    .container-Home .encurtar > input {
        width: 769px;
        height: 60px;
        background: #FFFFFF;
        border: 1px solid rgba(120, 177, 89, 0.25);
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 12px;
        outline: none;
        padding-left: 20px;

        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #9C9C9C;
    }

    .container-Home .encurtar button {
        width: 182px;
        height: 60px;
        background: #5D9040;
        border-radius: 12px;
        cursor: pointer;
        border: none;

        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 18px;
        color: #FFFFFF;
    }

    .container-Home .links {
        display: flex;
        margin-bottom: 42px;
    }

    .container-Home .links .info {
        //background-color: blue;
        width: 887px;
        height: 60px;
        display: flex;
        justify-content: center;
        background: #80CC74;
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 12px 0px 0px 12px;
        overflow-y: scroll;
    }

    .container-Home .links .info .container-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 90px;
        width: 95%;
        padding-top: 5px;
    }

    .container-Home .links .info .container-info .short, .visit {
        width: 280px;
        height: 20px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #FFFFFF;
        cursor: default;
        text-align: center;
    }

    .container-Home .links .info .container-info .url {
        width: 280px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #FFFFFF;
        cursor: default;
    }    

    .container-Home .links .lixeira {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FFFFFF;
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 0px 12px 12px 0px;
        border: 1px solid rgba(120, 177, 89, 0.25);
    }

    .container-Home .links .lixeira img {
        cursor: pointer;
    }

`