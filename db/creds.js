require('dotenv').config();

const u = process.env.DB_USER;
const p = process.env.DB_PASSWORD;
const dbhost = process.env.DB_HOST;
const dbname = process.env.DB_NAME;

const gm = process.env.GM_USER;
const gmpw = process.env.GM_PASSWORD;

const dburl = `mongodb://${u}:${p}${dbhost}${dbname}`;

const accountStatus = {
    active: 'ACTIVE',
    deactivated: 'DEACTIVATED',
    deleting: 'PENDING_DELETION',
    compromised: 'COMPROMISED',
    hold: 'ON_HOLD'
};
const jwtSecret = process.env.JWT_SECRET;
const jwtSession = {
        session: false
    };


module.exports.dburl = dburl;
module.exports.gm = gm;
module.exports.gmpw = gmpw;
module.exports.accountStatus = accountStatus;
module.exports.jwtSecret = jwtSecret;
module.exports.jwtSession = jwtSession; 