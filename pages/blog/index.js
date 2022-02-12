import React, { Component } from 'react';
import matter from 'gray-matter';
import {
    makeStyles
} from '@material-ui/core/styles';
import { Container, Grid, Typography, Link, Divider } from '@material-ui/core';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Nav from '../../src/components/Nav';
import Footer from '../../src/components/Footer';
import Subscribe from '../../src/components/blog/Subscribe';
import Head from 'next/head';
import config from '../../config';

const fs = require('fs');
const path = require('path');

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: '#F9FAFB'
    },
    blogImage: {
        border: '1px solid rgba(0, 0, 0, 0.1)',
        maxWidth: '100%',
        boxShadow: '0 0 1px rgb(0 0 0 /20%)',
        borderRadius: 8,
        cursor: 'pointer',
        '&:hover': {
            filter: 'brightness(0.97)'
        }
    },
    blogTitle: {
        fontFamily: 'Manrope',
        cursor: 'pointer',
        fontWeight: 700,
        '&:hover': {
            color: '#EB5657'
        }
    }
})

function blogAbstract(post, classes) {
    const goToPost = () => window.location.href = '/blog/' + post.path
    const postData = post.data.data;
    console.log(post)
    return <div className={classes.blog}>
        <Grid container spacing={2} key={postData.title}>
            <Grid item xs={12}>
                <img className={classes.blogImage} src={'/' + postData.seoImage} onClick={goToPost} />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4" className={classes.blogTitle} onClick={goToPost}>{postData.title}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle2" style={{ color: config.PALETTE.TEXT_SECONDARY }}>{new Date(postData.publishedOn).toLocaleDateString()} • {postData.author}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" style={{ cursor: 'pointer' }} onClick={goToPost}>{postData.abstract}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Link href={'/blog/' + post.path} style={{ display: 'flex', alignItems: 'center' }}><b>Continue reading <ArrowRight style={{ transform: 'translateY(7px)' }} /></b></Link>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
        </Grid>
    </div>
}

const Blog = (props) => {

    const classes = useStyles();

    const { posts } = props;

    return <div className={classes.root}>
        <Head>
            <title>Rapport | Blog</title>
            <meta name="description" content={config.META_DESCRIPTION} />
            <meta property="og:type" content={"website"} />
            <meta property="twitter:card" content={"summary_large_image"} />
            <meta property="twitter:site" content={"@buildrapport_io"} />
            <meta property="twitter:image" content={"https://buildrapport.io/MetaImage.png"} />
            <meta property="og:image:alt" content={config.META_DESCRIPTION} />
            <meta property="og:title" content={"Rapport | Articles"} />
            <meta property="og:description" content={config.META_DESCRIPTION} />
            <meta property="og:image" content={"/MetaImage.png"} />
            <meta property="og:url" content={"https://buildrapport.io/blog"} />
        </Head>
        <Nav auth />
        <Divider />
        <Container maxWidth="sm" style={{ marginTop: 48 }}>
            <Subscribe title/>
        </Container>
        <Divider />
        <Container maxWidth="sm" style={{marginTop: 48}}>
            {posts.map(post => {
                return blogAbstract(post, classes);
            })}
        </Container>
        <Footer />
    </div>
}

export async function getStaticProps(context) {
    return new Promise((resolve) => {
        fs.readdir(path.join(process.cwd(), 'blog'), {}, async (err, files) => {
            const posts = (await Promise.all(files.map(async (post) => {
                const content = await import(`../../blog/${post}`);
                const data = matter(content.default);
                delete data.orig;

                return {
                    path: post.split('.md')[0],
                    data
                }
            }))).filter(post => post.data.data.isPublished);

            return resolve({ props: { posts } })
        });
    })
}

export default Blog