import {useState} from 'react'
import {Button, BUTTON_TYPES} from "./components/ui/Button/Button";
import {FlexLayout, LAYOUT_TYPES} from "./components/ui/Layout/FlexLayout/FlexLayout.jsx";
import {AuthorizationPage} from "./pages/AuthorizationPage.jsx";

function App() {

    return (
            <>
                <AuthorizationPage />
            </>
        // <FlexLayout type={LAYOUT_TYPES.VERTICAL}>
        //     <Button>
        //         Войти
        //     </Button>
        //
        //     <Button type={BUTTON_TYPES.SECONDARY}>
        //         Войти через ДГТУ.Цифра
        //     </Button>
        // </FlexLayout>
    )
}

export default App
