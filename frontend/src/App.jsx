import {useEffect, useState} from 'react'
import {Button, BUTTON_TYPES} from "./components/ui/Button/Button";
import {FlexLayout, LAYOUT_TYPES} from "./components/ui/Layout/FlexLayout/FlexLayout.jsx";
import {AuthorizationPage, AUTHORIZATION_TYPES} from "./pages/AuthorizationPage.jsx";
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header/Header.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Landing from "./pages/Landing/Landing.jsx";
import {Balance} from "./pages/Balance/Balance";
import {StudentsForms} from "./pages/StudentForms/StudentsForms.jsx";
import {BASE_URL} from "./components/ui/ImageUploader/ImageUploader.jsx";

function PageTransition({ children }) {
    return (
        <AnimatePresence wait>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
      </AnimatePresence>
    );
  }

function App() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(BASE_URL + 'user/check', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 401) {
                    if (!window.location.href.includes('login') && !window.location.href.includes('register') && !window.location.href.includes('/register/main')) {
                        console.log('non auth')
                    	window.location.href = "/login";
                    }
                } else {
                    // if (window.location.href.includes('login') && window.location.href.includes('register') && window.location.href.includes('/register/main')) {
                    //     window.location.href = "/profile";
                    // }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData().then(r => console.log(r));
    }, [history]);

    return (
        <>
            <Header/>
            <Routes>
                <Route path="/register/">
                    <Route path="/register/" element={
                        <PageTransition>
                            <AuthorizationPage type={AUTHORIZATION_TYPES.WHO}/>
                        </PageTransition>
                    }/>
                    <Route path="/register/main" element={
                        <PageTransition>
                            <AuthorizationPage type={AUTHORIZATION_TYPES.REGISTER}/>
                        </PageTransition>
                    }/>
                </Route>
                <Route path="/login" element={
                    <PageTransition>
                        <AuthorizationPage type={AUTHORIZATION_TYPES.LOGIN}/>
                    </PageTransition>
                } />
                <Route path="/profile" element={
                    <PageTransition>
                        <Profile/>
                    </PageTransition>
                } />
                <Route path="/balance" element={
                    <PageTransition>
                        <Balance/>
                    </PageTransition>
                } />
                <Route path="/students" element={
                    <PageTransition>
                        <StudentsForms/>
                    </PageTransition>
                } />

                <Route path="/" element={
                    <PageTransition>
                        <Landing/>
                    </PageTransition>
                } />
            </Routes>
        </>
    )
}

export default App
