
import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../Styles/Components/Countdown.module.css'
import { CountdownContext} from '../contexts/CountdownContext'

export function Countdown(){

    const {minutes, seconds, hasFinished, isActive, startCountdowm, resetCountdowm} = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('');
    const [secondLeft,secondRight] = String(seconds).padStart(2,'0').split('');



    return(
        <div>
            <div className={styles.CountdownContainer}>
                
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                    <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>


              </div>

            {hasFinished ? (

                 
                    <button disabled 
                    className={`${styles.startCountdownButton}`}
                    >
                    Ciclo encerrado
                   </button>

            ) : (

               <>
                 {
                     isActive ? (
                        <button type="button"
                        className={`${styles.startCountdownButton} ${styles.countdownButtonActive}`}
                        onClick={resetCountdowm}
                        
                        >
                        Abandonar ciclo
                       </button>
                     ) : (


                        <button type="button"
                        className={styles.startCountdownButton}
                        onClick={startCountdowm}
                        
                        >
                        
                            Iniciar um ciclo
           
                       </button>
                     )

                 }
               </>



            )
        
                
        }
             
                

           

        </div>
    )

}