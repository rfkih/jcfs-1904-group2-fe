import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240

export default makeStyles( (theme) => {

    return {
        drawer: {
            width: drawerWidth
    
        },
        drawerPaper: {
            width: drawerWidth
    
        },
        root: {
            display: 'flex'
        },
        active: {
            background: '#f4f4f4'
        },
        title: {
        padding: theme.spacing(2)
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1
        },
        avatar: {
            marginLeft: theme.spacing(2)
        }

    }

    
})