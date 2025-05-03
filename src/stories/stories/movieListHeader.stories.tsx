import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from "react-router";
import MoviesContextProvider from '../../contexts/moviesContext';
import Header from '../../components/headerMovieList';

const meta = {
    title: 'Home Page/Header',
    component: Header,
    decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
      (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
    ],
  } satisfies Meta<typeof Header>;
  
  export default meta;

  type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args:{ title:'Discover Movies'}

};
Basic.storyName = "Default";

