import React from "react";
import { MemoryRouter } from "react-router";
import type { Meta, StoryObj } from '@storybook/react';
import SiteHeader from "../../components/siteHeader";

const meta = {
  title: "App Header",
  component: SiteHeader,
  decorators: [
    (Story: React.FC) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
  ],
}satisfies Meta<typeof SiteHeader>;;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: {}
 
};
Basic.storyName = "Default";
