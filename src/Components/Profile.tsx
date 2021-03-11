
import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../Styles/Components/Profile.module.css'

    export function Profile(){
        
        
    
        const { level} = useContext(ChallengesContext)
        return(
    
            <div className={styles.profilesContainer}>
                <img src="https://github.com/LindsonCardoso.png" dir="lindson Cardoso"/>
                <div>
                    <strong>
                        Lindson Cardoso
                    </strong>
                    <p>
                        <img src="icons/level.svg" />
                        Level {level}
                    </p>
                </div>
            </div>
    
        )
    
    }