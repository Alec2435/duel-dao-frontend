import { Component } from 'react'
import { Styles, withStyles, withTheme } from '@material-ui/styles'
import {
  Grid,
  Typography,
  Container,
  Button,
  Link,
  Theme
} from '@material-ui/core'
import Nav from '../Nav'
import config from '../../../config'
import { ArrowRight, ArrowRightAlt } from '@material-ui/icons'

const styles: Styles<any, any> = (theme: Theme) => ({
  root: {
    background: config.PALETTE.BACKGROUND_PRIMARY,
    // background: 'linear-gradient(66deg, #C82090, #D060AB)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      height: 'auto'
    }
  },
  after: {
    position: 'absolute',
    left: 0,
    bottom: '-7vw',
    width: '100%',
    height: '7vw',
    background: config.PALETTE.BACKGROUND_PRIMARY,
    transform: 'skew(-86deg)',
    transformOrigin: 'top'
    // zIndex: '-1',
  },
  heroPrimary: {
    // color: theme.palette.secondary.light,
    fontFamily: 'Times New Roman',
    [theme.breakpoints.down('sm')]: {
      fontSize: 32
    }
  },
  heroSecondary: {
    fontFamily: 'sans-serif',
    fontWeight: 300,
    [theme.breakpoints.down('sm')]: {
      fontSize: 18
    }
  },
  heroText: {
    paddingTop: 40,
    paddingBottom: 40,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: 60,
      textAlign: 'center'
    }
  },
  blobHolder: {
    zIndex: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: '50%'
  },
  heroImage: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {}
  },
  cta: {
    marginTop: 16,
    width: 160,
    height: 50,
    color: '#F1EEEE',
    fontWeight: 100
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    background:
      'conic-gradient(from 180deg at 50% 50%, #2400FF 0deg, #0087FF 82.5deg, rgba(255, 29, 122, 0.760597) 148.93deg, #BBFF11 205.61deg, rgba(255, 83, 53, 0.600302) 267.32deg, #691EFF 360deg)',
    filter: 'blur(95px)'
  }
})

interface HeroProps {
  classes: { [key: string]: string }
}

class Hero extends Component<HeroProps> {
  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Nav /* auth */ app />
        <Container maxWidth='md' style={{ height: '100%', zIndex: 1 }}>
          <Grid
            container
            spacing={3}
            style={{ height: '100%', paddingTop: '7vw', paddingBottom: '2vw' }}
            justifyContent='center'
            alignItems='center'
            alignContent='center'
          >
            <Grid
              item
              xs={12}
              className={classes.heroText}
              style={{ zIndex: 8, color: '#FFF' }}
            >
              <Typography variant='h4' className='main-text' paragraph>
                DAO vs DAO on-chain chess
              </Typography>
              <Typography variant='body1' className='detail-text' paragraph>
                The biggest game of chess at ETH Denver
              </Typography>
              <Button
                onClick={() =>
                  window.open('https://discord.gg/NAgsHBYdTY', '_blank')
                }
                variant='contained'
                className='action-button'
              >
                Join our Discord
              </Button> 
            </Grid>
            <Grid
              item
              xs={12}
              className={classes.heroImage}
              style={{
                textAlign: 'center',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <div className={classes.backdrop}></div>
              <div
                className='iframeVideo'
                style={{
                  zIndex: 4,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <iframe
                  style={{
                    borderRadius: 8
                  }}
                  src='https://www.youtube.com/embed/SFkdcQgNJHo'
                  title='YouTube video player'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>

                {/* <div
                  style={{
                    flex: 1,
                    borderRadius: 8,
                    background: config.PALETTE.BACKGROUND_PRIMARY,
                    boxShadow: '0 0 16px rgb(0 155 255 / 25%)'
                  }}
                >
                  placeholder
                </div> */}
                <Link
                  href='https://discord.gg/NAgsHBYdTY'
                  target='_blank'
                >
                  <div
                    className='horiz'
                    style={{ color: '#FFF', justifyContent: 'flex-end' }}
                  >
                    <Typography
                      variant='body2'
                      style={{ fontSize: 12, paddingTop: 2 }}
                    >
                      <i>Join our Discord</i>
                    </Typography>
                    <ArrowRight
                      fill={'#FFF'}
                      style={{ marginLeft: 4, height: 16, width: 16 }}
                    />
                  </div>
                </Link>
              </div>
              {/* <video src="/LaunchVideo.mp4" autoPlay muted controls loop style={{ maxWidth: '80%', objectFit: 'contain', boxShadow: '0 0 12px rgb(0 0 0 /20%)', borderRadius: 8 }} /> */}
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }
}

// @ts-ignore
export default withTheme(withStyles(styles)(Hero))
