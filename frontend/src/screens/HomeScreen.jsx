import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useFlashMessageStore } from '../state/store.js';
import Hero from '../components/Hero';

const HomeScreen = () => {
  const { flashMessage, setFlashMessage } = useFlashMessageStore();

  useEffect(() => {
    if (flashMessage) {
      toast.success(flashMessage);
      setFlashMessage(null);
    }
  }, [flashMessage, setFlashMessage]);

  return <Hero />;
};
export default HomeScreen;
