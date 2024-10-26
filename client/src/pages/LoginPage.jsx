import {React, useState} from 'react'
import httpClient from '../httpClient'

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const logInUser = async () =>{
        console.log(email, password)

        try{
            const response = await httpClient.post('//localhost:8080/login', {
                email,
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
            Login to your account
        </h1>

        <form>
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
            <button type='button' onClick={() => logInUser()}>Submit</button>
        </form>
    </div>
  )
}

export default LoginPage;