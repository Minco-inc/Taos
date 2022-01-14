module.exports = {
    hosts: [
        'minco.kro.kr',
        'www.minco.kro.kr'
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
