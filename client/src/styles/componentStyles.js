import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 250;

export const componentStyles = makeStyles({

    user: {
        margin: '20px',
        alignItems: 'flex-start',
    },

    userName: {
        alignItems: 'flex-start',
    },

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },

    drawerPaper: {
        width: drawerWidth,
    },
});