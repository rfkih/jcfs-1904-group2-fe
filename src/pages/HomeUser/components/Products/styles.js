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
  card : {
    transition:" all 200ms ease",
    // transition: theme.transitions.create(["background", "background-color"], {
    //   duration: theme.transitions.duration.complex,
    // }),
    "&:hover": {
      backgroundColor: "#f1f1f1",
      transform: 'scale(1.02)'
    },
},

}));