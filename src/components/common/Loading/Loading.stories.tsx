import Loading from ".";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Loading",
  component: Loading,
} as ComponentMeta<typeof Loading>;

export const Primary: ComponentStory<typeof Loading> = () => <Loading />;
