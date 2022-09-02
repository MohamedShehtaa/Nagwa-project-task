import dotenv from 'dotenv';

dotenv.config(); // in our case must put this config before app require to works

import app from './app';

const PORT = process.env.PORT!;

app.listen(PORT, () => {  // callback func that will be called as soon as the server start listinning
    console.log(`Server running on port ${PORT}`);
});