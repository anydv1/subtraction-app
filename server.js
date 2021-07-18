
const app = require('./app');
const port = (process.env.PORT || '8083');



const server=app.listen(port,()=>{
    console.log(`listening on ${port}`)
})
module.exports = {server};