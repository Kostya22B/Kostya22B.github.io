const face = document.getElementById('face');
    const leftEye = document.getElementById('left-eye');
    const rightEye = document.getElementById('right-eye');
    const mouth = document.getElementById('mouth');

    /**
    * @brief Change mood of the
    */
    function changeMood() {
      const moodIndex = Math.floor(Math.random() * 3);
      let newMood;
      // The mood index is the mood index.
      switch (moodIndex) {
        case 0:
          newMood = {
            mouth: "M 30,60 A 25,25 0 0,0 70,60",
            faceFill: "yellow"
          };
          break;
        case 1:
          newMood = {
            mouth: "M 30,75 A 25,15 0 0,1 70,75",
            faceFill: "red",
          };
          break;
        case 2:
          newMood = {
            mouth: "M 30,65 L 70,65",
            faceFill: "orange"
          };
          break;
      }
      mouth.setAttribute('d', newMood.mouth);
      face.setAttribute('fill', newMood.faceFill);
    }
    face.addEventListener('click', changeMood);