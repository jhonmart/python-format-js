// types/python-format-js/index.d.ts

declare module 'python-format-js' {
  type PythonFormatFunction = (template: string, ...args: any[]) => string;

  function format(template: string, ...args: any[]): string;

  export = format;
}
