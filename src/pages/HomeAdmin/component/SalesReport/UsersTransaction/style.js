import { makeStyles } from '@material-ui/core/styles';



export default makeStyles( (theme) => {

    return {

        toolbar: theme.mixins.toolbar,
        paper: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            marginTop: theme.spacing(1),
            padding: theme.spacing(1),
          },

        
    }

    
})