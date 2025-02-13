import express from 'express';
import cors from 'cors';
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the backend API' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 