import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import {ChallengesContext} from './ChallengesContext'


interface CountdownContextData{
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdowm: () => void;
    resetCountdowm:()=> void;
    startNewChallenge:() => void;
}


interface CountdownProviderProps{
    children: ReactNode;
   
}


  
export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children}: CountdownProviderProps){
    
    const {startNewChallenge} = useContext(ChallengesContext)


    const [time, setTime] = useState(25*60);
    const [isActive, setIsActive] = useState(false); 
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time /60);//arredondando os minutos
    const seconds = time % 60;


    function startCountdowm(){
        setIsActive(true);
        }

      
    function resetCountdowm(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(25 * 60);
        setHasFinished(false);

        }
  

        useEffect(() => {
           
            if(isActive && time > 0){
                countdownTimeout =  setTimeout(() => {
                    setTime(time - 1);
                },1000)
            }else 
            if(isActive && time === 0){
                setHasFinished(true);
                setIsActive(false);
                startNewChallenge();
            }
        },[isActive, time])




        return(

                <CountdownContext.Provider 
                value={{
                    minutes,
                    seconds,
                    hasFinished,
                    isActive,
                    startCountdowm,
                    resetCountdowm,
                    startNewChallenge,
                }}
                >
                    {children}
                </CountdownContext.Provider>

        )


}