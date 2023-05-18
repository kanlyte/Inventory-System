import { Base64 } from "js-base64";
const session_token = sessionStorage.getItem("token");
const stored_token = localStorage.getItem("token");

const token = session_token ? session_token : stored_token;

const user = token ? JSON.parse(Base64.decode(token)) : null;

export default user;

