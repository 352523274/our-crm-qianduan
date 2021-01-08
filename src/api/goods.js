import crm from "../utils/baseAxios";
import axios from "axios";

let goods= {

    finaPageWithExample(currentPage, pageSize,obj) {
        return crm.post(`goods/getPageWithExample?currentPage=${currentPage}&pageSize=${pageSize}`,obj)
    },
    findById(id) {
        return crm.get(`goods/${id}`)
    },
   addEntity(entity){
        return axios.post(`goods`,entity);
   },
    updateEntity(entity){
        return axios.put(`goods`,entity);
   },
    deleteById(ids){
        axios.delete(`goods/${ids}`);
    }

}
export default goods;