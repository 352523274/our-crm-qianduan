import crm from "../utils/baseAxios";
import axios from "axios";

let category= {
    findAll(currentPage, pageSize) {
        return crm.get(`category?currentPage=${currentPage}&pageSize=${pageSize}`)
    },
    findById(id) {
        return crm.get(`category/${id}`)
    },
    addEntity(entity){
        return axios.post(`category`,entity);
    },
    updateEntity(entity){
        return axios.put(`category`,entity);
    },
    deleteById(ids){
        axios.delete(`category/${ids}`);
    }

}
export default category;