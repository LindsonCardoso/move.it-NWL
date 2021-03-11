import {createContext, ReactNode, useEffect, useState} from 'react'
import Challenges from '../../Challenges.json'
import Cookies from 'js-cookie';
import { LevelUpModal } from '../Components/LevelUpModal'

interface Challenge{
        type: 'boby' | 'eye';
        description: string;
        amount: number; 
}

interface ChallegesContextData{
   level: number;
   currentExperience: number;
   challengesCompleted: number;
   activeChallenge: Challenge;
   levelUp: () => void;
   startNewChallenge: ()=> void;
   resetChallenge: () => void;
   experienceToNextLevel: number;
   completeChallenge: () => void;
   closeLeveUpModal: () => void;

}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number; 
    currentExperience: number;
    challengesCompleted: number;
}


export const ChallengesContext = createContext({} as ChallegesContextData);

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps){

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setcurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);


    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLEvelUpModalOpen, setIsLevelUpModalopen] = useState(false);
    const experienceToNextLevel = Math.pow((level+1)*4,2);

    useEffect( () => {
        Notification.requestPermission();
    },[])

    useEffect(() => {
            
            Cookies.set('level', String(level))
            Cookies.set('currentExperience', String(currentExperience))
            Cookies.set('challengesCompleted', String(challengesCompleted))
        

    }, [level, currentExperience, challengesCompleted])


    function levelUp(){
      setLevel(level +1);
      setIsLevelUpModalopen(true);

    }

    function startNewChallenge(){
       
        const reandomChallengeIndex = Math.floor(Math.random() * Challenges.length)
        const Challenge = Challenges[reandomChallengeIndex];
        setActiveChallenge(Challenge);
        new Audio('/notification.mp3').play;
        if(Notification.permission === 'granted'){
            new Notification('Novo desafio 💪', {body: `Valendo ${Challenge.amount}xp!` }) 
        }
    }

        function resetChallenge(){

            setActiveChallenge(null);
        }


        function completeChallenge(){
            if(!activeChallenge){
                return;
            }

            const {amount} = activeChallenge;
            
            let finalExperience = currentExperience + amount;

            if(finalExperience >= experienceToNextLevel){
                finalExperience = finalExperience - experienceToNextLevel;
                levelUp();
            }
            setcurrentExperience(finalExperience);
            setActiveChallenge(null);
            setChallengesCompleted(challengesCompleted+1);
        }



        function closeLeveUpModal(){
            setIsLevelUpModalopen(false)
        }
    return(
        
        <ChallengesContext.Provider  
        value={{
            level,
            currentExperience,
            challengesCompleted,
             levelUp,
             startNewChallenge,
             activeChallenge,
             resetChallenge,
             experienceToNextLevel,
             completeChallenge,
             closeLeveUpModal
             }}>
                 {children}

                 {isLEvelUpModalOpen && <LevelUpModal />}

        </ChallengesContext.Provider>
    )

}