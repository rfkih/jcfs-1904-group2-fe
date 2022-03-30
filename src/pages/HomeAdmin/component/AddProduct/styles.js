import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: 60,
    },
  }
}));