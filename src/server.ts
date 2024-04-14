import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:5173'
// }));

app.use(routes);

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})