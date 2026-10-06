import express from 'express';
import  routes  from './bookRoutes.js'

const app = express();
app.use(express.json())

app.use('/api', routes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening at: ${PORT}`)
})