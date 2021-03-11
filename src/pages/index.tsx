
import Head from 'next/head'

import {GetServerSideProps } from 'next'
import { CompletedChallenges } from '../Components/CompletedChallenges'
import { Countdown } from '../Components/Countdown'
import { ExperienceBar } from '../Components/ExperienceBar'
import { Profile } from '../Components/Profile'

import styles from '../Styles/pages/Home.module.css'

import { ChallengeBox } from '../Components/ChallengeBox'
import { CountdownProvider } from '../contexts/CountdownContext'
import {ChallengesProvider} from '../contexts/ChallengesContext'


interface HomeProps{

  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

function Home(props: HomeProps) {
console.log(props)
    

  return (
    
    <ChallengesProvider level={props.level} currentExperience={props.currentExperience} challengesCompleted={props.challengesCompleted} >

        <div className={styles.container}>
          <Head>
            <title>
              Inicio | move.it
            </title>
          </Head>
     
     
          <ExperienceBar/>

          <CountdownProvider>
          <section>
            <div>
                <Profile/>
                <CompletedChallenges/>
                <Countdown/>
                
            </div>

            <div>
            <ChallengeBox/>
            </div>
          </section>
          </CountdownProvider>
        </div>
        </ChallengesProvider>
  );
}

export default Home;


export const getServerSideProps: GetServerSideProps = async (ctx) => {

   

  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;



  return{
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}