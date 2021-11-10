import React from 'react';
import './Home.css';
import ListPlayers from './ListOfPlayers';
import LowerSection from './LowerSection'
import PairingListSection from './PairingListSection';

function Home(props) {

    return (<div className="container">
        
        <div className="pairingListSection item">
            <PairingListSection
                round={props.counter}
                pairsList={props.pairList} />
        </div>



        <div className="listOfPlayersSection item">

            <ListPlayers
                playersList={props.listOfPlayers} />

        </div>

        <div className="lowerHalfSection item">

            <LowerSection {...props}
                pairButtonHandler={props.pairedHandler}
                submitButtonHandler={props.roundResultHandler}
                showResultHandler={props.showResultHandler}
                resetHandler={props.resetHandler}
                saveButtonHandler={props.saveButtonHandler} />

        </div>
    </div>);

}
export default Home;