// this file prevents SVGs from erroring when imported

declare module "*.svg" {
    const content: any;
    export default content;
}