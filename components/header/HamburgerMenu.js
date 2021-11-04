import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Login from '@mui/icons-material/Login'
import { useSession } from 'next-auth/client'
import router, { useRouter } from "next/router";
import { hamburgerMenuContent } from '../../translations/hamburgerMenuContent';
import { signIn, signOut } from 'next-auth/client'
import { sign } from 'crypto';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import EmailIcon from '@mui/icons-material/Email';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTheme } from 'next-themes'

const HamburgerMenu = () => {
    const router = useRouter()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const [session, loading] = useSession()
    const { locale, locales, defaultLocale, asPath, pathname, query } = useRouter();
    const { content } = hamburgerMenuContent[locale];
    const handleSignIn = () => {
        signIn()
    }
    const handleSignOut = () => {
        signOut()
    }
    const [language, setLanguage] = React.useState('')
    const handleChangeLanguage = (lang) => {
        router.push({ pathname, query }, asPath, { locale: lang.target.value })
    }
    const goToDashboard = () => {
        router.push('/dashboard', '/dashboard', { locale: locale })
    }
    const { theme, setTheme, resolvedTheme } = useTheme()
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title={content.textMenu}>
                    {!session ? <IconButton onClick={handleClickMenu} size="small" sx={{ ml: 2 }}>
                        <MenuIcon style={{ fill: "green" }} sx={{ width: 32, height: 32 }}>M</MenuIcon>
                    </IconButton> : <IconButton onClick={handleClickMenu} size="small" sx={{ ml: 2 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>{session.user.name.charAt(0)}</Avatar>
                    </IconButton>}

                </Tooltip>
            </Box>
            <ThemeProvider theme={resolvedTheme === 'dark' ? darkTheme : lightTheme}>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseMenu}
                    onClick={handleCloseMenu}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={goToDashboard}>
                        <ListItemIcon>
                            <DashboardIcon fontSize="small" sx={{ mr: 1 }} />
                        </ListItemIcon>
                        {content.textDashboard}
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <InfoIcon fontSize="small" />
                        </ListItemIcon>
                        {content.textAbout}
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <EmailIcon fontSize="small" />
                        </ListItemIcon>
                        {content.textContact}
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <LanguageIcon fontSize="small" />
                        </ListItemIcon>
                        <FormControl sx={{ m: 1 }}>
                            <InputLabel htmlFor="select">{content.textLanguages}</InputLabel>
                            <Select
                                value={language}
                                onChange={handleChangeLanguage}
                                sx={{ minWidth: "150px" }}
                                inputProps={{ 'aria-label': 'Without label' }}
                                label={language}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return <em>{content.textLanguages}</em>;
                                    }

                                    return selected.join(', ');
                                }}
                            >
                                {/* <MenuItem value="">
                                <em>Language</em>
                            </MenuItem> */}
                                <MenuItem value='en-US'>🇺🇸{content.textLanguageEnglishUS}</MenuItem>
                                <MenuItem value='en-GB'>🇬🇧{content.textLanguageEnglishUK}</MenuItem>
                                <MenuItem value='ro-RO'>🇷🇴{content.textLanguageRO}</MenuItem>
                            </Select>
                        </FormControl>
                    </MenuItem>
                    {session ?
                        <MenuItem onClick={handleSignOut}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            {content.textLogout}
                        </MenuItem>
                        :
                        <MenuItem onClick={handleSignIn}>
                            <ListItemIcon>
                                <Login fontSize="small" />
                            </ListItemIcon>
                            {content.textLogin}
                        </MenuItem>}
                </Menu>
            </ThemeProvider>
        </React.Fragment>
    )
}

export default HamburgerMenu