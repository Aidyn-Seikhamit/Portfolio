// pages/EmojiCatalog.tsx
import { useMemo, useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import data from '../../emojihub-master/emojistore/data/emojibase.json';
import type {EmojiData} from '../services/emojiService.ts';

export default function EmojiCatalog() {
    const emojis = data as EmojiData[];

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [sort, setSort] = useState<'az' | 'za'>('az');

    const categories = useMemo(
        () => Array.from(new Set(emojis.map(e => e.category))),
        [emojis]
    );

    const filtered = useMemo(() => {
        let result = emojis.filter(e =>
            e.name.toLowerCase().includes(search.toLowerCase())
        );

        if (category !== 'all') {
            result = result.filter(e => e.category === category);
        }

        result.sort((a, b) =>
            sort === 'az'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        );

        return result;
    }, [emojis, search, category, sort]);

    return (
        <Box pt={8} px={2}>
            <Typography variant="h4" textAlign="center" mb={3}>
                Emoji Catalog
            </Typography>

            {/* Controls */}
            <Box display="flex" gap={2} mb={3} flexWrap="wrap" justifyContent="center">
                <TextField
                    label="Search by name"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <FormControl sx={{ minWidth: 180 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        label="Category"
                        onChange={e => setCategory(e.target.value)}
                    >
                        <MenuItem value="all">All</MenuItem>
                        {categories.map(cat => (
                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 160 }}>
                    <InputLabel>Sort</InputLabel>
                    <Select
                        value={sort}
                        label="Sort"
                        onChange={e => setSort(e.target.value as 'az' | 'za')}
                    >
                        <MenuItem value="az">A → Z</MenuItem>
                        <MenuItem value="za">Z → A</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Grid */}
            <Box
                display="grid"
                gridTemplateColumns={{ xs: 'repeat(2,1fr)', sm: 'repeat(4,1fr)', md: 'repeat(6,1fr)' }}
                gap={2}
            >
                {filtered.map((emoji, i) => (
                    <Paper
                        key={i}
                        sx={{
                            p: 2,
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
            <span
                style={{ fontSize: '28px' }}
                dangerouslySetInnerHTML={{ __html: emoji.htmlCode[0] }}
            />
                        <Typography fontWeight={600}>{emoji.name}</Typography>
                        <Typography variant="caption">{emoji.category}</Typography>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
}
