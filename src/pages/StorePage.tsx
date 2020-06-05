import React from "react";
import { useParams } from "react-router-dom";
import StoreName from "../components/Store/StoreName";
import StoreDescription from "../components/Store/StoreDescription";
import StoreSchedule from "../components/Store/StoreSchedule";
import StoreMap from "../components/Store/StoreMap";
import StoreReviews from "../components/Store/StoreReviews";
import { getStore } from "../actions/storeActions";

export default function StorePage(): JSX.Element {
    // const dispatch: any = useDispatch();
    // dispatch(getStore(id));
    // const store = useSelector((state: RootStateOrAny) => state.stores[0]);
    const id: string = useParams();
    const store = getStore(id);
    console.log(store);

    return (
        <>
            <StoreName name={store.name} photos={store.photos} />
            <StoreDescription description={store.description} />
            <StoreSchedule id={id} />
            <StoreMap
                address={store.address}
                city={store.city}
                province={store.province}
            />
            <StoreReviews id={id} />
        </>
    );
}
