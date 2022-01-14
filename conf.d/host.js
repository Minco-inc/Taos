module.exports = {
    hosts: [
        '*.myDomain.com',
        'mySecondDomain.com'
    ],
    http: {
        port: 82
    },
    https: {
        port: 445,
        cert: "/etc/letsencrypt/live/minco.kro.kr/fullchain.pem",
        key: "/etc/letsencrypt/live/minco.kro.kr/privkey.pem"
    }
}
