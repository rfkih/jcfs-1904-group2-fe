import { makeStyles } from '@material-ui/core/styles';



export default makeStyles( (theme) => {

    return {

        toolbar: theme.mixins.toolbar,
        paper: {
            marginTop: theme.spacing(2.8),
            padding: theme.spacing(1),
          },
          link: {
            textDecoration: 'none'
          },
        
    }

    
})