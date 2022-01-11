class Color {
    constructor(red, green, blue, alpha=1) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    // Methods
    calculateHexCode() {
        const red = Math.ceil(this.red * 255).toString(16);
        const green = Math.ceil(this.green * 255).toString(16);
        const blue = Math.ceil(this.blue * 255).toString(16);

        return `#${red}${green}${blue}`;
    }
}

export default Color;
