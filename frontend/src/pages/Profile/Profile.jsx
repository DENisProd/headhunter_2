import React, {useEffect, useState} from 'react'
import {Sidebar} from "./Sidebar/Sidebar";
import globalStyles from "../../styles/global.module.scss";
import Tile from "../../components/ui/Tile/Tile.jsx";
import {FlexLayout} from "../../components/ui/Layout/FlexLayout/FlexLayout";
import {useGetProfileMutation, useRegisterUserMutation} from "../../store/api/userApi.js";
import {useDispatch, useSelector} from "react-redux";
import {TabContent, TabGroup} from "../../components/ui/TabBar/TabBar.jsx";
import ImageUploader from "../../components/ui/ImageUploader/ImageUploader.jsx";
import {Portfolio} from "./Portfolio/Portfolio";

const Profile = () => {
    const [getProfile, { error }] = useGetProfileMutation()
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.userState)
    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        getProfile()
        // console.log(profile)
    }, [])

    return (
        <FlexLayout className={globalStyles.page}>
            <Sidebar/>
            <main className={globalStyles.flex_grow_2}>
                <TabGroup className={globalStyles.tab_group} changeState={setActiveTab}>
                    <TabContent label="Учеба">
                        <Tile props={{
                            classNames: globalStyles.start
                        }}>
                            Учёба

                            {/*<FileUpload/>*/}
                        </Tile>
                        <Tile props={{
                            classNames: globalStyles.start
                        }}>
                            Учёба
                        </Tile>
                    </TabContent>
                    <TabContent label="Портфолио">
                        <Portfolio />
                    </TabContent>
                    <TabContent label="Аудитория">

                    </TabContent>
                </TabGroup>
            </main>
        </FlexLayout>
    )
}

export default Profile