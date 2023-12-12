import {FlexLayout} from "../ui/Layout/FlexLayout/FlexLayout";
import globalStyles from "../../styles/global.module.scss";
import Tile from "../ui/Tile/Tile.jsx";

export const StudentCard = ({ student }) => {
    return (
        <Tile props={{
            classNames: globalStyles.start
        }}>
            <FlexLayout>

            </FlexLayout>
        </Tile>
    )
}