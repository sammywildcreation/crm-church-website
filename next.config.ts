import type { NextConfig } from 'next'

const config: NextConfig = {
  async redirects() {
    return [
      { source: '/index.html',          destination: '/',               permanent: true },
      { source: '/Home.html',           destination: '/',               permanent: true },
      { source: '/About.html',          destination: '/about',          permanent: true },
      { source: '/Program.html',        destination: '/programs',       permanent: true },
      { source: '/Sermon.html',         destination: '/sermons',        permanent: true },
      { source: '/Giving.html',         destination: '/give',           permanent: true },
      { source: '/Contact.html',        destination: '/contact',        permanent: true },
      { source: '/Youth-Ministry.html', destination: '/youth-ministry', permanent: true },
    ]
  },
}

export default config
