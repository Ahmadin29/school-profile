import axios from "axios"

export const setDefaultURL = ()=>{
    axios.defaults.baseURL = "https://smpn53jakarta.sch.id/index.php/wp-json/wp/v2/"
}

export const basicsInfo = {
    name:"SMP Negeri 53 Jakarta",
    kepsek:"https://smpn53jakarta.sch.id/wp-content/uploads/2022/06/SISPA.png"
}