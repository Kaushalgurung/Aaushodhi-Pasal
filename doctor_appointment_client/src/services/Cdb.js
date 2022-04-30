import Dexie from "dexie";
import axios from "axios";
import api from "../constants/api";

const getDb = () => {
    var db = new Dexie("hospital");
    db.version(1).stores({
        user: "user_id, token, email "
    });
    return db
}

export const logout=()=>{
    var db = getDb();
    db.user.clear();
}

export const saveRegistrationInfo = async (data) => {
    var db = getDb();
    return db.user.add(data).then(() => {
        console.log("Sucessfuly Registered!");
        return { success: true };
    }).catch((err) => {
        console.log(err);
        console.log("Registerd");
        return { success: false };
    });
}
export const getToken =async () => {
    var db = getDb();
    const res = await db.table("user").toArray();
    if(res[0]){
        const token = res[0].token;
        return {found: true, token};
    }
    return {found: false, token: "no token found"};
}
export const validate =async () => {
    const res = await getToken();
    if(res.found){
        const valid = await axios.get(api.CUSTOMER + `/validate/${res.token}`);
        return valid.data;
    }
    return false;
}