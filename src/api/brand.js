import crm from "../utils/baseAxios";
import axios from "axios";

let brand= {
    findAll(currentPage, pageSize) {
        return crm.get(`brand?currentPage=${currentPage}&pageSize=${pageSize}`)
    },
    findById(id) {
        return crm.get(`brand/${id}`)
    },
    addEntity(entity){
        return axios.post(`brand`,entity);
    },
    updateEntity(entity){
        return axios.put(`brand`,entity);
    },
    deleteById(ids){
        axios.delete(`brand/${ids}`);
    }

}
export default brand;