import { useCallback } from "react";
import { getEstablishmentRatings } from "../../api/ratingsAPI";

export const useFetchEstablishmentsRatings = () => {
    return useCallback(async (pageNum: number, onSuccess, onError) => {
        try {
            const ratings = await getEstablishmentRatings(pageNum);
            onSuccess(ratings.establishments);
        } catch(err) {
            onError(err);
        }
    }, []);
};