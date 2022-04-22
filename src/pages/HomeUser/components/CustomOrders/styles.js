import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    root: {
      flexGrow: 1,
    },
    paper : {
      transition:" all 200ms ease",
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      "&:hover": {
        backgroundColor: "#f1f1f1",
        transform: 'scale(1.02)'
      },
  },
      input: {
        display: 'none'
      }
  
}));