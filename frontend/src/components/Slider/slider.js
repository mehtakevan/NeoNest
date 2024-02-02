import ReactSlider from "react-slider";
import './slider.css';
    
const Slider = () => {
  return (
    <ReactSlider
    className="customSlider"
    trackClassName="customSlider-track"
    thumbClassName="customSlider-thumb" />
  );
};

export default Slider;