import { makeStyles } from '@material-ui/core/styles';



export default makeStyles( (theme) => {

    return {

        toolbar: theme.mixins.toolbar,
        paper: {
            margin: theme.spacing(1),
            padding: theme.spacing(2),
          },
          link: {
            textDecoration: 'none'
          },
        papers:{
          margin: theme.spacing(1),
          padding: theme.spacing(1.08),
        },
        
    }

    
})