
import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../Styles/Components/LevelUpModal.module.css'

export function LevelUpModal(){
    const   {level, closeLeveUpModal} =   useContext(ChallengesContext)
    
    return(
    <div className={styles.overlay}>
        <div className={styles.container}>

            <header>
                {level}
            </header>

            <strong>
                Parabéns
            </strong>
                <p>Você alcançou um novo level.</p>

            <button type="button" onClick={closeLeveUpModal}>
                <img src="/icons/close.svg" alt="Fechar Modal"/>
            </button>

        </div>


    </div>

)
}