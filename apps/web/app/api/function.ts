import axios from "axios";

export async function Authenticate(UserName:string,Password:string,AuthType:string){
  const res = await axios.post(`http://localhost:3002/api/v1/${AuthType}`,{
        UserName : UserName,
        Password : Password
    })
    return res;
}
