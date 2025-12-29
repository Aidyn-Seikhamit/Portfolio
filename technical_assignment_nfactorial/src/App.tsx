// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EmojiList from './pages/EmojiList';
import EmojiCatalog from './pages/EmojiCatalog';
import Navbar from './components/Navbar';

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/list" element={<EmojiList />} />
                <Route path="/emojis" element={<EmojiCatalog />} />
            </Routes>
        </BrowserRouter>
    );
}
