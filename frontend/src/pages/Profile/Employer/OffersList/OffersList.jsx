import {useGetEmployerOffersMutation, useGetStudentOffersMutation} from "../../../../store/api/resumeApi.js";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {FlexLayout, LAYOUT_TYPES} from "../../../../components/ui/Layout/FlexLayout/FlexLayout.jsx";
import cn from "classnames";
import globalStyles from "../../../../styles/global.module.scss";
import {Typography} from "../../../../components/ui/Typography/Typography.jsx";
import OfferTile from "../../../Notification/OfferTile/OfferTile.jsx";

export const OffersList = () => {
    const [getEmployerOffers, {error2}] = useGetEmployerOffersMutation()
    const resumeState = useSelector((state) => state.resumeState)
    const userState = useSelector((state) => state.userState)

    useEffect(() => {
        if (userState.role === "employer") getEmployerOffers()
    }, [userState.role])

    return (
        <FlexLayout type={LAYOUT_TYPES.VERTICAL} noPadding>
            {/*<Typography variant="h2" noMargin>Уведомления</Typography>*/}

            <FlexLayout type={LAYOUT_TYPES.VERTICAL} noPadding>
                {resumeState.offers.length > 0 ?
                    <>
                        {resumeState.offers.map(offer =>
                            <OfferTile offer={offer}/>
                        )}
                    </>
                    :
                    <Typography variant="p">{userState.role === "employer" ? "У вас ещё нет откликов" : "У вас ещё нет приглашений"}</Typography>
                }
            </FlexLayout>
        </FlexLayout>
    );
}