class Color {
    constructor(red, green, blue, alpha=1) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    // Methods
    calculateHexCode() {
        const red = this.red.toString(16);
        const green = this.green.toString(16);
        const blue = this.blue.toString(16);

        return `#${red}${green}${blue}`;
    }
}

export default Color;
