import React, {useEffect} from 'react'
import {Sidebar} from "./Sidebar/Sidebar";
import globalStyles from "../../styles/global.module.scss";
import Tile from "../../components/ui/Tile/Tile.jsx";
import {FlexLayout} from "../../components/ui/Layout/FlexLayout/FlexLayout";
import {useGetProfileMutation, useRegisterUserMutation} from "../../store/api/userApi.js";
import {useDispatch, useSelector} from "react-redux";

const Profile = () => {
    const [getProfile, { error }] = useGetProfileMutation()
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.userState)

    useEffect(() => {
        getProfile()
        // console.log(profile)
    }, [])

    return (
        <FlexLayout className={globalStyles.page}>
            <Sidebar/>
            <main className={globalStyles.flex_grow_2}>
                <Tile props={{
                    classNames: globalStyles.start
                }}>
                    Портфолио
                </Tile>
                <Tile props={{
                    classNames: globalStyles.start
                }}>
                    Портфолио
                </Tile>
            </main>
        </FlexLayout>
    )
}

export default Profile