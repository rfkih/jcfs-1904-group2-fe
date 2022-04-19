import { makeStyles } from '@material-ui/core/styles';



export default makeStyles( (theme) => {

    return {

        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            marginTop: theme.spacing(3),
            padding: theme.spacing(6),
          },
        card: {
            padding: theme.spacing(2)
        }
        
    }

    
})