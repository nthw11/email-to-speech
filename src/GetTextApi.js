import { useDispatch } from "react-redux";
import { fetchSpeech } from "./actions";
import DisplaySpeech from "./display_fetchspeech";

const GetText = () => {
  const dispatch = useDispatch();
  const handleGetSpeech = () => dispatch(fetchSpeech("Today is the day!"));
  return (
    <div>
      <button onClick={handleGetSpeech}>Start Playback</button>
      <DisplaySpeech />
    </div>
  );
};
export default GetText;
