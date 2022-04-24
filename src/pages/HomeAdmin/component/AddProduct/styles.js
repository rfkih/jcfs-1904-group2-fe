import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    margin: theme.spacing(1),
  },
  upload: {
    padding: theme.spacing(2),
  },
  text: {
    paddingBottom: theme.spacing(2.7)
  },
  textActive: {
    paddingBottom: theme.spacing(0)
  },
  input: {
    display: 'none'
  }

}));