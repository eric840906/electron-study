import { MemoryRouter as Router } from 'react-router-dom';
import './App.css';
import Layout from './src/Layouts/Layout';

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
