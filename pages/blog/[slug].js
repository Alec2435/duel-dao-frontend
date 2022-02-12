import Nav from '../../src/components/Nav';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import {
    makeStyles
} from '@material-ui/core/styles';
import { Container, Grid, Typography, Divider } from '@material-ui/core';
import ErrorPage from 'next/error'
import Footer from '../../src/components/Footer';
const fs = require('fs');
const path = require('path');
import Head from 'next/head';
import gfm from 'remark-gfm'
import config from '../../config';
import Subscribe from "../../src/components/blog/Subscribe";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    }
});

function Image(props) {
    return <img {...props} style={{ maxWidth: '100%' }} />
}
function Link(props) {
    return <a {...props} style={{ color: '#3182CE' }} />
}
function Paragraph(props) {
    return <p {...props} style={{ lineHeight: '1.75rem', color: '#333333', fontWeight: 300 }} />
}
function Heading2(props) {
    return <h2 {...props} style={{ lineHeight: '1.75rem' }} />
}
function Heading4(props) {
    return <h4 {...props} style={{ lineHeight: '1.75rem' }} />
}
function ListItem(props) {
    return <li {...props} style={{ lineHeight: '1.75rem' }} />
}

function PostTemplate({ content, data, err }) {
    // This holds the data between `---` from the .md file
    const frontmatter = data;

    const classes = useStyles();

    if (err) {
        return <ErrorPage statusCode={err.statusCode} />
    }

    return (
        <div className={classes.root}>
            <Head>
                <title>Rapport | {frontmatter.seoTitle}</title>
                <meta name="description" content={frontmatter.seoTitle} />
                <meta property="og:title" content={frontmatter.seoTitle} />
                <meta property="og:description" content={frontmatter.seoDescription} />
                <meta property="og:image" content={"https://buildrapport.io/" + frontmatter.seoImage} />
                <meta property="og:url" content={"https://buildrapport.io/"} />

                <meta name="description" content={config.META_DESCRIPTION} />
                <meta property="twitter:card" content={"summary_large_image"} />
                <meta property="twitter:site" content={"@buildrapport_io"} />
                <meta property="twitter:image" content={"https://buildrapport.io/" + frontmatter.seoImage} />
                <meta property="og:image:alt" content={frontmatter.seoDescription} />
            </Head>
            <Nav auth />
            <Container maxWidth="sm" style={{ marginTop: 48 }}>
                <Typography variant="h3" style={{ fontFamily: 'Manrope', textAlign: 'left', fontWeight: 700, lineHeight: '3.4rem' }} paragraph>{frontmatter.title}</Typography>
                <Typography variant="subtitle2" style={{ color: config.PALETTE.TEXT_SECONDARY }}>{new Date(frontmatter.publishedOn).toLocaleDateString()} • {frontmatter.author}</Typography>
            </Container>

            <Container maxWidth="sm" style={{ marginTop: 48 }}>
                <img style={{ maxWidth: '100%', border: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: '0 0 1px rgb(0 0 0 /20%)', borderRadius: 8 }} src={'/' + frontmatter.seoImage} />
            </Container>

            <Container maxWidth="sm" style={{ marginTop: 48, marginBottom: 48 }}>
                <ReactMarkdown components={{ img: Image, a: Link, p: Paragraph, h4: Heading4, h2: Heading2, li: ListItem }} remarkPlugins={[gfm]}>{content}</ReactMarkdown>
                {/* <Typography variant="body2" style={{textAlign:"center"}} style={{ fontFamily: 'Manrope', textAlign: 'left', fontWeight: 900, lineHeight: '3.4rem', color: "#666", textTransform: 'uppercase' }}>WRITTEN BY {frontmatter.author}</Typography> */}

            </Container>
            <Divider />
            <Container maxWidth="sm" style={{ marginTop: 48 }}>
                <Subscribe />
            </Container>
            <Footer />
        </div>
    )
}

export async function getStaticProps(context) {
    const { slug } = context.params;

    const content = await import(`../../blog/${slug}.md`);

    const data = matter(content.default)

    delete data.orig;
    return { props: data }

}

export async function getStaticPaths() {
    return new Promise((resolve) => {
        fs.readdir(path.join(process.cwd(), 'blog'), {}, async (err, files) => {

            let paths = await Promise.all(files.map(async (post) => {
                const content = await import(`../../blog/${post}`);

                const data = matter(content.default)

                return {
                    params: { slug: post.split('.md')[0], isPublished: data.data.isPublished },
                };
            }));

            paths = paths.filter(path => path.params.isPublished);

            return resolve({ paths, fallback: false })
        });
    })
}

export default PostTemplate