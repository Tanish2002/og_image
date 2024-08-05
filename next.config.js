/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"],
    },
    // webpack: (config, { webpack, isServer }) => {
    //     // if (isServer) {
    //     //     config.plugins.push(new webpack.IgnorePlugin({
    //     //         resourceRegExp: /^cloudinary$/,
    //     //     }))
    //     // }
    //     config.resolve.fallback = {
    //         stream: false,
    //         crypto: false,
    //         querystring: false,
    //         http: false,
    //         https: false,
    //         fs: false,
    //         path: false,
    //     };
    //
    //     return config
    // },
}

module.exports = nextConfig
