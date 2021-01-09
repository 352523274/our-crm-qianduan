import crm from "../utils/baseAxios";
import axios from "axios";

let supplier = {
    getAddGoods(supplierId){
        return crm.get(`supplier/getAddGoods?supplierId=${supplierId}`)
    },
    getPageWithExample(currentPage, pageSize, obj) {
        return crm.post(`supplier/getPageWithExample?currentPage=${currentPage}&pageSize=${pageSize}`, obj)
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