import {useEffect, useState} from "react";
import {Typography} from "../../../../components/ui/Typography/Typography";
import {StudentCard} from "../../../../components/StudentCard/StudentCard.jsx";
import {FlexLayout, LAYOUT_TYPES} from "../../../../components/ui/Layout/FlexLayout/FlexLayout";

export const Favorites = () => {

    const [favorites, setFavorites] = useState([])

    const updateFavorites = () => {
        let favs = JSON.parse(localStorage.getItem('favorites'))
        if (Array.isArray(favs)) setFavorites(favs)
        else setFavorites(favs)
    }

    useEffect(() => {
        updateFavorites()
    }, [])

    return (
        <FlexLayout type={LAYOUT_TYPES.VERTICAL}>
            {favorites.length > 0 ?
                <>
                    {favorites.map(student =>
                        <StudentCard student={student} updateFavorites={updateFavorites} inFavorites={true}/>
                    )}
                </>
            :
                <Typography variant="h5">Вы ещё не добавили студентов в избранное</Typography>
            }
        </FlexLayout>
    )
}