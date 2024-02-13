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
import cn from "classnames";
import {Education} from "./Education/Education.jsx";
import Resume from "./Resume/Resume.jsx";
import {Favorites} from "./Employer/Favorites/Favorites";
import {WorkExperience} from "./WorkExpirience/WorkExperience.jsx";
import {OffersList} from "./Employer/OffersList/OffersList.jsx";
import {About} from "./Employer/About/About.jsx";

const Profile = () => {
    const [getProfile, {error}] = useGetProfileMutation()
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.userState)
    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        getProfile()
        // console.log(profile)
    }, [])

    return (
        <FlexLayout className={cn(globalStyles.page, globalStyles.flex_container)}>
            <Sidebar/>
            <main className={cn(globalStyles.flex_grow_2, globalStyles.marginTop, globalStyles.width_100)}>

                {userState.role === "employer" ?
                    <TabGroup className={globalStyles.tab_group} changeState={setActiveTab}>
                        <TabContent label="Избранное">
                            <Favorites />
                        </TabContent>
                        <TabContent label="Заявки">
                            <OffersList />
                        </TabContent>
                        <TabContent label="О компании">
                            <About />
                        </TabContent>
                        {/*<TabContent label="Оплаченные">*/}
                        {/*    <Portfolio/>*/}
                        {/*</TabContent>*/}
                    </TabGroup>
                    :
                    <TabGroup className={globalStyles.tab_group} changeState={setActiveTab}>
                        <TabContent label="Учеба">
                            <Education/>
                        </TabContent>
                        <TabContent label="Портфолио">
                            <Portfolio/>
                        </TabContent>
                        <TabContent label="Резюме">
                            <Resume/>
                        </TabContent>
                        <TabContent label="Опыт работы">
                            <WorkExperience />
                        </TabContent>
                    </TabGroup>
                }

            </main>
        </FlexLayout>
    )
}

export default Profile