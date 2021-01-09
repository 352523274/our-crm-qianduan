import crm from "../utils/baseAxios";
import axios from "axios";

let putStoreage= {
    findAll(currentPage, pageSize) {
        return crm.get(`putStoreage?currentPage=${currentPage}&pageSize=${pageSize}`)
    },
    findAllByExample(currentPage, pageSize,formInline) {
        return crm.post(`putStoreage/findAllByExample?currentPage=${currentPage}&pageSize=${pageSize}`,formInline)
    },
    findById(id) {
        return crm.get(`putStoreage/${id}`)
    },
    addEntity(entity){
        return axios.post(`putStoreage`,entity);
    },
    updateEntity(entity){
        return axios.put(`putStoreage`,entity);
    },
    deleteById(ids){
        axios.delete(`putStoreage/${ids}`);
    }

}
export default putStoreage;