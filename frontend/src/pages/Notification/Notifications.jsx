import React, {useEffect} from 'react';
import {FlexLayout, LAYOUT_TYPES} from "../../components/ui/Layout/FlexLayout/FlexLayout.jsx";
import cn from "classnames";
import globalStyles from "../../styles/global.module.scss";
import {Typography} from "../../components/ui/Typography/Typography.jsx";
import {useGetProfileMutation} from "../../store/api/userApi.js";
import {useDispatch, useSelector} from "react-redux";
import {useGetEmployerOffersMutation, useGetStudentOffersMutation} from "../../store/api/resumeApi.js";
import OfferTile from "./OfferTile/OfferTile.jsx";

const Notifications = () => {
    const [getStudentOffers, {error}] = useGetStudentOffersMutation()
    const [getEmployerOffers, {error2}] = useGetEmployerOffersMutation()
    const dispatch = useDispatch()
    const resumeState = useSelector((state) => state.resumeState)
    const userState = useSelector((state) => state.userState)

    useEffect(() => {
        if (userState.role === "employer") getEmployerOffers()
        else getStudentOffers()
    }, [userState.role])

    return (
        <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(globalStyles.page, globalStyles.padding_5050)}>
            <Typography variant="h2" noMargin>Уведомления</Typography>

            <FlexLayout type={LAYOUT_TYPES.VERTICAL}>
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
};

export default Notifications;