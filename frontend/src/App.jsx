import {useState} from 'react'
import {Button, BUTTON_TYPES} from "./components/ui/Button/Button";
import {FlexLayout, LAYOUT_TYPES} from "./components/ui/Layout/FlexLayout/FlexLayout.jsx";
import {AuthorizationPage, AUTHORIZATION_TYPES} from "./pages/AuthorizationPage.jsx";
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header/Header.jsx';
import Profile from './pages/Profile/Profile.jsx';

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

    return (
        <>
            <Header/>
            <Routes>
                <Route path="/login">
                    <Route path="/login/" element={
                        <PageTransition>
                            <AuthorizationPage type={AUTHORIZATION_TYPES.WHO}/>
                        </PageTransition>
                    }/>
                    <Route path="/login/main" element={
                        <PageTransition>
                            <AuthorizationPage type={AUTHORIZATION_TYPES.LOGIN}/>
                        </PageTransition>
                    }/>
                </Route>
                <Route path="/register" element={
                    <PageTransition>
                        <AuthorizationPage type={AUTHORIZATION_TYPES.REGISTER}/>
                    </PageTransition>
                } />
                <Route path="/profile" element={
                    <PageTransition>
                        <Profile/>
                    </PageTransition>
                } />
            </Routes>
        </>
    )
}

export default App
