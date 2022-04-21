import { makeStyles } from '@material-ui/core/styles';



export default makeStyles( (theme) => {

    return {

        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(1),
          },  
          paper: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            marginTop: theme.spacing(1),
            padding: theme.spacing(2),
          },
          card : {
            transition: theme.transitions.create(["background", "background-color"], {
              duration: theme.transitions.duration.complex,
            }),
            "&:hover": {
              backgroundColor: "#f1f1f1",
            },
        },
        
    }

    
})