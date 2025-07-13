import {useContext} from "react";
import { authContext } from "../contexts/Authcontext"; // Adjust the path as necessary



export const useAuth = ( )=> useContext(authContext);