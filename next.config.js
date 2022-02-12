const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();

const withNextEnv = nextEnv();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});

module.exports = withNextEnv(withBundleAnalyzer({
    pageExtensions: ['js', 'jsx', 'md'],
    
    webpack(config, options) {
        // config.module.rules.push({
        //     test: /\.svg$/,
        //     issuer: /\.(js|ts)x?$/,
        //     use: ['@svgr/webpack'],
        // });
        config.module.rules.push({
            test: /\.svg?$/,
            oneOf: [
                {
                    use: [
                        {
                            loader: '@svgr/webpack',
                            options: {
                                prettier: false,
                                svgo: true,
                                svgoConfig: {
                                    plugins: [{ removeViewBox: false }],
                                },
                                titleProp: true,
                            },
                        },
                    ],
                    issuer: {
                        and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
                    },
                },
            ],
        });
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        })

        return config;
    }
}));