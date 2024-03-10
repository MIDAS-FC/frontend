import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mainColor: string;
    subColor: string;
    accent: string;
  }
}
