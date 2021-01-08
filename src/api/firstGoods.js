import crm from "../utils/baseAxios";
import axios from "axios";

let firstGoods= {

    finaPageWithExample(currentPage, pageSize,obj) {
        return crm.post(`firstGoods/getPageWithExample?currentPage=${currentPage}&pageSize=${pageSize}`,obj)
    },
    findById(id) {
        return crm.get(`firstGoods/${id}`)
    },
   addEntity(entity){
        return axios.post(`firstGoods`,entity);
   },
    updateEntity(entity){
        return axios.put(`firstGoods`,entity);
   },
    deleteById(ids){
        axios.delete(`firstGoods/${ids}`);
    }

}
export default firstGoods;