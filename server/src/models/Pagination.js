class Pagination {

    constructor() {

    }

    getPagination = (page, size) => {
        const limit = size ? +size : 3;
        if (page > 0) page = page - 1;
        const offset = page ? page * limit : 0;
        return { limit, offset };
    };
    
    getPagingData = (data, page, limit) => {
        const { count: totalItems, rows: users } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        const itemsPages = limit;
    
        return { totalItems, users, totalPages, currentPage, itemsPages };
    };
    
}

module.exports = Pagination;