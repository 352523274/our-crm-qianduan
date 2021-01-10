import crm from "../utils/baseAxios";
import axios from "axios";

let audit= {
    findAllWithoutExampleAndPage(){
        return crm.get(`audit/findAllWithoutExampleAndPage`)
    },
    findAll(currentPage, pageSize) {
        return crm.get(`audit?currentPage=${currentPage}&pageSize=${pageSize}`)
    },
    findById(id) {
        return crm.get(`audit/${id}`)
    },
    addEntity(entity){
        return axios.post(`audit`,entity);
    },
    updateEntity(entity){
        return axios.put(`audit`,entity);
    },
    deleteById(ids){
       return  axios.delete(`audit/${ids}`);
    },
    updatepriceadjust(priceadjustformId,auditobj){
        return crm.put(`audit/updatepriceadjust/${priceadjustformId}`,auditobj)
    }

}
export default audit;