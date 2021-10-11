import React, { useState, useEffect } from "react"
import ReactDOM from 'react-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BookCard from '../components/bookCard';
//import withRoot from '../components/backgroundImage';
//import background from 'booskworm/assets/backgroundImage.png'
import BackgroundImagePage from '../components/background';
import '../index.css'
//import Carousel from 'react-material-ui-carousel';
//import MyProjectsExample from '../components/carousel';


import axios from "axios"
import { Alert, Button, TextField } from '@mui/material';
import ReactDOMServer from 'react-dom/server';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display:'flex',

  }));

export default function MainPage() {
    const [term, setTerm] = useState("")
    const [results, setResults] = useState([])
  
    useEffect(() => {
      const search = async () => {
        const { data } = await axios.get("https://openlibrary.org/search.json", {
          params: { author: term},
        })
        setResults(data.docs)
        console.log(results)
      }
      search()
    }, [term])

    const searchResultsMapped = results.map(result => {

        const article = {
          url : ReactDOMServer.renderToStaticMarkup((result.isbn && result.isbn.length) ? "http://covers.openlibrary.org/b/isbn/" + result.isbn[0] + "-M.jpg":"")
        }
    
        return (
            <>
            <Grid key={result.key} item xs={12} md={5}>
                <Item>{result.title}</Item>
                <Item><img src={article.url}></img></Item>
            </Grid>
            </>
        )
    })


    function handleChange(e) {
        setTerm(e.target.value)
    }

    return (
        <Box sx={{ flexGrow: 1 }}
        >
            <TextField id="term" label="Search" variant="outlined" onChange={handleChange}/>
            <Grid container spacing={2}>
                <Grid item xs={12} container spacing={2}>
                    {searchResultsMapped}
                </Grid>
                <Grid item xs={12} container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Item>Recomendations</Item>
                    </Grid>
                </Grid>
                <Grid item xs={12} container spacing={2}>
                    <Grid item xs={6} md={3}>
                        <BookCard/>
                    </Grid>
                </Grid>
                <Grid item xs={12} container spacing={2}>
                    <Grid item xs = {12} md={4}>
                        <Item>Other Works By Author</Item>
                    </Grid>
                </Grid>
                <Grid item xs={12} container spacing={2}>
                    <Grid item xs = {6} md={3}>
                        <BookCard/>
                    </Grid>
                </Grid>
                <Grid item xs={12} container spacing={2}>
                    <Grid item xs = {6} md={3}>
                        <Item>More</Item>
                    </Grid>
                </Grid>
            </Grid>
      </Box>
     
    )


}