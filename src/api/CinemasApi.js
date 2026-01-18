import axiosClient from './axiosClient';

const CinemaApi = {
    // Lấy tất cả rạp chiếu
    getAll: async () => {
        try {
            const response = await axiosClient.get('/cinemas');
            
            let allCinemas = [];
            
            if (response.data) {
                if (Array.isArray(response.data.data)) {
                    allCinemas = response.data.data;
                } else if (Array.isArray(response.data.cinemas)) {
                    allCinemas = response.data.cinemas;
                } else if (Array.isArray(response.data)) {
                    allCinemas = response.data;
                }
            }
            
            return {
                success: true,
                data: allCinemas,
                message: 'Lấy danh sách rạp thành công'
            };
        } catch (error) {
            console.error('❌ Error:', error);
            return {
                success: false,
                data: [],
                message: error.response?.data?.message || error.message
            };
        }
    },

    // Lấy các rạp đang hoạt động (Active)
    getActiveCinemas: async () => {
        try {
            const response = await axiosClient.get('/cinemas');
            
            let allCinemas = [];
            
            if (response.data) {
                if (Array.isArray(response.data.data)) {
                    allCinemas = response.data.data;
                } else if (Array.isArray(response.data.cinemas)) {
                    allCinemas = response.data.cinemas;
                } else if (Array.isArray(response.data)) {
                    allCinemas = response.data;
                }
            }
            
            // Lọc các rạp có Status = "Active"
            const activeCinemas = allCinemas.filter(cinema => cinema.Status === 'Active');
            
            return {
                success: true,
                data: activeCinemas,
                message: `Lấy ${activeCinemas.length} rạp đang hoạt động thành công`
            };
        } catch (error) {
            console.error('❌ Error:', error);
            return {
                success: false,
                data: [],
                message: error.response?.data?.message || error.message
            };
        }
    },

   
};

export default CinemaApi;