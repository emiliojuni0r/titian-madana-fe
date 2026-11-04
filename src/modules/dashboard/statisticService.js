import api from "@/utils/api"

const statisticService = {
    async getStats() {
        return api.get('/stats')
    }
}

export default statisticService;