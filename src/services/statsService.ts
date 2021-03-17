import axios from "axios"
const baseUrl = "/api/stats"

const statsService = {
    getAll () {
        const request = axios.get("/api/stats")
        return request.then(response => response.data)
    },
    updateStat  (statType:string) {
        const request = axios.put("/api/stats", {type:statType})
        return request.then(response => response.data)
    }
    
 
}

export default statsService

