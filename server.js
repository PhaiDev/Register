import app from './src/app.js';
import { config } from './src/config/env.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${config.nodeEnv}`);
});
