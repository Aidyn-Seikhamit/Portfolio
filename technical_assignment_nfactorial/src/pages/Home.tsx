// pages/Home.tsx
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <Box minHeight="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Typography variant="h3" mb={2}>Welcome to Emoji Hub</Typography>
            <Typography mb={4}>Explore and use emojis easily</Typography>

            <Box display="flex" gap={2}>
                <Button variant="contained" component={Link} to="/list">
                    Emoji Types
                </Button>
                <Button variant="outlined" component={Link} to="/emojis">
                    Emoji Catalog
                </Button>
            </Box>
        </Box>
    );
}
