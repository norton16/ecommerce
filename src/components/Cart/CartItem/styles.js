import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  card: {
    padding: 15,
    marginTop: 25,
    marginBottom: 50
  },
  media: {
    height: 350,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cartActions: {
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}));
