import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MadeWithLove from 'react-made-with-love'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "100vw"
  },
});

export default function Footer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
      <div className={classes.root}>
          <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab style={{color: 'blue'}} icon={<i className="fab fa-facebook fa-2x"></i>} aria-label="Phone" />
        <Tab style={{color: 'red'}} icon={<MadeWithLove
  by="Khanh"
  emoji
/>} aria-label="Favorite" />
        <Tab style={{color: 'black'}} icon={<i className="fab fa-github fa-2x"></i>} aria-label="Person" />
      </Tabs>
      </div>
      
  );
}