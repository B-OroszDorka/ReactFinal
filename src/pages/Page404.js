import {Grid, Typography} from "@mui/material";

const Page404 = () => {
    return <Grid container spacing={2}>
        <br/>
        <Grid size={{xs :12 }}>
            <Typography variant={"h3"}>Sajnos hiba történt :( ... Nincs ilyen oldal!</Typography>
        </Grid>
    </Grid>
}
export default Page404;