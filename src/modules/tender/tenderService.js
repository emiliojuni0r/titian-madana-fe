import api from "@/utils/api"

const tenderService = {
    async get(params = {}) {
        return api.get('/tenders', { params })
    },
    async getById(id) {
        return api.get(`/tenders/${id}`)
    },
    async getPemenang(id) {
        return api.get(`/tenders/${id}/pemenang`)
    },
    async getSPPJ(id) {
        return api.get(`/tenders/${id}/sppj`)
    },
}


export default tenderService;