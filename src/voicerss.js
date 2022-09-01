const VoiceRSS = () => {
  VoiceRSS.speech({
    key: "8f08ac91aab9431ca49494c68335ba45",
    src: "Hello, world!",
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
  return (
    <div>
      <h1>voicerss</h1>
    </div>
  );
};

export default VoiceRSS;
