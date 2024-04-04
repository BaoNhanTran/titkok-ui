import * as httpRequest from '~/utils/httpRequest';

export const getSuggestedAccount = async (page = 1, perPage = 5) => {
    try {
        const res = await httpRequest.get('users/suggested', {
            params: {
                page,
                per_page: perPage,
            },
        });

        return res.data;
    } catch (err) {
        console.log(err);
    }
};
