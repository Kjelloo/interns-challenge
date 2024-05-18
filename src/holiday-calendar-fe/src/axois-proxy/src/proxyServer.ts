import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors()); // Enable CORS for all routes

app.get('/api/holidays', async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query;
    const formattedStartDate = formatISO(new Date(startDate as string));
    const formattedEndDate = formatISO(new Date(endDate as string));

    const url = `https://api.sallinggroup.com/v1/holidays/?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer -token-`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        // @ts-ignore
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
});

function formatISO(date: Date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
