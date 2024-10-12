import axios from "axios";

export async function Authenticate(UserName: string, Password: string, AuthType: string) {
  try {
    const res = await axios.post(`http://localhost:3002/api/v1/${AuthType}`, {
      UserName: UserName,
      Password: Password
    })
    return res;
  }
  catch (err) {
    console.error(err)
  }
}

export async function getAvailabletriggers() {
     try{
     const res = await axios.get('http://localhost:3002/api/v1/GetAvailableTriggers');
     console.log(res);
     return res.data;
     }
     catch(err){
      return err;
     }
}

export async function CreatenewZap(email:string,ZapName:string){
  try{
    const res = await axios.post("http://localhost:3002/api/v1/CreateZap", {
      email: email,
      ZapName: ZapName,
    });
    return res.data;
  }
  catch(err){
   return err;
  }
}