import crm from "../utils/baseAxios";
import axios from "axios";

let supplier= {
    findAll(currentPage, pageSize) {
        return crm.get(`supplier?currentPage=${currentPage}&pageSize=${pageSize}`)
    },
    findById(id) {
        return crm.get(`supplier/${id}`)
    },
   addEntity(entity){
        return axios.post(`supplier`,entity);
   },
    updateEntity(entity){
        return axios.put(`supplier`,entity);
   },
    deleteById(ids){
        axios.delete(`supplier/${ids}`);
    }

}
export default supplier;