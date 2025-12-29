import axios from 'axios';

export type EmojiData = {
    name: string;
    htmlCode: string[];
    category: string;
    group: string;
};



// Получаем все эмодзи
export const fetchEmojis = async (): Promise<EmojiData[]> => {
    try {
        const response = await axios.get<EmojiData[]>('https://emojihub.herokuapp.com/api/all');
        return response.data;
    } catch (error) {
        console.error('Error fetching emojis:', error);
        return [];
    }
};
