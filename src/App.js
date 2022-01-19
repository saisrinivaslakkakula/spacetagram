import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Hidden from '@mui/material/Hidden';
import LoadingButton from '@mui/lab/LoadingButton';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { fetchAllData, shuffle } from './state/action-creators';
import Header from './components/Header';
import ParticleBackground from './particleBackground';
import ImageSlider from "./components";
import "./css/App.css";

const Container = styled('div')(({ theme }) => ({
  marginTop: '10%',
  [theme.breakpoints.down('sm')]: {
    marginTop: '10%'
  },
  [theme.breakpoints.up('sm')]: {
    marginTop: '10%'
  },
  [theme.breakpoints.up('md')]: {
    marginTop: '10%'
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: '10%'
  },
}));

const Span = styled('span')(({ theme }) => ({
  display: 'initial',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllData());
  }, []);
  return (
    <Container >
      <Header></Header>
      <div className="container mt-5 carousel">
        <ParticleBackground />
        <Hidden mdUp>
          <ImageSlider slidesToShow={1} />
        </Hidden>
        <Hidden mdDown>
          <ImageSlider slidesToShow={3} />
        </Hidden>
      </div>
    </Container>
  );
}
export default App;
