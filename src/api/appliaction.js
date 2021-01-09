import crm from "../utils/baseAxios";
import axios from "axios";

let appliaction= {
    findAll(currentPage, pageSize) {
        return crm.get(`appliaction?currentPage=${currentPage}&pageSize=${pageSize}`)
    },
    findAllByExample(currentPage, pageSize,formInline) {
        return crm.post(`appliaction/findAllByExample?currentPage=${currentPage}&pageSize=${pageSize}`,formInline)
    },
    findById(id) {
        return crm.get(`appliaction/${id}`)
    },
    addEntity(entity){
        return axios.post(`appliaction`,entity);
    },
    updateEntity(entity){
        return axios.put(`appliaction`,entity);
    },
    deleteById(ids){
        axios.delete(`appliaction/${ids}`);
    }

}
export default appliaction;