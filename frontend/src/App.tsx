import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import { config } from './config/wagmi';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ArtistPage from './pages/ArtistPage';
import InvestorPage from './pages/InvestorPage';
import DAOPage from './pages/DAOPage';
import ExplorePage from './pages/ExplorePage';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/artist" element={<ArtistPage />} />
                <Route path="/investor" element={<InvestorPage />} />
                <Route path="/dao" element={<DAOPage />} />
                <Route path="/explore" element={<ExplorePage />} />
              </Routes>
            </Layout>
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
