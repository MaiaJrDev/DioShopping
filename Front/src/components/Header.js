import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button} from '@material-ui/core/';
import Cart from './Cart';
import styled from 'styled-components';

const ItalicText = styled.div`
  display: flex;
  font-size: 2em;
  font-style: italic;

  span{
      color: 	#1E90FF;
      text-shadow: 1px 1px 1px black;
  }

  b{
    color: #9400D3;
    text-shadow: 1px 1px 1px black;
  }
`

const Headeer = styled.div`
 width: 100%;
 padding: 1% 0;
 margin: 0;
 justify-content: space-evenly;
 border-bottom: 1px solid black;
`

const ButtonLink = styled.a`
  color: black;
  text-decoration: none;
  font-size: 1.5em;
  font-weight: bold;

  &:hover{
      color:black;
      border-bottom: 1px solid red;
  }
`


const Header = () => {

    return(
    <Headeer>
        <Grid bgcolor='#228B22' container direction="row" justify="space-between" alignItems="center" xs={12}>
            <ItalicText>
              <b>Dio</b>
              <span>Shopping</span>
            </ItalicText>
            <>
            <ButtonLink href='/'>HOME</ButtonLink>
            <ButtonLink href='/contato'>CONTATO</ButtonLink>
            </>
            <Cart />             
        </Grid>
      </Headeer>
    )
}

export default Header;
