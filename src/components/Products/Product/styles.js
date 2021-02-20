import { makeStyles } from '@material-ui/core/styles';

// Instantly return material ui styles for Product card
export default makeStyles(() => ({
    root: {
        maxWidth: '100%',
        padding: 15
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));