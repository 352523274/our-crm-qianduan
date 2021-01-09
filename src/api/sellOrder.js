import crm from "../utils/baseAxios";
import axios from "axios";

let sellOrder= {
    findAll(currentPage, pageSize) {
        return crm.get(`sellOrder?currentPage=${currentPage}&pageSize=${pageSize}`)
    },
    findById(id) {
        return crm.get(`sellOrder/${id}`)
    },
    addEntity(entity){
        return axios.post(`sellOrder`,entity);
    },
    updateEntity(entity){
        return axios.put(`sellOrder`,entity);
    },
    deleteById(ids){
        return  axios.delete(`sellOrder/${ids}`);
    },


}
export default sellOrder;