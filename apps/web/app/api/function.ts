import axios from "axios";
import { Root } from "../models/UserZaps";
import { UserDetails } from "../models/UserDetails";
import { SpreadSheet, SpreadSheetDetails } from "../models/SpreadSheetDetails";

/// Added Comment to Test WebHook
export async function Authenticate(UserName: string, Password: string, AuthType: string) {
  try {
    const res = await axios.post(`http://localhost:3002/api/v1/${AuthType}`, {
      UserName: UserName,
      Password: Password,
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}
export async function getAvailabletriggers() {
  try {
    const res = await axios.get("http://localhost:3002/api/v1/GetAvailableTriggers", {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    return err;
  }
}
export async function CreatenewZap(email: string, ZapName: string) {
  try {
    const res = await axios.post("http://localhost:3002/api/v1/CreateZap", {
      email: email,
      ZapName: ZapName,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
export async function CreatenewTrigger(ZapId: string, AvailableTriggerId: string) {
  try {
    const res = await axios.post("http://localhost:3002/api/v1/CreateTrigger", {
      ZapId: ZapId,
      AvailableTriggerId: AvailableTriggerId,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
export async function getZaps(email: string) {
  try {
    // console.log(email);
    const res = await axios.get("http://localhost:3002/api/v1/GetUserZap", {
      params: {
        email: email,
      },
    });
    // console.log(res);
    return res.data;
  } catch (err) {
    return [];
    console.log(err);
  }
}
export async function getUserDetails(Email: string) {
  try {

    const res = await axios.get("http://localhost:3002/api/v1/getUserDetails", {
      params: {
        email: Email
      }
    })

    return res.data as UserDetails
  }
  catch (err) {
    console.log(err);
  }
}
export async function getSpreadSheets(email: string) {
  try {
    const res = await axios.post('http://localhost:3000/api/spreadsheet/GetAllSpreadSheet/get', {
      emailId: email
    });
    // console.log(res.data)
    return res.data as SpreadSheet
  }
  catch (err) {
    console.log(err);
  }
}
export async function CreateSpreadSheetTrait(traitname: string, spreadSheetId: string, spreadsheetName: string, email: string) {
  try {
    const res = await axios.post("http://localhost:3002/api/v1/CreateSpreadSheetTrait", {
      traitname: traitname.trim(),
      spreadSheetId: spreadSheetId,
      spreadsheetName: spreadsheetName,
      email: email
    })
    return res.data
  }
  catch (err) {
    console.log(err);
  }
}

