import { createContext, ReactNode, useContext, useEffect, useState, VoidFunctionComponent } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void
}

interface CountdownProviderProps {
    children:ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1 * 60); // --> 06 segundos
    //const [time, setTime] = useState(25 * 60); // --> 25 minutos
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown(){
        setIsActive(true);
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(0.1 *60);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time -1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}





/* ESTRUTURA BASE DO CONTEXTO

import { createContext, ReactNode } from "react";

interface CountdownContextData {

}

interface CountdownProviderProps {
    children:ReactNode
}

const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({ children }: CountdownProviderProps) {

    

    return (
        <CountdownContext.Provider value={{}}>
            {children}
        </CountdownContext.Provider>
    )
}
*/