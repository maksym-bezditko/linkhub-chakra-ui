/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [{
			hostname: 'linkhub-s3-bucket.s3.eu-north-1.amazonaws.com'
		}],
	}
}

module.exports = nextConfig
