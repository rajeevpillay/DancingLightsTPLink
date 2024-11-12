class BulbWrapper {
  constructor(bulb) {
    this.bulb = bulb;
    this.hue = 0;
    this.saturation = 0;
    this.colorTemp = 0;
    this.brightness = 0;
    this.discoInterval = null;
  }

  // Static methods for each color
  static Red() {
    return { hue: 0, saturation: 100, colorTemp: 0 };
  }

  static Blue() {
    return { hue: 239, saturation: 99, colorTemp: 0 };
  }

  static Green() {
    return { hue: 120, saturation: 100, colorTemp: 0 };
  }

  static Purple() {
    return { hue: 300, saturation: 100, colorTemp: 0 };
  }

  static Orange() {
    return { hue: 30, saturation: 100, colorTemp: 0 };
  }

  static Yellow() {
    return { hue: 60, saturation: 100, colorTemp: 0 };
  }

  static Pink() {
    return { hue: 330, saturation: 100, colorTemp: 0 };
  }

  static Cyan() {
    return { hue: 180, saturation: 100, colorTemp: 0 };
  }

  static Magenta() {
    return { hue: 300, saturation: 100, colorTemp: 0 };
  }

  static Lime() {
    return { hue: 90, saturation: 100, colorTemp: 0 };
  }

  static Teal() {
    return { hue: 180, saturation: 50, colorTemp: 0 };
  }

  static Violet() {
    return { hue: 270, saturation: 100, colorTemp: 0 };
  }

  static Indigo() {
    return { hue: 275, saturation: 100, colorTemp: 0 };
  }

  // Set the color of the bulb
  setColor(color) {
    if (!color) throw new Error("Invalid bulb color");

    const defaults = { brightness: 0 };
    const lightSettings = Object.assign({}, defaults, color);
    lightSettings.color_temp = lightSettings.colorTemp;

    return this.bulb.lighting.setLightState(lightSettings);
  }

  // Start disco effect with random colors
  startDisco(changeInterval = 1000) {
    const colors = [
      "red",
      "blue",
      "green",
      "purple",
      "orange",
      "yellow",
      "pink",
      "cyan",
      "magenta",
      "lime",
      "teal",
      "violet",
      "indigo",
    ];

    const getRandomColor = (previousColor) => {
      const randomIndex = () => Math.floor(Math.random() * colors.length);
      let color = colors[randomIndex()];
      return previousColor === color ? getRandomColor(previousColor) : color;
    };

    this.discoInterval = setInterval(async () => {
      const color = getRandomColor();
      await this.setColor(
        BulbWrapper[color.charAt(0).toUpperCase() + color.slice(1)]()
      );
    }, changeInterval);
  }

  // Flag pattern effect with random colors
  startFlagRandom(changeInterval = 10000) {
    const colors = [
      "red",
      "blue",
      "green",
      "purple",
      "orange",
      "yellow",
      "pink",
      "cyan",
      "magenta",
      "lime",
      "teal",
      "violet",
      "indigo",
    ];

    const getRandomColor = (previousColor) => {
      const randomIndex = () => Math.floor(Math.random() * colors.length);
      let color = colors[randomIndex()];
      return previousColor === color ? getRandomColor(previousColor) : color;
    };

    this.discoInterval = setInterval(async () => {
      const color = getRandomColor();
      await this.setColor(
        BulbWrapper[color.charAt(0).toUpperCase() + color.slice(1)]()
      );
    }, changeInterval);
  }

  // Flag loop effect cycling through colors in sequence
  startFlagLoop(changeInterval = 10000) {
    const colors = [
      "red",
      "blue",
      "green",
      "purple",
      "orange",
      "yellow",
      "pink",
      "cyan",
      "magenta",
      "lime",
      "teal",
      "violet",
      "indigo",
    ];

    let index = 0;

    this.discoInterval = setInterval(async () => {
      const color = colors[index];
      await this.setColor(
        BulbWrapper[color.charAt(0).toUpperCase() + color.slice(1)]()
      );
      index = (index + 1) % colors.length;
    }, changeInterval);
  }
}

module.exports = BulbWrapper;
