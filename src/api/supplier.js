import crm from "../utils/baseAxios";
import axios from "axios";

let supplier = {

    //批量删除supplier-goods  供应商的供应商品表元素
    deletesuppgoodsById(ids){
        return crm.delete(`supplier/deletesuppgoodsById/${ids}`);
    },
    getAddGoods(supplierId){
        return crm.get(`supplier/getAddGoods?supplierId=${supplierId}`)
    },
    getPageWithExample(currentPage, pageSize, obj) {
        return crm.post(`supplier/getPageWithExample?currentPage=${currentPage}&pageSize=${pageSize}`, obj)
    },
    addGoods(id,ids){
        return crm.get(`supplier/addGoods/${id}/${ids}`);
    },
    findById(id) {
        return crm.get(`supplier/${id}`)
    },
    addEntity(entity) {
        return axios.post(`supplier`, entity);
    },
    updateEntity(entity) {
        return axios.put(`supplier`, entity);
    },
    deleteById(ids) {
        return axios.delete(`supplier/${ids}`);
    }


}
export default supplier;