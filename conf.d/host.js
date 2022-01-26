module.exports = {
    hosts: [
        '*.minco.kro.kr',
        'minco.kro.kr'
    ],
    http: {
        port: 80
    },
    https: {
        port: 443,
        cert: "/etc/letsencrypt/live/minco.kro.kr/fullchain.pem",
        key: "/etc/letsencrypt/live/minco.kro.kr/privkey.pem"
    }
}
