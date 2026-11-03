import api from "@/utils/api";

const scrapeService = {
    // scraping
    async startScrape(params) {
        return api.post('/admin/scrape', null, { params });
    },

    // Mengambil riwayat scraping
    async getHistory(limit = 20) {
        return api.get('/admin/scrape/runs', { params: { limit } });
    }
}

export default scrapeService;