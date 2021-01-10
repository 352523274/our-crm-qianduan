import crm from "../utils/baseAxios";
import axios from "axios";

let priceadjustform= {



    finaPageWithExample(currentPage,pageSize,obj){
        return crm.post(`priceadjustform/getPageWithExample?currentPage=${currentPage}&pageSize=${pageSize}`,obj)
    },
    findAll(currentPage, pageSize) {
        return crm.get(`priceadjustform?currentPage=${currentPage}&pageSize=${pageSize}`)
    },
    findById(id) {
        return crm.get(`priceadjustform/${id}`)
    },
    addEntity(entity){
        return axios.post(`priceadjustform`,entity);
    },
    updateEntity(entity){
        return axios.put(`priceadjustform`,entity);
    },
    deleteById(ids){
       return  axios.delete(`priceadjustform/${ids}`);
    }

}
export default priceadjustform;