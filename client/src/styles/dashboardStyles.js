import {makeStyles} from "@material-ui/core";

export const dashboardStyles = makeStyles((theme) =>({
    root: {
        display: 'flex',
    },

    statCard: {
        maxWidth: 300,
        maxHeight: 300
    },

    cardContent: {
        display:'flex',
        justifyContent:'center'
    },

    largeButton: {
        padding: 15
    },

    largeIcon: {
        fontSize: "3em"
    },

    chartPaper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: 360,
    },

    rightContainer: {
        paddingTop: theme.spacing(2),
        paddingRight: theme.spacing(8),
        paddingLeft: theme.spacing(8),
    },

    main: {
        flexGrow: 1,
    }

}));