import { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import {
    createMuiTheme,
    MuiThemeProvider as ThemeProvider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import { Helmet } from 'react-helmet';

import Routes from './Routes';
import useToggleTheme from './hooks/useToggleTheme';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { getThemeByName } from './theme';

import { APP_NAME } from './constants/base';

import useStyles from './App.style';

function App(): ReactElement {
    const [theme] = useToggleTheme();
    const classes = useStyles();
    const selectedTheme = createMuiTheme(getThemeByName(theme));
    return (
        <>
            <Helmet>
                <title>{APP_NAME}</title>
                <meta
                    name="description"
                    content="Check out the hand-picked collection of latest mobile design patternsfrom apps that reflect the best in design"
                />
            </Helmet>
            <ThemeProvider theme={selectedTheme}>
                <Router>
                    <Paper className={classes.root}>
                        <Header />
                        <Routes />
                        <Footer />
                    </Paper>
                </Router>
                <CssBaseline />
            </ThemeProvider>
        </>
    );
}

export default App;
