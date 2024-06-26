module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-functions": {
      functions: {
        fluid(
          min = "1rem",
          max = "2rem",
          bpMin = "24rem",
          bpMax = "70rem",
          containerUnit = "vw",
        ) {
          // ?FORMULA: clamp(min_value_in_REM, (min_font_size_in_REM + (max_font_size - min_font_size) * ((100vw - min_viewport_including_unit) / (max_viewport - min_viewport))), max_value_in_REM)
          // !NOTE: The min,max values in clamp must always be min at start and max at the end, when the min value is bigger than max (rever fluid) then the min goes in max and max in min
          // const getCssUnit = (value) => {
          //   let match = value.match(/[a-zA-Z%]+/);
          //   return match ? match[0] : null;
          // } = cssValue.match(/[a-zA-Z%]+/)[0];

          let min_value = parseFloat(min) <= parseFloat(max) ? min : max;
          let max_value = parseFloat(max) >= parseFloat(min) ? max : min;
          let value_diff = parseFloat(max) - parseFloat(min);
          let viewport_diff = parseInt(bpMax) - parseInt(bpMin);

          return `clamp(${min_value}, (${min} + (${value_diff}) * ((100${containerUnit} - ${bpMin}) / (${viewport_diff}))), ${max_value})`;
        },
        container(padding = 1.5, size = 1110, bleed = "none", unit = "%") {
          if (typeof padding === "object") {
            return `max(${padding[0]}rem, 50${unit} - ${size} / 2) max(${padding[1]}rem, 50${unit} - ${size} / 2)`;
          }

          if (bleed === "left")
            return `0 max(${padding}rem, 50${unit} - ${size} / 2)`;

          if (bleed === "right")
            return `max(${padding}rem, 50${unit} - ${size} / 2) 0`;

          return `max(${padding}rem, 50${unit} - ${size}px / 2)`;
        },
        switch(min = "0rem", max = "2rem", bp = "768px", containerUnit = "vw") {
          let sign = parseFloat(max) < parseFloat(min) ? "-1" : "1";

          return `clamp(${min <= max ? min : max}, (${sign} * ((100${containerUnit} - ${bp}) * 9999)), ${max >= min ? max : min})`;
        },
      },
    },
    "postcss-logical": {},
    "postcss-media-minmax": {},
  },
};
