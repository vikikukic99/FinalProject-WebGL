import { Group, MathUtils } from 'three';
import { Text } from 'troika-three-text';

export default class FallingLetters extends Group {
  constructor() {
    super();
    this.letters = [];
    this.initLetters();
  }

  initLetters() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < letters.length; i++) {
      const textMesh = new Text();
      textMesh.text = letters[i];
      textMesh.fontSize = 30;  // Set the font size
      textMesh.color = 0xffffff;  // Set the color
      textMesh.position.set(
        MathUtils.randFloatSpread(500), // random x position
        MathUtils.randFloat(100, 200), // random y position
        MathUtils.randFloatSpread(500) // random z position
      );
      textMesh.userData = {
        letter: letters[i],
        speed: MathUtils.randFloat(0.5, 2), // random falling speed
      };

      // You need to sync the geometry after setting properties
      textMesh.sync();

      this.letters.push(textMesh);
      this.add(textMesh);
    }
  }

  update() {
    this.letters.forEach(letter => {
      letter.position.y -= letter.userData.speed;
      if (letter.position.y < -50) {
        letter.position.y = MathUtils.randFloat(50, 100); // reset position to the top
      }
    });
  }
}
