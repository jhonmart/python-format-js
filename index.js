"use strict";

// consts
const PREFIX_MASK = {
  x: "0x",
  X: "0X",
  o: "0o",
  b: "0b",
};

const formatters = {
  E: (v, size) => v.toExponential(size).toUpperCase(),
  e: (v, size) => v.toExponential(size),
  X: (v) => v.toString(16).toUpperCase(),
  x: (v) => v.toString(16),
  b: (v) => v.toString(2),
  o: (v) => v.toString(8),
  f: (v, size) => v.toFixed(size),
  F: (v, size) => v.toFixed(size),
};

const ALIGN_LEFT = 0;
const ALIGN_RIGHT = 1;
const ALIGN_CENTER = 2;
const ALIGN_SIGN = 3;

const ALIGN_MAP = { "<": 0, ">": 1, "^": 2, "=": 3 };

const DEFAULT_PLACE = 6;
const ALL_REGEXP =
  /\{(?<ref>\w+)?:((?:(?<fill>[^>\^<\d#]|0)(?<align>[<>=^])|(?<align_only>[<>=^]))?(?<sign>[+\- ])?(?<alt>#)?(?<zero>0)?(?<width>\d+)?(?<group>[,_])?(?<dot>\.)?(?<precision>\d+)?(?<type>[eEfFgGdxXobn%])?)\}/g;
const regExpBasic = /{\[?(\w+)\]?}/; // it's not best solution


Object.defineProperty(String.prototype, "format", {
  value: function (...args_) {
    // Create variables
    let self = this;
    let __patterns__ = self.match(/({.*?})/g);
    const isObject = typeof args_[0] === "object";
    const configMode = typeof args_[1]?.strict === 'boolean' ? args_[1] : { strict: true };
    
    // types/use logic
    __patterns__?.forEach((pattern, patt_index) => {
      ALL_REGEXP.lastIndex = 0;
      const kargs = ALL_REGEXP.exec(pattern)?.groups;
      const wargs = regExpBasic.exec(pattern);

      // Insert values (one 2 one / array / object)
      const INDEX_VAR = (wargs ? wargs[1] : kargs ? kargs.ref : patt_index) || patt_index;
      const NATUAL_VALUE = isObject ? args_[0][INDEX_VAR] : args_[INDEX_VAR];
      let ACTUAL_VALUE = isObject ? args_[0][INDEX_VAR] : args_[INDEX_VAR];

      // Verify sintax/semantic
      if (ACTUAL_VALUE === null || ACTUAL_VALUE === undefined) {
        if (configMode.strict) throw new Error(
          `Replacement index ${INDEX_VAR} out of range for positional args tuple`
        );
        else return (self = self.replace(pattern, ''));
      }
      if (kargs) {
        const ALIGN_OP = kargs.align || kargs.align_only
        const LETTER = " eEfFgGdxXobn".indexOf(kargs.type) && kargs.type
        //  padronaze
        if (LETTER && formatters[LETTER]) {
          const floatSize = kargs.dot
            ? Number(kargs.precision)
            : DEFAULT_PLACE;
          ACTUAL_VALUE = formatters[LETTER](NATUAL_VALUE, floatSize);
          //  mask
          const mask = PREFIX_MASK[LETTER];
          if (kargs.alt && mask) {
            ACTUAL_VALUE = mask + ACTUAL_VALUE;
          }
        } else ACTUAL_VALUE = ACTUAL_VALUE.toString()
        // signal
        if (kargs.group) {
          const numberDot = ACTUAL_VALUE.indexOf(".");
          if (numberDot !== -1) {
            ACTUAL_VALUE =
              ACTUAL_VALUE.slice(0, numberDot).replace(/\B(?=(\d{3})+(?!\d))/g, kargs.group) +
              ACTUAL_VALUE.slice(numberDot);
          } else {
            ACTUAL_VALUE = ACTUAL_VALUE.replace(/\B(?=(\d{3})+(?!\d))/g, kargs.group);
          }
        }
        if (kargs.type === "%") {
          ACTUAL_VALUE = (NATUAL_VALUE * 100)
            .toFixed(kargs.precision ?? DEFAULT_PLACE) + "%";
        }
        if ("+\- ".indexOf(kargs.sign) >= 0 && typeof NATUAL_VALUE === "number") {
          const s = kargs.sign;
          ACTUAL_VALUE =
            ((NATUAL_VALUE < 0 && "-") || (s === "+" && "+") || (s === " " && " ") || "") +
            ACTUAL_VALUE.replace("-", "");
        }

        // space / order / trim
        if (kargs.dot && !(LETTER && " fF".indexOf(LETTER)))
          ACTUAL_VALUE = ACTUAL_VALUE.slice(0, kargs.precision);

        if (kargs.width) {
          let FILL_ELEMENT = kargs.fill || kargs.zero || " "; 
          const SIZE_STRING = ACTUAL_VALUE.length;
          const SIZE_ARG = kargs.width;
          const FILL_LENGTH = SIZE_STRING > SIZE_ARG ? SIZE_STRING : SIZE_ARG;

          const align = kargs.zero ? ">" : ALIGN_OP

          switch (ALIGN_MAP[align]) {
            case ALIGN_LEFT:
              ACTUAL_VALUE = ACTUAL_VALUE.padEnd(FILL_LENGTH, FILL_ELEMENT);
              break;
            case ALIGN_RIGHT:
              ACTUAL_VALUE = ACTUAL_VALUE.padStart(FILL_LENGTH, FILL_ELEMENT);
              break;
            case ALIGN_SIGN:
                const sign = ACTUAL_VALUE[0];
                const number = ACTUAL_VALUE.slice(1);
                const padLen = SIZE_ARG - number.length - 1;

                if (padLen > 0) {
                  ACTUAL_VALUE = sign + FILL_ELEMENT.repeat(padLen) + number;
                }
              break;
            case ALIGN_CENTER:
              const totalPad = FILL_LENGTH - SIZE_STRING;

              if (totalPad > 0) {
                const left = totalPad >> 1;
                const right = totalPad - left;

                ACTUAL_VALUE =
                  FILL_ELEMENT.repeat(left) +
                  ACTUAL_VALUE +
                  FILL_ELEMENT.repeat(right);
              }
              break;
            default:
              ACTUAL_VALUE = LETTER
                ? ACTUAL_VALUE.padStart(FILL_LENGTH, FILL_ELEMENT)
                : ACTUAL_VALUE.padEnd(FILL_LENGTH, FILL_ELEMENT);
              break;
          }
        }
      }

      // SET Definitive value
      self = self.replace(pattern, ACTUAL_VALUE);
    });

    return self;
  },
});
module.exports = (inputString, ...param) => inputString.format(...param);
