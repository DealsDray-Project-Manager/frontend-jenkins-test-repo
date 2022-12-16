import { styled } from '@mui/system'
import React, { Fragment } from 'react'
import { navigations, getfilteredNavigations } from 'app/navigations'
import Scrollbar from 'react-perfect-scrollbar'
import useSettings from 'app/hooks/useSettings'
import MatxVerticalNav from '../MatxVerticalNav/MatxVerticalNav'
import useAuth from '../../hooks/useAuth';

const StyledScrollBar = styled(Scrollbar)(() => ({
    paddingLeft: '1rem',
    paddingRight: '1rem',
    position: 'relative',
}))

const SideNavMobile = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100vw',
    background: 'rgba(0, 0, 0, 0.54)',
    zIndex: -1,
    [theme.breakpoints.up('lg')]: {
        display: 'none',
    },
}))

const Sidenav = ({ children }) => {
    const { settings, updateSettings } = useSettings()
    const { user } = useAuth();
    const filteredNavigations = getfilteredNavigations(navigations, user.role)
    const updateSidebarMode = (sidebarSettings) => {
        let activeLayoutSettingsName = settings.activeLayout + 'Settings'
        let activeLayoutSettings = settings[activeLayoutSettingsName]

        updateSettings({
            ...settings,
            [activeLayoutSettingsName]: {
                ...activeLayoutSettings,
                leftSidebar: {
                    ...activeLayoutSettings.leftSidebar,
                    ...sidebarSettings,
                },
            },
        })
    }

    return (
        <Fragment>
            <StyledScrollBar options={{ suppressScrollX: true }}>
                {children}
                <MatxVerticalNav items={filteredNavigations} />
            </StyledScrollBar>

            <SideNavMobile
                onClick={() => updateSidebarMode({ mode: 'close' })}
            />
        </Fragment>
    )
}

export default Sidenav
