import axios from "axios"

export const setDefaultURL = ()=>{
    axios.defaults.baseURL = "https://smpn53jakarta.sch.id/index.php/wp-json/wp/v2/"
}

export const basicsInfo = {
    name:"SMP Negeri 53 Jakarta",
}