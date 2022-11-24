import React from "react";
import Contact from "./contact-form.module.css";
const ContactForm = function (props) {
  return (
    <div className={Contact.container}>
      <h3>Documentations</h3>
      <h4>Operation</h4>
      <p>
        User always starts from the Add Page where the user selects the players
        from existing players for the tournament. If this is first time the user
        logs in, then user has to add new players using the Add Players form and
        then select the tournament players (see the Add Page below for more).
      </p>
      <p>
        To retrieve or edit previously played tournaments,players data, User can
        browse to the following link{" "}
        <a href="http://16.171.44.60:8080/login">Saved Data</a>. This website is
        accessed by using the same user credential as used in the main login
        page.
      </p>
      <p>
        Now user switches to Home page to conduct the tournament rounds (See
        Home Page for more). Aftier all the rounds are played user has the
        option of saving the tournament data or just hit the show result button
        just to announce result without saving. If user opts for the former,
        then he should visit the tournament page before hitting the save button
        (see Tournament Page for more).
      </p>
      <h4>Home Page</h4>
      <p>
        User always starts from the Add Page where the user selects the players
        from existing players for the tournament. If this is first time the user
        logs in, then user has to add new players using the Add Players form and
        then select the tournament players. Read the Add players page for more.
      </p>
      <p>
        Now user switches to Home page to conduct the tournament rounds (See
        Home Page for more). Aftier all the rounds are played user has the
        option of saving the tournament data or just hit the show result button
        just to announce result without saving. If user opts for the former,
        then he should visit the tournament page before hitting the save button
        (see Tournament Page for more).
      </p>
      <p>
        This is the main page of the app. It has three parts namely: the top
        row, the middle row which contains the two displaying columns (the right
        one is players listing section and the left is players pairing section)
        and the bottom row which contains the five control buttons.
      </p>
      <p>
        The buttons at the bottom part are the main control units. There are two
        items inside the top section. The logo is on the left side and next to
        it lies the four links which lead to separate page where a user can add
        players, tournament info etc. Below I describe each page
        functionalities.
      </p>
      <b>The Five Control Buttons</b>
      <p>
        <b>Reset button</b> This button click clears both the displaying columns
        in the middle row. It also resets the scores of each player to zero,
        resets the opponents lists of each player and the entered tournament
        data. In short it resets the state of the app back when it was before
        any use of the app. User must be careful in accidental clicking of this
        button because it is always in activated mode. This is done to enable
        the user to revert to the initial state from any point in the tournament
        stage.
      </p>
      <p>
        <b>Submit results button</b> This button click triggers the storing of
        each player’s score, generates the paired list and increments the round
        number. But this is done only if the user has selected the result from
        the dropdown list for each pairing. Otherwise, it informs the user to
        enter all of the pairings’ result in the round pairings section.
      </p>
      <p>
        <b>Show results button</b> It basically displays the current scores of
        each player in descending order in the round pairings list section. It
        does not modify the app’s state.
      </p>
      <p>
        <b>Save button</b> If the user has entered the information in the
        tournament page and the tournament has been run the minimum number of
        times which is entered in the tournament form, then the save button
        click trig-gers the app to send request to the backend to save the
        tournament data. After that the frontend UI returns to the starting
        position as if the reset button has just been clicked. The app is ready
        once again to run another tournament.
      </p>

      <h4>The Tournament Form Page</h4>

      <p>
        This is the page which contains a form where user fills in information
        about the tournament. This is optional.{" "}
      </p>

      <p>
        However if the user wants to save the results of the tournament then
        this form must be filled before the user hit the save button on the home
        page to save the data.{" "}
      </p>

      <p>
        Otherwise the app can not save the data without information about the
        tournament.
      </p>

      <b>The Form </b>

      <p>
        <b>Tournamen Description</b>.
      </p>
      <p>
        This is optional field where the user describes info about the
        tournament. Eg. Lautasaari Chess Club Summer tournament etc.
      </p>

      <p>
        Number of players / This is also optional but is recommended to be
        filled in. It states the number of players participating in the
        tournament.{" "}
      </p>

      <p>
        {" "}
        Number of Rounds This is a required field. It states the minimum number
        of rounds the tournament should run before the save button could be
        clicked to save the data.{" "}
      </p>

      <p>
        <b>Tournament Id</b> This is a required field. The ID must be unique
        one. If user accidentally enters an existing ID, the app informs to
        enter new one.{" "}
      </p>

      <h4>The Add page</h4>

      <p>
        This page has three columns: The add player form and the two lists
        dispaying columns: List of players and the selected players list.{" "}
      </p>

      <p>
        <b>The Add Players Form</b>
        <p>
          This form has name, elo-rating and club fields. The name and elo-raing
          fields are required while the club field is optional. Name user enters
          the name of the player. Elo-rating The rating of players in number
          format Club The chess club of the player{" "}
        </p>
      </p>

      <p>
        <b>List of players </b>
        <p>
          This section lists all players that the user had saved before. They
          are collected from the database asynchronously.{" "}
        </p>
      </p>

      <p>
        <b>Tournament Players</b>
        <p>
          It lists players that are selected to participate in the upcoming
          tournament. User can click individually a player from the List of
          Players section or press the Add All button to select all of the
          players from that list. User has also option to remove player from the
          selected list by clicking on it.
        </p>
      </p>
    </div>
  );
};

export default ContactForm;
