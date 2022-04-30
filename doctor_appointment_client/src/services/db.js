import Dexie from "dexie";
import axios from "axios";
import api from "../constants/api";

const getDb = () => {
    var db = new Dexie("hospital");
    db.version(1).stores({
        admin: "user_id, token, email "
    });
    return db
}

export const logout=()=>{
    var db = getDb();
    db.admin.clear();
}

export const saveLoginInfo = async (data) => {
    var db = getDb();
    return db.admin.add(data).then(() => {
        return { success: true };
    }).catch((err) => {
        console.log(err);
        return { success: false };
    });
}
export const getToken =async () => {
    var db = getDb();
    const res = await db.table("admin").toArray();
    if(res[0]){
        const token = res[0].token;
        return {found: true, token};
    }
    return {found: false, token: "no token found"};
}
export const validate =async () => {
    const res = await getToken();
    if(res.found){
        const valid = await axios.get(api.ADMIN + `/validate/${res.token}`);
        return valid.data;
    }
    return false;
}