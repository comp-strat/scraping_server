import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

export function TopBar(props) {
  return (
    <AppBar position="static">
      <Toolbar variant="regular">
      <IconButton edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
        <Typography variant="h6" color="inherit">
          Universal Web Crawler
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export const schoolExamples = [
  { url: 'http://www.charlottesecondary.org/', ncessch: '1221763800065630210' },
  { url: 'http://www.kippcharlotte.org/', ncessch: '1223532959313072128' },
  { url: 'http://www.socratesacademy.us/', ncessch: '1232324303569510400' },
  { url: 'https://ggcs.cyberschool.com/', ncessch: '1226732686900957185' },
  { url: 'http://www.emmajewelcharter.com/pages/Emma_Jewel_Charter', ncessch: '1225558292157620224' },
]

export const largerSchoolExamples = [
  { url: 'http://099.clayton.k12.ga.us/', ncessch: '130123003896' },
	{ url: 'http://198.clayton.k12.ga.us/', ncessch: '130123003687' },
	{ url: 'http://21stcenturypa.com/wp/', ncessch: '350006000811' },
	{ url: 'http://42charterschool.org/', ncessch: '220019300944' },
	{ url: 'http://a3school.org/', ncessch: '411167001641' },
	{ url: 'http://aaechighschools.com/', ncessch: '40010601892' },
	{ url: 'http://aaiutah.org/', ncessch: '490018601483' },
	{ url: 'http://aak8.org/', ncessch: '80345001896' },
	{ url: 'http://ablecharter.net/', ncessch: '62703013064' },
	{ url: 'http://abs.aasd.k12.wi.us/', ncessch: '550039002880' },
	{ url: 'http://aca.vail.k12.az.us/', ncessch: '40885001510' },
	{ url: 'http://acabroadway.com/', ncessch: '390143005665' },
]