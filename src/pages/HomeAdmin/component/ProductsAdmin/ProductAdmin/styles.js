import { makeStyles } from "@material-ui/core/styles";
import { Transform } from "@material-ui/icons";
import { Scale } from "@mui/icons-material";

export default makeStyles((theme) => ({
    root: {
        maxWidth: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
      cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      card : {
        textDecoration: 'none',
        transition: theme.transitions.create(["background", "background-color"], {
          duration: theme.transitions.duration.complex,
        }),
        "&:hover": {
          backgroundColor: "#333",
        },
    },
      link: {
        textDecoration: 'none'
      },
    
      hover: { 
       
        "&:hover": {
          backgroundColor: "#f00",
          
        }},
}));