import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal, setActiveOption } from "../redux/hambugerMenu/HamburgerSlice"

export const useHamburgerMenu = () => {
    


    return {
        toggleModal, 
        setActiveOption,
    }
}
