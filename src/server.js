const express = require('express')
const serverless = require("serverless-http");
const mongo = require('./database/mongodb')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 9000
app.listen(port, () => console.log(`Server running on port: ${port}`))
mongo.once('open', () => console.log('MongoDB connected successfully'))

app.use(express.json())

//Disarray Leaderboard Entry Route
const leaderboardRouter = require('./routes/leaderboardEntry')
app.use('/.netlify/functions/server/leaderboard', leaderboardRouter)

//API Routes
const SQLiftingRouter = require('./routes/sqlifting-api')
app.use('/.netlify/functions/server/api', SQLiftingRouter)

// SQLifting Login / Register
const SQLiftingAccRouter = require('./routes/sqlifting-account.js')
app.use('/.netlify/functions/server/sqlifting', SQLiftingAccRouter)

//Keith Phillingane LLC Client Email Dispatch Route
const PortfolioEmailRouter = require('./routes/portfolio-email.js')
app.use('/.netlify/functions/server/portfolioemail', PortfolioEmailRouter)

//Keith Phillingane LLC Client Email Dispatch Route
const KPClientEmailRouter = require('./routes/kpcon-email.js')
app.use('/.netlify/functions/server/kpclientemail', KPClientEmailRouter)


//EXPORTS
module.exports = app;
module.exports.handler = serverless(app);
