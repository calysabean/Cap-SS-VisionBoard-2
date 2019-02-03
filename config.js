
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://testuser:1234test@ds117423.mlab.com:17423/aa-server-side-capstone';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://testuser:1234test@ds221115.mlab.com:21115/aa-testdbd-capstone-node';
//exports.PORT = process.env.PORT || 8080;

/*exports.DATABASE_URL =
    process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://localhost/jwt-auth-demo';*/

exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

//exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/goals-app';
