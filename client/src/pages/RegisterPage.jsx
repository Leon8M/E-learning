import {React, useState} from 'react'
import httpClient from '../httpClient'

const RegisterPage = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const registerUser = async () =>{

        try{
            const response = await httpClient.post('//localhost:8080/register', {
                email,
                username,
                password
            });

            window.location.href = "/";
        }
        catch(error) 
        {
            if (error.response.status === 401) {
                alert("Invalid email or password")
    
        }
    }
}
  return (
    <div>
        <h1>
            Create an account
        </h1>

        <form>
            <div>
                <label>Username: </label>
                <input type="text" value={username}
                onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                <label>Email: </label>
                <input type="text" value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <label>Password: </label>
                <input type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type='button' onClick={() => registerUser()}>Submit</button>
        </form>
    </div>
  )
}

export default RegisterPage;