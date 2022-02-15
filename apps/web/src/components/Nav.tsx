import { Component } from 'react'
import axios from 'axios'
import { withStyles } from '@material-ui/styles'
import { Grid, Typography, AppBar, Toolbar, Button } from '@material-ui/core'
import Image from 'next/image'

import config from '../../config'

const styles = () => ({
  root: {
    zIndex: 99
  }
})

interface NavProps {
  classes: { [key: string]: string }
  uid?: string
  app?: boolean
}

class Nav extends Component<NavProps> {
  handleSignOut = async () => {
    try {
      const response = await axios.post('/api/auth/signout')
      console.log('Sign out response: ', response)
      window.location.href = '/login'
    } catch (error) {
      console.log('[handleSignOut] Error ', error)
    }
  }

  render () {
    const { classes, uid, app } = this.props
    return (
      <div className={classes.root}>
        <AppBar color='transparent' elevation={0} position='static'>
          <Toolbar style={{ paddingTop: 16, width: '100%' }}>
            <Grid container alignItems='center'>
              <div
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onClick={() =>
                  (window.location.href = `${uid ? '/dashboard' : '/'}`)
                }
              >
                {/* <Image width={40} height={40} src={config.COMPANY_LOGO_URL} /> */}
                <Typography
                  variant='h6'
                  display='inline'
                  className='main-text'
                  style={{ color: "#FFF" }}
                >
                  ⚔️ {config.DISPLAY_COMPANY_NAME}
                </Typography>
              </div>
              {app && (
                <Button
                  className='action-button'
                  style={{ marginLeft: 'auto' }}
                  onClick={() =>
                    window.open(
                      'https://discord.gg/NAgsHBYdTY',
                      '_blank'
                    )
                  }
                >
                  Join our Discord
                </Button>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

// @ts-ignore
export default withStyles(styles)(Nav)
