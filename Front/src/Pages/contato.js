import { useState, useEffect } from 'react';
import { Grid, Button, TextField } from '@material-ui/core/';
import styled from 'styled-components';

const Contact = styled.div`
  display: flex;
  flex-direction: column;

  .grid{
      align-items: center;
      box-shadow: 1px 1px 5px black;
      margin: 2% auto;
      padding: 5% 0;
      background-color: whitesmoke;
  }
`

const GridMessage = styled.div`
 display: grid;
 grid-template-columns: repeat(4, 1fr);
 gap: 2%;
`

const Contatos = () => {

    const url = 'http://localhost:5000/message'
    const [message, setMessage] = useState([]);
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [validator, setValidator] = useState(false);
    const [render, setRender] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(async () => {
        const response = await fetch(url)
        const data = await response.json();
        setMessage(data);
    }, [render])

    const sendMessage = () => {
        setValidator(false);
        if(author.length <= 0 || content.length <= 0){
            return setValidator(!validator)
        }
        const bodyForm = {
            email: author,
            message: content,
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyForm)
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.id) {
                setRender(true);
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 5000)
            }
        })
        
        setAuthor('');
        setContent('');
        
        console.log(content)
    }  

    return(
        <Contact>
            <Grid container direction="column" xs={3} className='grid'>
                <TextField id="name" label="Name" value={author} onChange={(event)=>{setAuthor(event.target.value)}}/>
                <TextField id="message" label="Message" value={content} onChange={(event)=>{setContent(event.target.value)}}/>
                <Button onClick={sendMessage} className="mt-2" variant="contained" color="primary">
                Sent
            </Button>
            </Grid>

            {validator && 
                <div className="alert alert-warning alert-dismissible fade show mt-2" role="alert">
                    <strong>Por favor preencha todos os campos!</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }

            {success && 
                <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
                    <strong>Mensagem foi enviada</strong>
                </div>
            }

            
             <GridMessage>
            {message.map((content) => {
                return(
                    <div className="card mt-2" key={content.id}>
                        <div className="card-body">
                            <h5 className="card-title">{content.email}</h5>
                            <p className="card-text">{content.message}</p>
                            <p className="card-text"><small className="text-muted">{content.created_at}</small></p>
                        </div>
                    </div>
                )
            } )}
            </GridMessage>
        </Contact>
    )
}

export default Contatos;
