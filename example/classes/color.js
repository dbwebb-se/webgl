class Color {
    constructor(red, green, blue, alpha=1) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    // Getters
    get red() {
        return this.red;
    }

    get green() {
        return this.green;
    }

    get blue() {
        return this.blue;
    }

    get alpha() {
        return this.alpha;
    }

    // Methods
    calculateHexCode() {
        const red = this.red.toString(16);
        const green = this.green.toString(16);
        const blue = this.blue.toString(16);
        
        return `#${red}${green}${blue}`;
    }
}

export Color;
