import { Box, Paper, Typography } from '@mui/material';
import data from '../../emojihub-master/emojistore/data/emojibase.json';
import type {EmojiData} from '../services/emojiService.ts';

export default function EmojiList() {
    const emojis = data as EmojiData[];
    const groups = Array.from(new Set(emojis.map(e => e.group)));

    return (
        <Box pt={8} px={2}>
            <Typography variant="h4" textAlign="center" mb={3}>
                Emoji Groups
            </Typography>

            <Box
                display="grid"
                gridTemplateColumns={{ xs: '1fr', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }}
                gap={2}
            >
                {groups.map(group => (
                    <Paper key={group} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h6">{group}</Typography>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
}
